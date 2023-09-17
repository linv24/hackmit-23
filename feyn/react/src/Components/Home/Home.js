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
                        <img class="feynman" src="../../../images/feynman.png"/>
                    </div>
                    <p>Text</p>
                </div>

                <div class="right-column">
                    <div class="block light-orange">Step 1</div>
                    <div class="block dark-orange">Step 2</div>
                    <div class="block light-orange">Step 3</div>
                    <div class="block dark-orange">Step 4</div>
                </div>
            </div>
        </div>
    )

};

export default Home;