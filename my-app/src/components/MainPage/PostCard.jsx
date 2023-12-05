import React from "react";
import { Link } from "react-router-dom";
import styles from "./PostCard.module.css";

import tempPhoto from "../../images/Memoji Boys 2-1.png";

const PostCard = () => {
    return (
        <div className={styles.post_card}>
            <div className={styles.content_area}>
                <div className={styles.post_card_title}>
                    Road Construction Update near Grainger Library
                </div>
                <div className={styles.poster_area}>
                    <p className={styles.poster_name}>Name 1</p>
                    <p className={styles.post_time}>2 days ago</p>
                </div>
                <div className={styles.post_card_content}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis turpis ligula, posuere sed tempor a, sodales eget
                    magna. Praesent elementum lacinia magna sed consequat.
                    Maecenas nibh erat, sodales id ante eu, suscipit rutrum
                    lorem. Nulla lobortis sed arcu eu scelerisque. Aenean tortor
                    velit, malesuada a ullamcorper sodales, lacinia a tortor.
                    Suspendisse viverra turpis ipsum, eget imperdiet velit
                    ultricies et. Phasellus ac pharetra orci. Vestibulum mauris
                    tellus, ullamcorper eu elementum nec, volutpat vel lacus. In
                    suscipit lorem sit amet ex tempus, dignissim pulvinar sapien
                    eleifend. Pellentesque in ullamcorper neque. Sed commodo
                    faucibus sapien, vitae varius metus sollicitudin ac. Vivamus
                    lorem odio, convallis non cursus eget, ultrices non arcu.
                    Cras volutpat tempor magna et blandit. Ut egestas, risus in
                    sollicitudin eleifend, est massa aliquam purus, a placerat
                    lacus sapien ut enim. Donec ultricies convallis odio id
                    ultricies.
                </div>
            </div>
            <div className={styles.info_area}>
                <div className={styles.category_tag}>Alumni Events</div>
                <div className={styles.data}>
                    <p className={styles.comments}>56 Comments</p>
                    <p className={styles.likes}>1234 Likes</p>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
