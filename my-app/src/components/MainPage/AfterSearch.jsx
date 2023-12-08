import React, { useState, useEffect } from "react";
import Header from "../Header/Header.jsx";
import Categories from "./Categories.jsx";
import PostCard from "./PostCard.jsx";
import { Link, useLocation } from "react-router-dom";
import { readAllPostData } from "../../dbUtils/CRUDPost.js";

import styles from "./AfterSearch.module.css";

const AfterSearch = () => {
    const [posts, setPosts] = useState([]);
    const location = useLocation();

    const searchQuery = new URLSearchParams(location.search).get('query')?.toLowerCase() || "";

    useEffect(() => {
        readAllPostData((allPosts) => {

            console.log("All Posts:", allPosts);

            
            const filteredPosts = searchQuery 
            ? allPosts.filter(post => 
                (post.Title && post.Title.toLowerCase().includes(searchQuery)) || 
                (post.Body && post.Body.toLowerCase().includes(searchQuery))
              )
            : allPosts;

            
            setPosts(filteredPosts);
        });
    }, [searchQuery]);

    return (
        <div>
            <Header />
            <Categories />
            <div className={styles.main_area}>
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

