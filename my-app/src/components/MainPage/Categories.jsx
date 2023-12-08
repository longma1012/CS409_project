import React from "react";
import styles from "./Categories.module.css";

const Categories = ({ onSelectCategory }) => {
    const categories = [
        'All',
        'Alumni Events',
        'Lifestyle & Hobbies',
        'Job & Career',
        'Food & Drink',
        'Academic Discussions',
        'Housing',
        'Emotional Life',
      ];

    return (
        <div className={styles.categoriesContainer}>
      {categories.map(category => (
        <div
          key={category}
          className={styles.category}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </div>
      ))}
    </div>
    );
};

export default Categories;
