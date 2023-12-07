import React from "react";
import Header from "../Header/Header.jsx";
import Categories from "./Categories.jsx";
import PostCard from "./PostCard.jsx";
import { Link } from "react-router-dom";
import { readAllPostData } from "../../dbUtils/CRUDPost.js";

import styles from "./MainPage.module.css";

import tempPhoto from "../../images/Memoji Boys 2-1.png";
import { useState, useEffect } from "react";

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const genres_type = [
    "All",
    "Alumni Events",
    "Lifestyle & Hobbies",
    "Job & Career",
    "Food & Drink",
    "Academic Discussions",
    "Food & Drink",
    "Emotional Life",
  ];

  useEffect(() => {
    readAllPostData((allPosts) => {
      setPosts(allPosts);
    });
  }, []);

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
          <Link to="/createpost" className={styles.create_post_button}>
            <div>
              <button>Create Post</button>
            </div>
          </Link>
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

export default MainPage;
