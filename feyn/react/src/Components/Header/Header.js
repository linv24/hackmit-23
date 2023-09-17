import React from 'react';
import { Link } from "react-router-dom";
import "./Header.css"
import "../index.css"

const Header = () => {

    return (
        <header class="header">
            <Link to="/" class="logo-container">
                <img src="../../../images/logo.png" alt="Logo" class="logo"/>
                <h3 class="fyne">refyne</h3>
            </Link>
            <button class="main-button">Login</button>
        </header>
    )

};

export default Header;