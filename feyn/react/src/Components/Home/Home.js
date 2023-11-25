import "./Home.css"
import "../index.css"
import React from 'react';
import { Link } from "react-router-dom";
import Header from "../Header/Header.js"


const Home = () => {

    return (
        <div>
            <Header />

            <div class="orange-block">
                {/* <img src="../../../images/sparkles.png" alt="sparkles" class="effectively-image" /> */}
                <h1 class="title">Study effectively</h1>
                <Link to="/upload" class="link-button">Start</Link>
                <div class="scroll-button">
                    <a class="down" href="#middle">&lt;</a>
                </div>
            </div>
            <div id="middle" class="columns-container">
                <div class="left-column">
                    <div class="circle-with-image">
                        <img class="feynman" src="../../../static/images/feynman.png" alt="Feynman"/>
                    </div>
                    <p class="summary"><strong class="strong">Richard Feynman </strong>was an American theoretical physicist who was awarded the Nobel Prize in 1965 for his transformative work in quantum mechanics. Beyond his pioneering research, Feynman was celebrated for his extraordinary teaching capabilities. He believed deeply in the clarity of understanding, asserting that true comprehension came when a concept could be explained in simple terms. From this belief emerged the Feynman Technique, a powerful method for deepening understanding. The essence of this technique is to learn by teaching: if you can explain a topic in straightforward terms, then you've truly grasped its essence. This approach not only helps in assimilating knowledge but also in identifying gaps in understanding, making it an invaluable tool for learners across disciplines.</p>
                </div>

                <div class="right-column">
                    <div class="block light-orange">
                        <h3>Step 1</h3>
                        <p>Take notes on a topic you want to study</p>
                    </div>
                    <div class="block dark-orange">
                        <h3>Step 2</h3>
                        <p>Upload your notes</p>
                    </div>
                    <div class="block light-orange">
                        <h3>Step 3</h3>
                        <p>Teach your topic to Refeyn</p>
                    </div>
                    <div class="block dark-orange">
                        <h3>Step 4</h3>
                        <p>Review gaps in understanding</p>
                    </div>
                    <div class="block light-orange">
                        <h3>Step 5</h3>
                        <p>Repeat</p>
                    </div>
                </div>
            </div>
            <div classNmae="buffer">
                <p> </p>
            </div>
        </div>
    )

};

export default Home;