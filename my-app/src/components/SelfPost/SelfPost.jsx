import React from "react";
import Header from "../Header/Header.jsx";
import "./SelfPost.css";

const SelfPost = () => {
    return (
        <div>
            <Header />
            <div className="self-post-container">
                <div className="self-post-title">
                    <div className="self-post-title-text">Title</div>
                    <div className="self-post-title-input">
                        <input
                            type="text"
                            placeholder="Let's share what's going on your mind..."
                        />
                    </div>
                </div>
                <div className="category-choose">
                    <div className="category-choose-btn">Choose Category</div>
                </div>
                <div className="content-container">
                    <div className="self-post-content-text">Content</div>
                    <div className="self-post-content-input">
                        <textarea
                            type="text"
                            placeholder="Let's share what's going on your mind..."
                        />
                    </div>
                </div>
                <div className="self-post-create">
                    <div className="self-post-create-btn">Create Post</div>
                </div>
            </div>
        </div>
    );
};

export default SelfPost;
