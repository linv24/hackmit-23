import "./Results.css"
import "../index.css"

import Header from "../Header/Header.js"

const Results = () => {

    const score = 90; // dynamic

    return (
        <div>
            <Header />
            <div className="container">
                <div className="greyBox">
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
                </div>
                <div className="orangeBox">
                </div>
            </div>
        </div>
    )

};

export default Results;