import React, { useState , useEffect} from "react";
import Header from "../Header/Header.jsx";
import styles from "./SelfPost.module.css";
import { Link, useNavigate } from "react-router-dom";
import { writePostData } from "../../dbUtils/CRUDPost.js";

import { auth } from "../../config/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

const SelfPost = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [body, setBody] = useState("");
    const [useremail, setUsereEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = () => {
        const postId = uuidv4();
        const email = useremail; 
        const likes = 0;
        const postTime = new Date().toISOString();

        writePostData(
            postId,
            title,
            email,
            category,
            body,
            likes,
            postTime
        );
        navigate("/main");
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsereEmail(user.email);
            } else {
                setUsereEmail("");
            }
        });
        return () => unsubscribe();
    }, []);

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
                    <div
                        className={styles.selfPostCreateBtn}
                        onClick={handleSubmit}
                    >
                        Create Post
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelfPost;
