// demo 
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header from "../Header/Header.js";
import "./Pages.css"
import "../index.css"

const Pages = () => {
    const [selectedPages, setSelectedPages] = useState([]);
    const images = ['../../../images/x.png', '../../../images/x.png', '../../../images/x.png', '../../../images/x.png', '../../../images/x.png']; // Add paths of your images here

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