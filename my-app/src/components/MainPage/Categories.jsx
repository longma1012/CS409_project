import React from "react";
import styles from "./Categories.module.css";

const Categories = () => {
    return (
        <div className={styles.categoriesContainer}>
            <div className={styles.all}>All</div>
            <div className={styles.category}>Alumni Events</div>
            <div className={styles.category}>Lifestyle & Hobbies</div>
            <div className={styles.category}>Job & Career</div>
            <div className={styles.category}>Food & Drink</div>
            <div className={styles.category}>Academic Discussions</div>
            <div className={styles.category}>Housing</div>
            <div className={styles.category}>Emotional Life</div>
        </div>
    );
};

export default Categories;
