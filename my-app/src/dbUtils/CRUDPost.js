import {
  getDatabase,
  ref,
  set,
  update,
  remove,
  onValue,
} from "firebase/database";

// 写入 Post 数据
export const writePostData = (
  postId,
  title,
  useremail,
  category,
  body,
  likes,
  postTime
) => {
  const db = getDatabase();
  set(ref(db, `posts/${postId}`), {
    Title: title,
    UserEmail: useremail,
    Category: category,
    Body: body,
    Likes: likes,
    PostTime: postTime,
  });
};

// 读取 Post 数据
export const readPostData = (postId, callback) => {
  const db = getDatabase();
  const postRef = ref(db, `posts/${postId}`);

  onValue(
    postRef,
    (snapshot) => {
      const data = snapshot.val();
      callback(data);
    },
    {
      onlyOnce: true,
    }
  );
};

// 更新 Post 数据
export const updatePost = (postId, postData) => {
  const db = getDatabase();
  update(ref(db, `posts/${postId}`), postData);
};

// 删除 Post 数据
export const deletePost = (postId) => {
  const db = getDatabase();
  remove(ref(db, `posts/${postId}`));
};

// Read all Post data
export const readAllPostData = (callback) => {
  const db = getDatabase();
  const postsRef = ref(db, "posts");

  onValue(postsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

//Read all Post id
export const readAllPostIdData = (callback) => {
  const db = getDatabase();
  const postsRef = ref(db, "posts");

  onValue(postsRef, (snapshot) => {
    const data = snapshot.val();
    const postIds = data ? Object.keys(data) : []; // Get all post IDs
    callback(postIds); // Return the post IDs
  });
};
