import React, { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Header from "../Header/Header.jsx";
import styles from "./ViewPost.module.css";
import LikeIcon from "../../images/Like.png";
import { useParams, useLocation } from "react-router-dom";
import {
  readPostData,
  updateCommentList,
  updatePost,
} from "../../dbUtils/CRUDPost.js";
import { writeCommentData } from "../../dbUtils/CRUDComment.js";
import { v4 as uuidv4 } from "uuid";

const ViewPost = () => {
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  //   const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState("");
  const [post, setPost] = useState("");
  const { postId } = useParams();

  // handle go back Btn
  const location = useLocation();
  const handleGoBack = () => {
    window.history.back();
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const submitComment = () => {
    const commentId = uuidv4(); // Generate a unique ID for the comment
    const createTime = new Date().toISOString();

    writeCommentData(commentId, postId, comment, createTime, currentUserEmail);

    const updatedCommentList = post.CommentList
      ? [...post.CommentList, commentId]
      : [commentId];
    console.log("Commend id is " + commentId);
    updatePost(postId, { CommentList: updatedCommentList });
    setComment(""); // Clear the comment input after submitting
  };

  useEffect(() => {
    // Fetch post data when postId changes
    if (postId) {
      readPostData(postId, (postData) => {
        setPost(postData);
      });
    }
  }, [postId]); // This effect runs when postId changes
  //   console.log("check post item: " + post.Title);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserEmail(user.email);
      } else {
        setCurrentUserEmail("");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.viewPostContainer}>
        <div className={styles.backBtnContainer}>
          <button className={styles.backBtn} onClick={handleGoBack}>
            Back
          </button>
        </div>
        <div className={styles.postDetails}>
          <div className={styles.postTitle}> {post.Title} </div>
          <div className={styles.name}> {post.UserEmail} </div>
          <div className={styles.postContent}>{post.Body}</div>
          <div className={styles.categoryAndLikes}>
            <div className={styles.category}>{post.Category}</div>
            <div className={styles.likeArea}>
              <div className={styles.likeBtn}>
                <img src={LikeIcon} alt="" />
              </div>
              <div className={styles.likes}>{post.Likes}</div>
            </div>
          </div>
        </div>
        <div className={styles.selfCommentPost}>
          <input
            type="text"
            placeholder="Leave your content here..."
            value={comment}
            onChange={handleCommentChange}
          />
          <button onClick={submitComment}>Comment</button>
        </div>
        <div className={styles.postComments}>
          <div className={styles.postComment}>
            <div className={styles.commenterID}> NAME123456</div>
            <div className={styles.commentContent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              turpis ligula, posuere sed tempor a, sodales eget magna. Praesent
              elementum lacinia magna sed consequat. Maecenas nibh erat, sodales
              id ante eu, suscipit rutrum lorem.
            </div>
          </div>
          <div className={styles.postComment}>
            <div className={styles.commenterID}> ab2 </div>
            <div className={styles.commentContent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              turpis ligula, posuere sed tempor a, sodales eget magna. Praesent
              elementum lacinia magna sed consequat. Maecenas nibh erat, sodales
              id ante eu, suscipit rutrum lorem.
            </div>
          </div>
          <div className={styles.postComment}>
            <div className={styles.commenterID}> NAME123456</div>
            <div className={styles.commentContent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              turpis ligula, posuere sed tempor a, sodales eget magna. Praesent
              elementum lacinia magna sed consequat. Maecenas nibh erat, sodales
              id ante eu, suscipit rutrum lorem.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPost;
