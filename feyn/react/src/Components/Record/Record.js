import "./Record.css"
import "../index.css"
import React from 'react';
import { Link } from "react-router-dom";
import Header from "../Header/Header.js"

const Record = () => {

    return (
        <div class="page-background">
            <Header />
            <div class="center-container">
                <h1>Ready to Teach?</h1>
                <div className="tip-container">
                    <p class="tip"><strong>Pro Tip:</strong> Keep it simple! Struggling with simplicity often indicates areas needing more study.</p>
                    <img class="sparkles" src="../../../images/sparkles.png"/>
                </div>
                <Link to="/Playback" class="main-button">Record</Link>
            </div>

            <Link to="/Pages" class="back-button">&lt;</Link>
        </div>
    )

};

export default Record;