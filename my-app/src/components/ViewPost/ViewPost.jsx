import React, { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Header from "../Header/Header.jsx";
import styles from "./ViewPost.module.css";
import LikeIcon from "../../images/Like.png";
import { useParams, useLocation } from "react-router-dom";
import {
  readPostData,
  updatePost,
  readLikesCountCallBack,
  readLikesCount,
} from "../../dbUtils/CRUDPost.js";
import { readUsername } from "../../dbUtils/CRUDUser";
import {
  writeCommentData,
  readCommentData,
} from "../../dbUtils/CRUDComment.js";
import { v4 as uuidv4 } from "uuid";

const ViewPost = () => {
  const [postUsername, setPostUsername] = useState("");
  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [myUsername, setMyUsername] = useState("");
  const [comments, setComments] = useState([]); // Add this state to hold comment data
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

  const handleCommentSubmit = () => {
    if (myUsername && post && comment) {
      submitComment();
    } else {
      console.log("Username or post information is not available.");
    }
  };

  useEffect(() => {
    // Start listening to the likes count
    const unsubscribe = readLikesCountCallBack(postId, (newLikes) => {
      setLikes(newLikes);
    });
    // Cleanup function to stop listening when the component unmounts
    return () => unsubscribe();
  }, [postId]);

  const handleLike = () => {
    // Calculate updatedLikes
    const updatedLikes = likes + 1;

    // Update the like count in the database
    updatePost(postId, { Likes: updatedLikes });

    // No need to setLikes here since the listener will update it
    console.log("Updated likes number is " + updatedLikes);
  };

  const submitComment = () => {
    if (myUsername === "Unknown User") {
      console.log("User not logged in");
      return;
    }
    const commentId = uuidv4();
    const createTime = new Date().toISOString();
    const newComment = {
      Content: comment,
      CreateTime: createTime,
      CommentUserName: myUsername,
      id: commentId,
    };

    // Write the new comment data to the database
    writeCommentData(commentId, postId, comment, createTime, myUsername);

    // Update the post's CommentList with the new comment ID
    const updatedCommentList = post.CommentList
      ? [...post.CommentList, commentId]
      : [commentId];
    updatePost(postId, { CommentList: updatedCommentList });

    // Add the new comment to the comments state to update the UI immediately
    setComments([...comments, newComment]);

    // Clear the comment input after submitting
    setComment("");
  };

  // get post user name
  useEffect(() => {
    const fetchPostUsername = async () => {
      try {
        // console.log(post.userId);
        if (post.userId) {
          const fetchedUsername = await readUsername(post.userId);
          setPostUsername(fetchedUsername || "Unknown User");
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    fetchPostUsername();
  }, [post.userId]);

  // get my user name
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const fetchedMyUsername = await readUsername(user.uid);
          setMyUsername(fetchedMyUsername || "Unknown User");
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      } else {
        setMyUsername("Unknown User");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch post data when postId changes
    if (postId) {
      readPostData(postId, (postData) => {
        setPost(postData);
      });
    }
  }, [postId]); // This effect runs when postId changes

  useEffect(() => {
    let unsubscribeFromLikes;
    // Fetch post data when postId changes
    if (postId) {
      readPostData(postId, (postData) => {
        setPost(postData);
        // setLikes(postData.Likes);

        if (postData) {
          setLikes(postData.Likes || 0); // 使用 postData 初始化 likes
        }

        if (postData.CommentList) {
          // For each comment ID in the CommentList, fetch the comment data
          const commentPromises = postData.CommentList.map(
            (commentId) =>
              new Promise((resolve) => {
                readCommentData(commentId, (commentData) => {
                  resolve({ id: commentId, ...commentData });
                });
              })
          );
          Promise.all(commentPromises).then((commentsData) => {
            setComments(commentsData); // Update the comments state with all fetched comments
          });
        }
      });
    }
  }, [postId]);

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
          <div className={styles.name}> {postUsername} </div>
          <div className={styles.postTime}>{formattedTimeDifference}</div>
          <div className={styles.postContent}>{post.Body}</div>
          <div className={styles.categoryAndLikes}>
            <div className={styles.category}>{post.Category}</div>
            <div className={styles.likeArea}>
              <div className={styles.likeBtn}>
                <button onClick={handleLike} className={styles.likeButton}>
                  <img src={LikeIcon} alt="Like" />
                </button>
              </div>
              <div className={styles.likes}>{likes}</div>
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
          <button onClick={handleCommentSubmit}>Comment</button>
        </div>
        <div className={styles.postComments}>
          {comments.map((singlecomment) => (
            <div key={singlecomment.id} className={styles.postComment}>
              <div className={styles.commenter}>
                <div className={styles.commenterID}>
                  {singlecomment.CommentUserName}
                </div>
                <div className={styles.commentTime}>
                  {getTimeDifference(singlecomment.CreateTime)}
                </div>
              </div>
              <div className={styles.commentContent}>
                {singlecomment.Content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewPost;
