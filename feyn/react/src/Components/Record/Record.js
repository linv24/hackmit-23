import "./Record.css"
import "../index.css"
import React from 'react';
import { Link } from "react-router-dom";
import Header from "../Header/Header.js"

const Record = () => {

    return (
        <div>
            <Header />
            <div class="center-container">
                <h1>Ready to Teach?</h1>
                <p>Tips...</p>
                <Link to="/Playback" class="main-button">Record</Link>
            </div>

            <Link to="/Pages" class="back-button">&lt;</Link>
        </div>
    )

};

export default Record;