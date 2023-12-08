import React, { useState, useEffect } from "react";
import Header from "../Header/Header.jsx";
import Categories from "./Categories.jsx";
import PostCard from "./PostCard.jsx";
import { Link, useLocation } from "react-router-dom";
import { readAllPostData } from "../../dbUtils/CRUDPost.js";

import styles from "./AfterSearch.module.css";

const AfterSearch = () => {
    const [posts, setPosts] = useState([]);
    const [chosenCategory, setChosenCategory] = useState("All");
    // handle go back Btn
    const location = useLocation();
    const handleGoBack = () => {
        window.history.back();
    };

    const searchQuery =
        new URLSearchParams(location.search).get("query")?.toLowerCase() || "";

    // Filter functions
    const handleSelectCategory = (category) => {
        setChosenCategory(category);
    };

    useEffect(() => {
        readAllPostData((allPosts) => {
            console.log("All Posts:", allPosts);

            let filteredPosts = allPosts;

            if (searchQuery) {
                filteredPosts = allPosts.filter(
                    (post) =>
                        (post.Title &&
                            post.Title.toLowerCase().includes(searchQuery)) ||
                        (post.Body &&
                            post.Body.toLowerCase().includes(searchQuery))
                );
            }
            if (chosenCategory && chosenCategory !== "All") {
                filteredPosts = filteredPosts.filter(
                    (post) => post.Category === chosenCategory
                );
            }
            setPosts(filteredPosts);
        });
    }, [searchQuery, chosenCategory]);

    return (
        <div>
            <Header />
            <Categories
                onSelectCategory={handleSelectCategory}
                chosenCategory={chosenCategory}
            />
            <div className={styles.main_area}>
                <div className={styles.backBtnContainer}>
                    <button className={styles.backBtn} onClick={handleGoBack}>
                        Back
                    </button>
                </div>
                <div className={styles.post_card_container}>
                    {posts.map((post, index) => (
                        <Link
                            key={index}
                            className={styles.postLink}
                            to={`/details/${post.id}`}
                        >
                            <PostCard post={post} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AfterSearch;
