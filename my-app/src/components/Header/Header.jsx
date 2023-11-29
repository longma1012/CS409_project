import React from "react";
import tempPhoto from "../../images/Memoji Boys 2-1.png";
import searchIcon from "../../images/SearchIcon.png";
import Logo from "../../images/ProjectLogo.png";

const Header = () => {
    return (
        <div className="header-container">
            <div className="home">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
                <h1 className="web-name">I-AlumniHub</h1>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    value={searchTerm}
                    placeholder="Type here to search..."
                />
                <div className="search-icon">
                    <img src={searchIcon} alt="" />
                </div>
            </div>
            <div className="User">
                <div className="photo-container">
                    <img src={tempPhoto} alt="" />
                </div>
                <p className="username">Username123</p>
            </div>
        </div>
    );
};

export default Header;
