import React, { useState, useEffect } from "react";
import Header from "../Header/Header.jsx";
import styles from "./SelfPost.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { writePostData } from "../../dbUtils/CRUDPost.js";

import { auth } from "../../config/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

const SelfPost = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [body, setBody] = useState("");
    const [useremail, setUsereEmail] = useState("");

    // get input title from main
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const initialTitleValue = searchParams.get("inputPostValue");
    useEffect(() => {
        setTitle(initialTitleValue || "");
    }, [initialTitleValue]);
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // go back Btn
    const handleGoBack = () => {
        window.history.back();
    };

    const navigate = useNavigate();

    const handleSubmit = () => {
        const postId = uuidv4();
        const email = useremail;
        const likes = 0;
        const postTime = new Date().toISOString();

        writePostData(postId, title, email, category, body, likes, postTime);
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
                <div className={styles.backBtnContainer}>
                    <button className={styles.backBtn} onClick={handleGoBack}>
                        Back
                    </button>
                </div>
                <div className={styles.selfPostTitle}>
                    <div className={styles.selfPostTitleText}>Title</div>
                    <div className={styles.selfPostTitleInput}>
                        <input
                            type="text"
                            placeholder="Enter post title here..."
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                </div>
                <div className={styles.categoryChoose}>
                    {/* <div className={styles.categoryChooseText}>Category</div> */}
                    <select
                        className={styles.categoryChooseSelect}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        <option value="Alumni Events">Alumni Events</option>
                        <option value="Lifestyle & Hobbies">
                            Lifestyle & Hobbies
                        </option>
                        <option value="Job & Career">Job & Career</option>
                        <option value="Food & Drink">Food & Drink</option>
                        <option value="Academic Discussions">
                            Academic Discussions
                        </option>
                        <option value="Emotional Life">Emotional Life</option>
                        <option value="Housing">Housing</option>
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
