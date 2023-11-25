import "./Record.css"
import "../index.css"
import React from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/Header.js"

const Record = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const sessionId = location.state ? location.state.sessionId : null;

    const navigateToPlayback = () => {
        navigate('/Playback', { state: { sessionId: sessionId } });
    }

    return (
        <div class="page-background">
            <Header />
            <div class="center-container">
                <h1>Ready to Teach?</h1>
                <div className="tip-container">
                    <p class="tip"><strong>Pro Tip:</strong> Keep it simple! Struggling with simplicity often indicates areas needing more study.</p>
                    <img class="sparkles" src="../../../static/images/sparkles.png"/>
                </div>
                <button className="main-button" onClick={navigateToPlayback}>Record</button>
            </div>

            <Link to="/Pages" class="back-button">&lt;</Link>
        </div>
    )

};

export default Record;