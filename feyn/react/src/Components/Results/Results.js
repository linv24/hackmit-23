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
                    {/* <h3>Things you got wrong:</h3>
                    <li>filler</li>
                    <h3>Things you missed:</h3>
                    <li>filler</li> */}
                    <h3>Feedback</h3>
                    <p>- The first text mentions Richard Feynman's charismatic teaching style, while the second text does not.
- The second text mentions that Feynman studied at MIT and Princeton, while the first text only mentions that he attended those universities.
- The first text mentions Feynman's work on the Manhattan Project during World War II, while the second text only mentions his contribution to the project.
- The second text mentions Feynman's bongo drumming hobby, which is not mentioned in the first text.
- The first text mentions that Feynman's legacy continues to inspire physicists and science enthusiasts worldwide, while the second text mentions that his legacy continues to inspire scientists and enthusiasts globally.
- The second text specifically mentions Feynman's book "Feynman's Lectures on physics," while the first text only mentions his books in general.
</p>
                </div>
            </div>
        </div>
    )

};

export default Results;