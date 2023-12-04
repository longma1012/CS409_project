import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import tempPhoto from "../../images/Memoji Boys 2-1.png";
import searchIcon from "../../images/SearchIcon.png";
import Logo from "../../images/ProjectLogo.png";
import "./Header.css";
import { auth } from "../../config/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
    const [currentUserEmail, setCurrentUserEmail] = useState("");

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUserEmail(user.email);
            } else {
                setCurrentUserEmail("");
            }
        });

        return () => unsubscribe(); // Unsubscribe from the auth state listener on component unmount
    }, []);

    // console.log(auth?.currentUser?.email);

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
                {/* <div className="photo-container">
                    <img src={tempPhoto} alt="" className="photo" />
                </div> */}
                <p className="username">{currentUserEmail}</p>
                <Link to="/">
                    <button onClick={logout} className="logout-btn">
                        Logout
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Header;
