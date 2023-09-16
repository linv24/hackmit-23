import "./Upload.css"
import "../index.css"
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header from "../Header/Header.js"

const fileInputRef = React.createRef();

const Upload = () => {
    const [pdf, setPdf] = useState(null);
    const [pdfName, setPdfName] = useState('');

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            const uploadedPdf = e.target.files[0];

            if (uploadedPdf.type === "application/pdf") {
                setPdf(uploadedPdf);
                setPdfName(uploadedPdf.name);
            }
        } else {
            alert("Upload a valid pdf file.");
        }
    }

    const handleDeletePdf = () => {
        setPdf(null);
        setPdfName('');
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }
    
    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            handleFileChange({ target: { files: [e.dataTransfer.items[0].getAsFile()] } });
            e.dataTransfer.clearData();
        }
    }
    
    const openFilePicker = () => {
        fileInputRef.current.click();
    }

    // TODO: Vincent
    const handleUpload = async () => {
        if (pdf) {
            const formData = new FormData();
            formData.append('pdf', pdf);
    
            try {
                const response = await fetch('server', {
                    method: 'POST',
                    body: formData
                });
                
                if (response.status === 200) {
                    alert('File uploaded successfully.');
                } else {
                    alert('Failed to upload file.');
                }
            } catch (error) {
                alert('Error uploading file: ' + error.message);
            }
        } else {
            alert('No file selected.');
        }
    }

    return (
        <div>
            <Header />
            <div class="center-container">
                <h1>Upload a pdf of your notes</h1>
                {/* <img src="../../../images/upload.png" alt="Arrow" class="upload-image"/> */}
                {/* Uploa PDF box */}
                <div>
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        accept=".pdf" 
                        style={{ display: 'none' }}
                        id="pdf-upload"
                    />
                    <label htmlFor="pdf-upload" className="link-button">
                        Choose PDF
                    </label>

                    <div className="dropzone" onDrop={handleDrop} onDragOver={handleDragOver} onClick={openFilePicker}>
                        <span>Drag & drop your PDF here or click to select</span>
                        {/* Hidden input field */}
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf" style={{ display: 'none' }}/>
                    </div>

                    {pdfName && (
                        <div>
                            <span>{pdfName}</span>
                            <button onClick={handleDeletePdf} style={{ marginLeft: '10px' }}>X</button>
                        </div>
                    )}
                </div>
                <Link to="/record" class="link-button">Next</Link>
            </div>

            <Link to="/" class="back-button">&lt;</Link>
        </div>
    )

};

export default Upload;