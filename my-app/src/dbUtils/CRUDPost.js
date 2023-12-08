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

// Method to read only the likes count for a given post
// export const readLikesCountCallBack = (postId, callback) => {
//   const db = getDatabase();
//   const likesRef = ref(db, `posts/${postId}/Likes`);

//   get(likesRef)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         const likesCount = snapshot.val();
//         callback(likesCount);
//       } else {
//         callback(0); // Return 0 if the likes count doesn't exist
//       }
//     })
//     .catch((error) => {
//       console.error("Error reading likes count:", error);
//     });
// };

export const readLikesCountCallBack = (postId, callback) => {
  const db = getDatabase();
  const likesRef = ref(db, `posts/${postId}/Likes`);

  const unsubscribe = onValue(likesRef, (snapshot) => {
    const likesCount = snapshot.val() || 0; // Default to 0 if no likes
    callback(likesCount);
  });

  // Return a function to unsubscribe from the listener
  return () => unsubscribe();
};

// 根据 id 返回 username
export const readLikesCount = (postId) => {
  const db = getDatabase();
  const userRef = ref(db, `posts/${postId}`);

  return new Promise((resolve, reject) => {
    onValue(
      userRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          resolve(data.Likes);
        } else {
          resolve(null);
        }
      },
      {
        onlyOnce: true,
      }
    );
  });
};
