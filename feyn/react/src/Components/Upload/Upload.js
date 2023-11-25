import "./Upload.css"
import "../index.css"
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header from "../Header/Header.js"

const fileInputRef = React.createRef();
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

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

    const handleUpload = async () => {
        if (pdf) {
            const formData = new FormData();
            formData.append('file', pdf);
    
            try {
                const response = await fetch(`${API_ENDPOINT}/api/pdf/`, {
                    method: 'POST',
                    body: formData
                });
    
                if (response.status === 200) {
                    alert('File uploaded successfully.');
    
                    // send the file path in the body as JSON?
                    const filePath = response.filePath || '';
                    const similarityResponse = await fetch(`${API_ENDPOINT}/api/similarity/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ filepath: filePath })
                    });
    
                    if (similarityResponse.status === 200) {
                        const similarityData = await similarityResponse.json();
                        console.log(similarityData);
                    } else {
                        alert('Failed to fetch similarity.');
                    }
                } else {
                    alert('Failed to upload file.');
                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        } else {
            alert('No file selected.');
        }
    }

    return (
        <div class="page-background">
            <Header />
            <div class="center-container">
                <h1>Upload a pdf of your notes</h1>
                <div>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf"
                        style={{ display: 'none' }}
                        id="pdf-upload"
                    />

                    <div className="dropzone" onDrop={handleDrop} onDragOver={handleDragOver} onClick={openFilePicker}>
                        <img src="../../../images/upload.png" alt="Arrow" class="upload-image"/>
                        <span>Drag & Drop Files or </span>
                        <span class="bold">Browse</span>
                        <p class="small">Supported formats: PDF</p>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf" style={{ display: 'none' }}/>
                    </div>

                    {pdfName && (
                        <div class="uploaded-wrapper">
                            <p class="uploaded-txt">Uploaded</p>
                            <div class="uploaded-file-container">
                                <span>{pdfName}</span>
                                <button onClick={handleDeletePdf} className="delete-button">
                                    <img src="../../../images/x.png" alt="Delete" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <button className="link-button" onClick={handleUpload}>Upload PDF</button>
            </div>

            <Link to="/" class="back-button">&lt;</Link>
        </div>
    )

};

export default Upload;

// postrequest body needs the filepath as a json