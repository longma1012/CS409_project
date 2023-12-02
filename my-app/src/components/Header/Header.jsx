import React from "react";
import { Link } from "react-router-dom";
import tempPhoto from "../../images/Memoji Boys 2-1.png";
import searchIcon from "../../images/SearchIcon.png";
import Logo from "../../images/ProjectLogo.png";
import "./Header.css";

const Header = () => {
    return (
        <div className="header-container">
            <Link to="/main" className="home-link">
                <div className="home">
                    <div className="logo-container">
                        <img src={Logo} alt="" className="logo-image" />
                    </div>
                    <header className="web-name">I-AlumniHub</header>
                </div>
            </Link>
            <div className="search-bar">
                <input type="text" placeholder="Type here to search..." />
                <Link to="/searched">
                    <div className="search-icon">
                        <img src={searchIcon} alt="" />
                    </div>
                </Link>
            </div>
            <div className="User">
                <div className="photo-container">
                    <img src={tempPhoto} alt="" className="photo" />
                </div>
                <p className="username">Username123</p>
            </div>
        </div>
    );
};

export default Header;
