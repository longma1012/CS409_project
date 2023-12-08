import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import styles from "./Header.module.css";
import { readUserData } from "../../dbUtils/CRUDUser";

import Logo from "../../images/ProjectLogo.png";
import searchIcon from "../../images/SearchIcon.png";
// import tempPhoto from "../../images/Memoji Boys 2-1.png";

const Header = () => {
    // const [currentUserEmail, setCurrentUserEmail] = useState("");
    const [username, setUsername] = useState("");

    const [searchInput, setSearchInput] = useState(""); // 新增：用于搜索输入的状态

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        let userId = "";

        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                readUserData(user.uid, (userData) => {
                    if (userData) {
                        setUsername(userData.username);
                    } else {
                        console.log("User data not found");
                    }
                });

            //     const atIndex = user.email.indexOf("@");
            //     const name =
            //         atIndex !== -1 ? user.email.slice(0, atIndex) : user.email;
            //     setCurrentUserEmail(name);
            } else {
                setUsername("");
            }
        });
        return () => unsubscribe();
    }, []);


    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value); // 新增：处理搜索输入的变化
    };

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
                <input 
                    type="text" 
                    placeholder="Type here to search..." 
                    value={searchInput} 
                    onChange={handleSearchInputChange} // 绑定搜索输入的变化处理函数
                />
                <Link to={`/searched?query=${searchInput}`}>
                    <div className={styles.searchIcon}>
                        <img src={searchIcon} alt="" />
                    </div>
                </Link>
            </div>


            <div className={styles.User}>
                {/* <div className={styles.photoContainer}>
                <img src={tempPhoto} alt="" className={styles.photo} />
            </div> */}
                <p className={styles.username}>{username}</p>
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
