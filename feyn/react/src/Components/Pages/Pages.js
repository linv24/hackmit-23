// demo 
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Header from "../Header/Header.js";
import "./Pages.css"
import "../index.css"
import * as pdfjs from 'pdfjs-dist/webpack';
pdfjs.GlobalWorkerOptions.workerSrc = "../../../public/pdf.worker.js"

const Pages = () => {
    const [selectedPages, setSelectedPages] = useState([]);
    const images = ['../../../images/pdf.jpg']; // Add paths of your images here

    // const location = useLocation();
    // const pdfName = location.state?.pdfName || '';

    // const [pdfImages, setPdfImages] = useState([]);

    // // const path = `../../${pdfName}`;
    // const path = `test.pdf`

    // useEffect(() => {
    //     if (pdfName) {
    //         const loadPdf = async () => {
    //             const pdf = await pdfjs.getDocument(path).promise;
    //             const numPages = pdf.numPages;
    //             const images = [];
    
    //             for (let i = 1; i <= numPages; i++) {
    //                 const page = await pdf.getPage(i);
    //                 const viewport = page.getViewport({ scale: 1 });
    //                 const canvas = document.createElement('canvas');
    //                 const ctx = canvas.getContext('2d');
    //                 canvas.height = viewport.height;
    //                 canvas.width = viewport.width;
    
    //                 await page.render({ canvasContext: ctx, viewport: viewport }).promise;
    //                 images.push(canvas.toDataURL());
    //                 console.log(images);
    //             }
    
    //             setPdfImages(images);
    //         };
    
    //         loadPdf();
    //     }
    // }, [pdfName]);

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
                {/* <div className="image-grid">
                    {pdfImages.map((imgSrc, index) => (
                        <img 
                            key={index} 
                            src={imgSrc} 
                            alt={`Page ${index + 1}`} 
                            onClick={() => handleImageClick(index)}
                            className={selectedPages.includes(index) ? 'selected' : ''}
                        />
                    ))}
                </div> */}
                <div className="image-grid">
                    {images.map((img, index) => (
                        <img 
                            key={index} 
                            src={img} 
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