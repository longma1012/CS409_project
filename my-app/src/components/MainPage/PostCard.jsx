import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PostCard.module.css";
import { readUsename } from "../../dbUtils/CRUDUser";

import tempPhoto from "../../images/Memoji Boys 2-1.png";

const PostCard = ({ post }) => {
  // console.log(post);
  // count comment numbers
  const commentCount = post.CommentList
    ? Object.keys(post.CommentList).length
    : 0;

  // get poster name
  const [username, setUsername] = useState("");
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        // console.log(post.userId);
        const fetchedUsername = await readUsename(post.userId);
        setUsername(fetchedUsername || "Unknown User");
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, [post.userId]);

  // calculate time
  const getTimeDifference = (postTime) => {
    const currentTime = new Date();
    const postDate = new Date(postTime);
    const difference = currentTime - postDate;

    // 转换为秒
    const seconds = Math.floor(difference / 1000);

    if (seconds < 60) {
      return "Just now";
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else if (seconds < 2592000) {
      const days = Math.floor(seconds / 86400);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    } else if (seconds < 31536000) {
      const months = Math.floor(seconds / 2592000);
      return `${months} month${months !== 1 ? "s" : ""} ago`;
    } else {
      const years = Math.floor(seconds / 31536000);
      return `${years} year${years !== 1 ? "s" : ""} ago`;
    }
  };

  // 使用 getTimeDifference 函数计算时间差距
  const formattedTimeDifference = getTimeDifference(post.PostTime);

  return (
    <div className={styles.post_card}>
      <div className={styles.content_area}>
        <div className={styles.post_card_title}>{post.Title}</div>
        <div className={styles.poster_area}>
          <p className={styles.poster_name}>{username}</p>
          <p className={styles.post_time}>{formattedTimeDifference}</p>
        </div>
        <div className={styles.post_card_content}>{post.Body}</div>
      </div>
      <div className={styles.info_area}>
        <div className={styles.category_tag}>{post.Category}</div>
        <div className={styles.data}>
          <p className={styles.comments}>Comments: {commentCount}</p>
          <p className={styles.likes}>Likes: {post.Likes}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
