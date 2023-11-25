import { useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getLocalStorageItems,
  removeLocalStorageItem,
  setOnLocalStorage,
} from "../utils/localStorage";
import { v4 as uuidv4 } from "uuid";

const useFileUpload = () => {
  const [pdfList, setPdfList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRemoveItem = (item) => {
    removeLocalStorageItem("pdfFiles", item);
    const filterd = pdfList.filter((pdf) => pdf.id !== item.id);
    setPdfList(filterd);
  };

  const saveLocalStorage = (item) => {
    const items = getLocalStorageItems("pdfFiles");
    items.push(item);
    setOnLocalStorage("pdfFiles", items);
  };

  const onDrop = async (acceptedFiles) => {
    setUploading(true);

    acceptedFiles.forEach(async (file, index) => {
      const uniqueId = uuidv4();

      if (!file.type.startsWith("application/pdf")) {
        toast.error(`Please select only PDF files: ${file.name}`);
        return;
      }
      if (file.size > 1024 * 1024) {
        toast.error(`File size exceeds 1 MB limit: ${file.name}`);
        return;
      }

      const reader = new FileReader();
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentCompleted = Math.round(
            (event.loaded * 100) / event.total
          );
          setProgress(percentCompleted);
        }
      };
      reader.onload = (event) => {
        const fileContent = event.target.result;
        const item = { id: uniqueId, name: file.name, content: fileContent };
        setPdfList((prevFiles) => [...prevFiles, item]);
        saveLocalStorage(item);
      };
      reader.readAsDataURL(file);
    });

    setUploading(false);
    setProgress(0);
  };

  useLayoutEffect(() => {
    const items = getLocalStorageItems("pdfFiles");
    setPdfList(items);
  }, []);

  return { pdfList, onDrop, uploading, progress, handleRemoveItem };
};

export default useFileUpload;
