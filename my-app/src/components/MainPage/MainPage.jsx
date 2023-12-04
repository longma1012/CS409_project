import React from "react";
import Header from "../Header/Header.jsx";
import Categories from "./Categories.jsx";
import PostCard from "./PostCard.jsx";
import { Link } from "react-router-dom";

import "./MainPage.css";

import tempPhoto from "../../images/Memoji Boys 2-1.png";

const MainPage = () => {
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
                            placeholder="Let's share what's going on your mind..."
                        />
                    </div>
                    <Link to="/createpost">
                        <div className="create-post-button">
                            <button>Create Post</button>
                        </div>
                    </Link>
                </div>
                <div className="post-card-container">
                    <PostCard/>
                    <PostCard/>
                    <PostCard/>
                    <PostCard/>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
