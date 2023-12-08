import {
  getDatabase,
  ref,
  get,
  set,
  update,
  remove,
  onValue,
} from "firebase/database";

// 写入 Post 数据
export const writePostData = (
  postId,
  title,
  userId,
  category,
  body,
  likes,
  postTime
) => {
  const db = getDatabase();
  set(ref(db, `posts/${postId}`), {
    Title: title,
    userId: userId,
    Category: category,
    Body: body,
    Likes: likes,
    PostTime: postTime,
  });
};

// Update only the CommentList key for a Post
export const updateCommentList = (postId, commentData) => {
  const db = getDatabase();
  const postRef = ref(db, `posts/${postId}/CommentList`);

  // Check if commentList exists
  get(postRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        // commentList exists, so update it
        const commentList = snapshot.val() || [];
        const newCommentList = [...commentList, commentData];
        update(postRef, newCommentList);
      } else {
        // commentList doesn't exist, so create it
        const newCommentList = [commentData];
        update(postRef, newCommentList);
      }
    })
    .catch((error) => {
      console.error("Error updating commentList:", error);
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

// 读取所有的 Post
export const readAllPostData = (callback) => {
  const db = getDatabase();
  const postsRef = ref(db, "posts");

  onValue(postsRef, (snapshot) => {
    const data = snapshot.val();
    const posts = data
      ? Object.entries(data).map(([id, post]) => ({ ...post, id }))
      : [];
    callback(posts); // Return the posts array with IDs
  });
};
