import "./Pages.css"
import "../index.css"
import React from 'react';
import { Link } from "react-router-dom";
import Header from "../Header/Header.js"

const Pages = () => {

    return (
        <div>
            <Header />
            <div class="center-container">
                <h1>Choose the pages you want to teach</h1>
                <Link to="/Record" class="main-button">Next</Link>
            </div>

            <button class="back-button">&lt;</button>
        </div>
    )

};

export default Pages;