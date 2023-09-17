import "./Results.css"
import "../index.css"
import React from 'react';
import { Link } from "react-router-dom";
import Header from "../Header/Header.js"

const Results = () => {

    const getScoreMessage = (score) => {
        if (score >= 80) return "Great job!";
        if (score >= 60) return "Good job!";
        if (score >= 40) return "You can do better!";
        if (score >= 20) return "Needs improvement!";
        return "Keep trying!";
    };

    const score = 90; // dynamic

    return (
        <div>
            <Header />
            <div className="container">
                <div className="greyBox">
                    <p class="scoreMessage">{getScoreMessage(score)}</p>
                    <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg"
                        d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path className="circle"
                        stroke-dasharray={`${score}, 100`}
                        d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className="percentage">{score}</text>
                    </svg>
                    <Link to="/Record" class="main-button">Try Again</Link>
                    <Link to="/Pages" class="main-button">Choose New Pages</Link>
                </div>
                <div className="orangeBox">
                    <h3>Things you got wrong:</h3>
                    <li>filler</li>
                    <h3>Things you missed:</h3>
                    <li>filler</li>
                </div>
            </div>
        </div>
    )

};

export default Results;