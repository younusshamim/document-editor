import React from 'react';
import pdfIcon from '../../../assets/pdf-icon.png'
import { LuUpload } from "react-icons/lu";
import PrimaryButton from '../../../components/PrimaryButton';

const Upload = () => {
    return (
    <div className=" w-[1000px] p-5 shadow-xl rounded-xl mb-10">
        <div className='p-16 border border-dashed rounded-sm border-gray-500 flex flex-col gap-4 justify-center items-center cursor-pointer'>
            <img className='w-20' src={pdfIcon} alt="PDF Icon"/>
            <h2 className='text-3xl font-bold'>Select your pdf files</h2>
            
            <PrimaryButton className="px-10">
                <div><LuUpload /></div>
                <p>Select</p>
            </PrimaryButton>

            <p>Upload PDF of up to 1 MB</p>
        </div>
    </div>
    );
};

export default Upload;