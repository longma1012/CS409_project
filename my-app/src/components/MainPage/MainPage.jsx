import React from "react";
import Header from "../Header/Header.jsx";
import Categories from "./Categories.jsx";
import PostCard from "./PostCard.jsx";
import { Link } from "react-router-dom";

import styles from "./MainPage.module.css";

import tempPhoto from "../../images/Memoji Boys 2-1.png";

const MainPage = () => {
    // const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             const response = await axios.get("/api/posts"); // 替换为你的后端 API 路径
    //             setPosts(response.data.data); // data 是后端返回的帖子数据数组
    //         } catch (error) {
    //             console.error("Error fetching posts:", error);
    //         }
    //     };

    //     fetchPosts();
    // }, []);

    return (
        <div>
            <Header />
            <Categories />
            <div className={styles.main_area}>
                <div className={styles.CreatePost}>
                    <div className={styles.create_post_input}>
                        <input
                            type="text"
                            placeholder="Let's share what's going on your mind..."
                        />
                    </div>
                    <Link
                        to="/createpost"
                        className={styles.create_post_button}
                    >
                        <div>
                            <button>Create Post</button>
                        </div>
                    </Link>
                </div>
                <div className={styles.post_card_container}>
                    <Link className={styles.postLink} to="/details/postid">
                        <PostCard />
                    </Link>
                    <PostCard />
                    <PostCard />
                    <PostCard />
                </div>
            </div>
        </div>
    );
};

export default MainPage;
