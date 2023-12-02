import React from "react";
import Header from "../Header/Header.jsx";
import Categories from "./Categories.jsx";
import PostCard from "./PostCard.jsx";

import "./MainPage.css";

import tempPhoto from "../../images/Memoji Boys 2-1.png";

const AfterSearch = () => {
    return (
        <div>
            <Header />
            <Categories />
            <div className="main-area">
                <div className="CreatePost">
                    <div className="user-photo">
                        <img src={tempPhoto} alt="" className="photo" />
                    </div>
                    <div className="create-post-input">
                        <input
                            type="text"
                            placeholder="Let's share what going on your mind..."
                        />
                    </div>
                    <div className="create-post-button">
                        <button>Create Post</button>
                    </div>
                </div>
                <div className="post-card-container">
                    <PostCard/>
                    <PostCard/>
                </div>
            </div>
        </div>
    );
};

export default AfterSearch;
