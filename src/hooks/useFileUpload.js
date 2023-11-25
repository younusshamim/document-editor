import { useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getLocalStorageItems,
  saveToLocalStorage,
} from "../utils/localStorage";
import { v4 as uuidv4 } from "uuid";

const useFileUpload = () => {
  const [pdfList, setPdfList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRemoveItem = (item) => {
    const storedItems = getLocalStorageItems("pdfFiles");
    const filtered = storedItems.filter((pdf) => pdf.id !== item.id);
    saveToLocalStorage("pdfFiles", filtered);
    setPdfList(filtered);
  };

  const saveToLocalStorageAndUpdateState = (item) => {
    const storedItems = getLocalStorageItems("pdfFiles");
    saveToLocalStorage("pdfFiles", [...storedItems, item]);
    setPdfList((prevFiles) => [...prevFiles, item]);
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
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
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const onDrop = async (acceptedFiles) => {
    setUploading(true);

    for (const file of acceptedFiles) {
      const uniqueId = uuidv4();

      try {
        if (!file.type.startsWith("application/pdf")) {
          toast.error(`Please select only PDF files: ${file.name}`);
          continue;
        }
        if (file.size > 1024 * 1024) {
          toast.error(`File size exceeds 1 MB limit: ${file.name}`);
          continue;
        }

        const fileContent = await readFileContent(file);
        const item = { id: uniqueId, name: file.name, content: fileContent };
        saveToLocalStorageAndUpdateState(item);
      } catch (error) {
        toast.error(
          "Error processing file: " +
            (error?.message || "An unexpected error occurred.")
        );
      } finally {
        setProgress(0);
        setUploading(false);
      }
    }
  };

  useLayoutEffect(() => {
    const items = getLocalStorageItems("pdfFiles");
    setPdfList(items);
  }, []);

  return { pdfList, onDrop, uploading, progress, handleRemoveItem };
};

export default useFileUpload;
