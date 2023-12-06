import { getDatabase, ref, set, update, remove, onValue } from "firebase/database";

// 写入 Comment 数据
export const writeCommentData = (commentId, linkedPostId, content, createTime, commentUserEmail) => {
    const db = getDatabase();
    set(ref(db, `comments/${commentId}`), {
        LinkedPostID: linkedPostId,
        Content: content,
        CreateTime: createTime,
        CommentUserEmail: commentUserEmail
    });
};

// 读取 Comment 数据
export const readCommentData = (commentId, callback) => {
    const db = getDatabase();
    const commentRef = ref(db, `comments/${commentId}`);

    onValue(commentRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    }, {
        onlyOnce: true
    });
};

// 更新 Comment 数据
export const updateComment = (commentId, commentData) => {
    const db = getDatabase();
    update(ref(db, `comments/${commentId}`), commentData);
};

// 删除 Comment 数据
export const deleteComment = (commentId) => {
    const db = getDatabase();
    remove(ref(db, `comments/${commentId}`));
};
