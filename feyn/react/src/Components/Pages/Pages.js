// Skip for now
// send indicies of selected pages and have server process only those pages of the original PDF 

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Header from "../Header/Header.js";
import "./Pages.css"
import "../index.css"
import * as pdfjs from 'pdfjs-dist/webpack';
pdfjs.GlobalWorkerOptions.workerSrc = "../../../public/pdf.worker.js"

// const Pages = () => {
//     const [selectedPages, setSelectedPages] = useState([]);
//     const images = ['../../../images/pdf.jpg', '../../../images/pdf_unhighlighted.jpg']; 

const Pages = () => {
    const [selectedPages, setSelectedPages] = useState([]);
    const [pdfPages, setPdfPages] = useState([]);
    const location = useLocation();
    const pdfNameFromUpload = location.state ? location.state.pdfName : ''; // Get the PDF name from the previous component
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

    useEffect(() => {
        // Fetch the PDF from the server or use a local file for demonstration
        const fetchPdf = async () => {
            // change path
            // /pdfselect
            const response = await fetch(`${API_ENDPOINT}/path-to-pdf/${pdfNameFromUpload}`);
            const pdfBlob = await response.blob();
            const pdf = await pdfjs.getDocument(URL.createObjectURL(pdfBlob)).promise;

            const pages = [];
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1 });
                const canvas = document.createElement("canvas");
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: canvas.getContext("2d"),
                    viewport: viewport
                };

                await page.render(renderContext).promise;
                pages.push(canvas.toDataURL());
            }

            setPdfPages(pages);
        };

        fetchPdf();
    }, []);


    // same
    const handleImageClick = (index) => {
        if (selectedPages.includes(index)) {
            setSelectedPages(prev => prev.filter(i => i !== index));
        } else {
            setSelectedPages(prev => [...prev, index]);
        }
    };

    return (
        <div>
            <Header />
            <div className="center-container">
                <h1>Choose the pages you want to teach</h1>
                <div className="image-grid">
                    {pdfPages.map((imgSrc, index) => (
                        <img
                            key={index}
                            src={imgSrc}
                            alt={`Page ${index + 1}`}
                            onClick={() => handleImageClick(index)}
                            className={selectedPages.includes(index) ? 'selected' : ''}
                        />
                    ))}
                </div>
                <br/><br/><br/><br/>
                <Link to="/Record" className="main-button">Next</Link>
            </div>
            <button className="back-button">&lt;</button>
        </div>
    );
};

export default Pages;