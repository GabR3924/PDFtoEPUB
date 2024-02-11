import React, { useState } from 'react';
import axios from 'axios'

function Reader() {
   
    const [file, setFile] = useState(null);
    const [converting, setConverting] = useState(false);

    async function convertToEpub(pdfFile) {
        setConverting(true);

        const formData = new FormData();
        formData.append('pdf', pdfFile);

        try {
            const response = await axios.post('URL_DEL_SERVIDOR/convert', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Suponiendo que el servidor devuelve el ePub como un blob en la respuesta
            const epubBlob = new Blob([response.data], { type: 'application/epub+zip' });
            const epubUrl = URL.createObjectURL(epubBlob);
            window.open(epubUrl);
        } catch (error) {
            console.error('Error al convertir el PDF a ePub:', error);
        }

        setConverting(false);
    }

    function handleFileSelect(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            convertToEpub(selectedFile);
        }
    }

    return (
        <div>
            <input type="file" accept=".pdf" onChange={handleFileSelect} />
            {converting && <p>Converting...</p>}
        </div>
    );
}

export default Reader;
