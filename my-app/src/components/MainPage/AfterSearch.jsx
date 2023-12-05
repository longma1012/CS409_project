import React from "react";
import Header from "../Header/Header.jsx";
import Categories from "./Categories.jsx";
import PostCard from "./PostCard.jsx";
import { Link } from "react-router-dom";

import styles from "./MainPage.module.css";

import tempPhoto from "../../images/Memoji Boys 2-1.png";

const AfterSearch = () => {
    return (
        <div>
            <Header />
            <Categories />
            <div className={styles.main_area}>
                <div className={styles.CreatePost}>
                    <div className={styles.create_post_input}>
                        <input
                            type="text"
                            placeholder="Let's share what's going on your mind..."
                        />
                    </div>
                    <Link
                        to="/createpost"
                        className={styles.create_post_button}
                    >
                        <div>
                            <button>Create Post</button>
                        </div>
                    </Link>
                </div>
                <div className={styles.post_card_container}>
                    <Link className={styles.postLink} to="/details/postid">
                        <PostCard />
                    </Link>
                    <PostCard />
                    <PostCard />
                    <PostCard />
                </div>
            </div>
        </div>
    );
};

export default AfterSearch;
