import React from 'react';
import PdfCard from './PdfCard';

const PdfList = () => {
    const files = ['shamim.pdf','marwan.pdf','rakib.pdf','sadman.pdf','rafiq.pdf',];

    return (
        <div className='w-[1000px] flex justify-center flex-wrap gap-5'>
            {files.map(item => (
                <PdfCard item={item} />
            ))}
        </div>
    );
};

export default PdfList;