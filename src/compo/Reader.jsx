import React, { useState } from 'react';
// import pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import JSZip from 'jszip';

function Reader() {
   
    const [pdfUrl, setPdfUrl] = useState(null);

    function handleFileSelect(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const pdfUrl = URL.createObjectURL(selectedFile);
            setPdfUrl(pdfUrl);
        }
    }

    return (
        <div>
            <h1>hola</h1>
            <input type="file" accept=".pdf" onChange={handleFileSelect} />
            {pdfUrl && <iframe src={pdfUrl} width="100%" height="600px" />}
        </div>
    );
}

export default Reader;
