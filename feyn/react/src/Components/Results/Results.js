import "./Results.css";
import "../index.css";
import React from 'react';
import { Link } from "react-router-dom";
import Header from "../Header/Header.js";

const Results = () => {
    const [score, setScore] = useState(0);
    const [feedbackArray, setFeedbackArray] = useState([]);
    // const feedbackText = "Point1-Point2-Point3"; // Your feedback string
    // const feedbackArray = feedbackText.split('-'); // Split the string into an array using '-' as a delimiter

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch('https://localhost:8000/api/similarity');
                if (!response.ok) {
                    throw new Error('Network bad');
                }
                const data = await response.json();
                setScore(data.score * 100);
                setFeedbackArray(data.text.split('\n').slice(1).map(line => line.trim().substring(4)));
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchResults();
    }, []);

    const getScoreMessage = (score) => {
        if (score >= 80) return "Great job!";
        if (score >= 60) return "Good job!";
        if (score >= 40) return "You can do better!";
        if (score >= 20) return "Needs improvement!";
        return "Keep trying!";
    };

    // const text = `Score: 0.843
    // The PDF mentions Richard Feynman being born in 1918 in Queens, New York, while the recording mentions him being born on May 1119 in Buffalo, New York.
    // The PDF states that Feynman obtained his Ph.D. in physics from Princeton University, while the recording does not mention where he obtained his Ph.D.
    // The PDF mentions Feynman's role in the development of the atomic bomb during World War II, while the recording mentions his work on the Manhattan Project during World War I.
    // The PDF states that Feynman joined the faculty at the California Institute of Technology after the war, while the recording does not mention when he joined the institute.
    // The PDF mentions Feynman's significant contributions to quantum electrodynamics, while the recording mentions his research on quantum mechanics.
    // The PDF states that Feynman received the Nobel Prize in Physics in 1965, while the recording states that he won a Nobel Peace Prize in physics in 1956.
    // The PDF mentions Feynman's ability to explain complex scientific concepts in relatable terms, while the recording mentions his lectures and books being simple.
    // The PDF mentions Feynman's passion for music and bongo drumming, while the recording mentions his love for music, especially bongo drumming.
    // The PDF states that Feynman passed away in 1998, while the recording states that he passed away in the February of T 90 H.` // dynamic

    // const textLines = text.split('\n')
    // // const score = 0.97 * 100; // dynamic
    // const score = textLines[0].split(' ')[1] * 100
    // const feedbackArray = []
    // for (const line of textLines.slice(1)) {
    //     feedbackArray.push(line.substring(4))
    // }

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
                        <text x="18" y="20.35" className="percentage">{score.toFixed(2)}</text>
                    </svg>
                    <Link to="/Record" className="results-button">Try Again</Link>
                    <Link to="/Pages" className="results-button">Choose New Pages</Link>
                </div>
                <div className="orangeBox">
                    <h3>Feedback</h3>
                    <ul>
                        {feedbackArray.map((point, index) => <li key={index}>{point}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Results;

// after you finish recording, click done button, makes post request with mp3 
// make another request to get the similarity results 
// will return score and text
// /api/similarity