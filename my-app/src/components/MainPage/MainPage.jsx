import React, { useState, useEffect } from "react";
import Header from "../Header/Header.jsx";
import Categories from "./Categories.jsx";
import PostCard from "./PostCard.jsx";
import { Link } from "react-router-dom";
import { readAllPostData } from "../../dbUtils/CRUDPost.js";

import styles from "./MainPage.module.css";

import tempPhoto from "../../images/Memoji Boys 2-1.png";

const MainPage = () => {
    const [posts, setPosts] = useState([]);
    const [inputPostValue, setInputPostValue] = useState("");
    const [chosenCategory, setChosenCategory] = useState("All");
    const [filteredPosts, setFilteredPosts] = useState([]);

    const handleInputPostChange = (event) => {
        setInputPostValue(event.target.value);
    };

    // useEffect(() => {
    //     readAllPostData((allPosts) => {
    //         setPosts(allPosts);
    //     });
    // }, []);

    // Filter functions
    const handleSelectCategory = (category) => {
        setChosenCategory(category);
    };
    useEffect(() => {
        readAllPostData((allPosts) => {
            // setPosts(allPosts);
            console.log(chosenCategory);
            if (chosenCategory === "All") {
                // console.log(allPosts)
                setFilteredPosts(allPosts);
            } else {
                const filtered = allPosts.filter(
                    (post) => post.Category === chosenCategory
                );
                console.log(filtered)
                setFilteredPosts(filtered);
            }
        });
    }, [chosenCategory]);

    return (
        <div>
            <Header />
            <Categories onSelectCategory={handleSelectCategory} chosenCategory={chosenCategory}  />
            <div className={styles.main_area}>
                <div className={styles.CreatePost}>
                    <div className={styles.create_post_input}>
                        <input
                            type="text"
                            placeholder="Let's share what's going on your mind..."
                            value={inputPostValue}
                            onChange={handleInputPostChange}
                        />
                    </div>
                    <Link
                        to={`/createpost?inputPostValue=${inputPostValue}`}
                        className={styles.create_post_button}
                    >
                        <div>
                            <button>Create Post</button>
                        </div>
                    </Link>
                </div>

                <div className={styles.post_card_container}>
                    {filteredPosts.map((post, index) => (
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

export default MainPage;
