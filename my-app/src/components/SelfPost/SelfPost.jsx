import React, { useState } from "react";
import Header from "../Header/Header.jsx";
import styles from "./SelfPost.module.css";
import { Link, useNavigate } from "react-router-dom";
import { writePostData } from "../../dbUtils/CRUDPost.js"; // 替换为你的Firebase函数文件的实际路径

const SelfPost = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();

    // 生成唯一的 postId
    const generatePostId = () => {
        const currentId = Number(localStorage.getItem("postIdCounter") || 0);
        localStorage.setItem("postIdCounter", currentId + 1);
        return `post_${currentId + 1}`;
    };

    const handleSubmit = () => {
        const postId = generatePostId();
        const useremail = "user@example.com"; // 替换为实际的用户邮箱
        const likes = 0;
        const postTime = new Date().toISOString();

        writePostData(postId, title, useremail, category, body, likes, postTime);
        navigate("/main");
    };

    return (
        <div>
            <Header />
            <div className={styles.selfPostContainer}>
                <div className={styles.selfPostTitle}>
                    <div className={styles.selfPostTitleText}>Title</div>
                    <div className={styles.selfPostTitleInput}>
                        <input
                            type="text"
                            placeholder="Enter post title here..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.categoryChoose}>
                    <div className={styles.categoryChooseText}>Category</div>
                    <select
                        className={styles.categoryChooseSelect}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        <option value="News">News</option>
                        <option value="Opinion">Opinion</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Tech">Tech</option>
                        <option value="Sports">Sports</option>
                        {/* 可以根据需要添加更多类别 */}
                    </select>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.selfPostContentText}>Content</div>
                    <div className={styles.selfPostContentInput}>
                        <textarea
                            placeholder="Enter post content here..."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.selfPostCreate}>
                    <div className={styles.selfPostCreateBtn} onClick={handleSubmit}>
                        Create Post
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelfPost;
