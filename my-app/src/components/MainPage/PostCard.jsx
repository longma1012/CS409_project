import React from "react";
import { Link } from "react-router-dom";
import "./PostCard.css";

import tempPhoto from "../../images/Memoji Boys 2-1.png";

const PostCard = () => {
    return (
        <div className="post-card">
            <div className="poster-area">
                <div className="poster-photo">
                    <img src={tempPhoto} alt="" className="photo" />
                </div>
                <div className="name-and-time">
                    <p className="poster-name">Name 1</p>
                    <p className="post-time">2 days ago</p>
                </div>
            </div>

            <div className="content-area">
                <div className="post-card-title">
                    Road Construction Update near Grainger Library
                </div>
                <div className="post-card-content">
                    Recent road repairs near Grainger Library have caused
                    several street closures. This might lead to detours for
                    vehicles in the area. Please plan your route ...
                </div>
            </div>
            <div className="info-area">
                <div className="category-tag">Alumni Events</div>
                <div className="data">
                    <p className="comments"> 56 comments</p>
                    <p className="likes"> 1234 Likes</p>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
