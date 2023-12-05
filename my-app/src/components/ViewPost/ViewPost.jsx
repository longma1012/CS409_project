import React, { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Header from "../Header/Header.jsx";
import styles from "./ViewPost.module.css";
import LikeIcon from "../../images/Like.png";

const ViewPost = () => {
    const [currentUserEmail, setCurrentUserEmail] = useState("");

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
                <div className={styles.postDetails}>
                    <div className={styles.postTitle}> Title of the Post </div>
                    <div className={styles.name}> Name </div>
                    <div className={styles.postContent}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis turpis ligula, posuere sed tempor a, sodales eget
                        magna. Praesent elementum lacinia magna sed consequat.
                        Maecenas nibh erat, sodales id ante eu, suscipit rutrum
                        lorem. Nulla lobortis sed arcu eu scelerisque. Aenean
                        tortor velit, malesuada a ullamcorper sodales, lacinia a
                        tortor. Suspendisse viverra turpis ipsum, eget imperdiet
                        velit ultricies et. Phasellus ac pharetra orci.
                        Vestibulum mauris tellus, ullamcorper eu elementum nec,
                        volutpat vel lacus. In suscipit lorem sit amet ex
                        tempus, dignissim pulvinar sapien eleifend. Pellentesque
                        in ullamcorper neque. Sed commodo faucibus sapien, vitae
                        varius metus sollicitudin ac. Vivamus lorem odio,
                        convallis non cursus eget, ultrices non arcu. Cras
                        volutpat tempor magna et blandit. Ut egestas, risus in
                        sollicitudin eleifend, est massa aliquam purus, a
                        placerat lacus sapien ut enim. Donec ultricies convallis
                        odio id ultricies.
                    </div>
                    <div className={styles.categoryAndLikes}>
                        <div className={styles.category}>Category 1</div>
                        <div className={styles.likeArea}>
                            <div className={styles.likeBtn}>
                                <img src={LikeIcon} alt="" />
                            </div>
                            <div className={styles.likes}>123</div>
                        </div>
                    </div>
                </div>
                <div className={styles.selfCommentPost}>
                    <input
                        type="text"
                        placeholder="Leave your content here..."
                    />
                    <button>Comment</button>
                </div>
                <div className={styles.postComments}>
                    <div className={styles.postComment}>
                        <div className={styles.commenterID}> NAME123456</div>
                        <div className={styles.commentContent}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Duis turpis ligula, posuere sed tempor a,
                            sodales eget magna. Praesent elementum lacinia magna
                            sed consequat. Maecenas nibh erat, sodales id ante
                            eu, suscipit rutrum lorem.
                        </div>
                    </div>
                    <div className={styles.postComment}>
                        <div className={styles.commenterID}> ab2 </div>
                        <div className={styles.commentContent}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Duis turpis ligula, posuere sed tempor a,
                            sodales eget magna. Praesent elementum lacinia magna
                            sed consequat. Maecenas nibh erat, sodales id ante
                            eu, suscipit rutrum lorem.
                        </div>
                    </div>
                    <div className={styles.postComment}>
                        <div className={styles.commenterID}> NAME123456</div>
                        <div className={styles.commentContent}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Duis turpis ligula, posuere sed tempor a,
                            sodales eget magna. Praesent elementum lacinia magna
                            sed consequat. Maecenas nibh erat, sodales id ante
                            eu, suscipit rutrum lorem.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewPost;
