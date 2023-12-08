import React, { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Header from "../Header/Header.jsx";
import styles from "./ViewPost.module.css";
import LikeIcon from "../../images/Like.png";
import { useParams, useLocation } from "react-router-dom";
import { readPostData, updatePost } from "../../dbUtils/CRUDPost.js";
import { readUsername } from "../../dbUtils/CRUDUser";
import {
    writeCommentData,
    readCommentData,
} from "../../dbUtils/CRUDComment.js";
import { v4 as uuidv4 } from "uuid";

const ViewPost = () => {
    const [postUsername, setPostUsername] = useState("");
    const [myUsername, setMyUsername] = useState("");
    const [comments, setComments] = useState([]); // Add this state to hold comment data
    const [myUserId, setMyUserId] = useState("");
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

    const submitComment = () => {
        if (myUsername == "Unknown User") {
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
                setMyUserId(user.uid);
                try {
                    const fetchedMyUsername = await readUsername(user.uid);
                    setMyUsername(fetchedMyUsername || "Unknown User");
                } catch (error) {
                    console.error("Error fetching username:", error);
                }
            } else {
                setMyUserId("");
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
        // Fetch post data when postId changes
        if (postId) {
            readPostData(postId, (postData) => {
                setPost(postData);
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
                    <button onClick={handleCommentSubmit}>Comment</button>
                </div>
                <div className={styles.postComments}>
                    {comments.map((singlecomment) => (
                        <div
                            key={singlecomment.id}
                            className={styles.postComment}
                        >
                            <div className={styles.commenterID}>
                                {singlecomment.CommentUserName}
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
