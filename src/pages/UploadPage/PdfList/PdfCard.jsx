import React from 'react';
import pdfIcon from '../../../assets/pdf-icon.png'
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";

const PdfCard = ({item}) => {
    return (
        <div className='flex flex-col justify-center gap-1 w-24 px-3 py-2 rounded-lg relative'>
            <div className='absolute top-0 right-0 cursor-pointer text-lg'><IoMdClose /></div>

            <img className='w-fit mb-1' src={pdfIcon} alt="PDF Icon" />
            <p className='text-sm text-center'>{item}</p>
            <Link to="/edit" className='bg-blue-950 text-white px-3 rounded-md text-sm text-center inline-block m-auto'>View</Link>
        </div>
    );
};

export default PdfCard;