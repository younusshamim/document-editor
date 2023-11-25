import React from 'react';
import pdfIcon from '../../../assets/pdf-icon.png'
import { LuUpload } from "react-icons/lu";
import PrimaryButton from '../../../components/PrimaryButton';
import { useDropzone } from 'react-dropzone';

const Upload = ({onDrop, uploading, progress}) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
    <>
        <input
            className="hidden"
            type="file"
            multiple
            title="Upload pdf documents"
            {...getInputProps()}
            accept=".pdf"
        />
        
        <div className={`w-[1000px] p-5 shadow-xl rounded-xl mb-10`}>
            <div
                className={`p-16 border-2 border-dashed rounded-sm flex flex-col gap-4 justify-center items-center cursor-pointer transition-all dropzone ${isDragActive ? 'border-red-500' : 'border-gray-300'}`}
                {...getRootProps()}
            >
                <img className='w-20' src={pdfIcon} alt="PDF Icon"/>
                {uploading ? <progress className="progress progress-info w-56" value={progress} max="100"></progress> 
                : <h2 className='text-3xl font-bold'>Drag & drop PDF files here, or click to select files</h2>}

                <PrimaryButton className="px-10">
                    <div><LuUpload /></div>
                    <p>Select</p>
                </PrimaryButton>

                <p>Upload PDF of up to 1 MB</p>
            </div>
        </div>
    </>
    );
};

export default Upload;