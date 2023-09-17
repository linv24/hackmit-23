import "./Results.css";
import "../index.css";
import React from 'react';
import { Link } from "react-router-dom";
import Header from "../Header/Header.js";

const Results = () => {
    const feedbackText = "Point1-Point2-Point3"; // Your feedback string
    const feedbackArray = feedbackText.split('-'); // Split the string into an array using '-' as a delimiter

    const getScoreMessage = (score) => {
        if (score >= 80) return "Great job!";
        if (score >= 60) return "Good job!";
        if (score >= 40) return "You can do better!";
        if (score >= 20) return "Needs improvement!";
        return "Keep trying!";
    };

    const text = `
    Score: 0.986
- The PDF mentions Richard Feynman's Ph.D. in physics, while the recording does not.
- The PDF mentions Feynman's significant advancements in quantum electrodynamics at Caltech, while the recording does not.
- The PDF mentions Feynman's love of music, specifically bongo drumming, while the recording does not.
- The PDF mentions Feynman's passing in 1988, while the recording does not.
- The PDF mentions Feynman's legacy continuing to inspire physicists and science enthusiasts worldwide, while the recording does not.
    ` // dynamic

    const textLines = text.split('\n')
    // const score = 0.97 * 100; // dynamic
    const score = textLines[0].split(' ')[1] * 100
    const feedbackArray = textLines.slice(1)

    return (
        <div>
            <Header />
            <div className="container">
                <div className="greyBox">
                    <p className="scoreMessage">{getScoreMessage(score)}</p>
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
                    <Link to="/Record" className="results-button">Try Again</Link>
                    <Link to="/Pages" className="results-button">Choose New Pages</Link>
                </div>
                <div className="orangeBox">
                    <h3>Feedback</h3>
                    <ul>
                        {feedbackArray.map(point => <li>{point}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Results;