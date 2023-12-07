import React from "react";
import { Link } from "react-router-dom";
import styles from "./PostCard.module.css";

import tempPhoto from "../../images/Memoji Boys 2-1.png";

const PostCard = ({post}) => {
  console.log(post);
  return (
    <div className={styles.post_card}>
      <div className={styles.content_area}>
        <div className={styles.post_card_title}>
        {post.Title}
        </div>
        <div className={styles.poster_area}>
          <p className={styles.poster_name}>{post.UserEmail}</p>
          <p className={styles.post_time}>{post.PostTime}</p>
        </div>
        <div className={styles.post_card_content}>
          {post.Body}
        </div>
      </div>
      <div className={styles.info_area}>
        <div className={styles.category_tag}>{post.Category}</div>
        <div className={styles.data}>
          <p className={styles.comments}>56 Comments</p>
          <p className={styles.likes}>{post.Likes}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
