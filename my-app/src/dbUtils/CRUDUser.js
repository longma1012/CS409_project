import { getDatabase, ref, set, update, remove, onValue } from "firebase/database";

// 写入 User 数据
export const writeUserData = (userId, name, email, password) => {
    const db = getDatabase();
    set(ref(db, `users/${userId}`), {
        username: name,
        email: email,
        password: password
    });
};

// 读取 User 数据
export const readUserData = (userId, callback) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);
    
    onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    }, {
        onlyOnce: true
    });
};

// 更新 User 数据
export const updateUser = (userId, userData) => {
    const db = getDatabase();
    update(ref(db, `users/${userId}`), userData);
};

// 删除 User 数据
export const deleteUser = (userId) => {
    const db = getDatabase();
    remove(ref(db, `users/${userId}`));
};

// 检查username是否存在
export const checkUsernameExists = async (username) => {
    return new Promise((resolve, reject) => {
        const db = getDatabase();
        const usersRef = ref(db, 'users');

        onValue(usersRef, (snapshot) => {
            const users = snapshot.val();
            const usernames = Object.values(users).map(user => user.username);
            const usernameExists = usernames.includes(username);
            resolve(usernameExists);
        }, {
            onlyOnce: true
        });
    });
};