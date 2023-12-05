import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import styles from "./Header.module.css";

import Logo from "../../images/ProjectLogo.png";
import searchIcon from "../../images/SearchIcon.png";
// import tempPhoto from "../../images/Memoji Boys 2-1.png";

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
                const atIndex = user.email.indexOf('@');
                const name = atIndex !== -1 ? user.email.slice(0, atIndex) : user.email;
                setCurrentUserEmail(name);
              } else {
                setCurrentUserEmail("");
              }
        });
        return () => unsubscribe();
    }, []);

    // console.log(auth?.currentUser?.email);

    return (
        <div className={styles.headerContainer}>
            <Link to="/main" className={styles.homeLink}>
                <div className={styles.home}>
                    <div className={styles.logoContainer}>
                        <img src={Logo} alt="" className={styles.logoImage} />
                    </div>
                    <header className={styles.webName}>I-AlumniHub</header>
                </div>
            </Link>
            <div className={styles.searchBar}>
                <input type="text" placeholder="Type here to search..." />
                <Link to="/searched">
                    <div className={styles.searchIcon}>
                        <img src={searchIcon} alt="" />
                    </div>
                </Link>
            </div>
            <div className={styles.User}>
                {/* <div className={styles.photoContainer}>
                <img src={tempPhoto} alt="" className={styles.photo} />
            </div> */}
                <p className={styles.username}>{currentUserEmail}</p>
                <Link to="/">
                    <button onClick={logout} className={styles.logoutBtn}>
                        Logout
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Header;
