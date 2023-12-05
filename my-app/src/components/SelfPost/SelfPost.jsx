import React from "react";
import Header from "../Header/Header.jsx";
import styles from "./SelfPost.module.css";

const SelfPost = () => {
    return (
        <div>
            <Header />
            <div className={styles.selfPostContainer}>
                <div className={styles.selfPostTitle}>
                    <div className={styles.selfPostTitleText}>Title</div>
                    <div className={styles.selfPostTitleInput}>
                        <input
                            type="text"
                            placeholder="Let's share what's going on your mind..."
                        />
                    </div>
                </div>
                <div className={styles.categoryChoose}>
                    <div className={styles.categoryChooseBtn}>
                        Choose Category
                    </div>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.selfPostContentText}>Content</div>
                    <div className={styles.selfPostContentInput}>
                        <textarea
                            type="text"
                            placeholder="Let's share what's going on your mind..."
                        />
                    </div>
                </div>
                <div className={styles.selfPostCreate}>
                    <div className={styles.selfPostCreateBtn}>Create Post</div>
                </div>
            </div>
        </div>
    );
};

export default SelfPost;
