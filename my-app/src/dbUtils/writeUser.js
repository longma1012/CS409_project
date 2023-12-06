import { getDatabase, ref, set } from "firebase/database";

export const writeUserData = (userId, name, email, password) => {
    const db = getDatabase();
    set(ref(db, `users/${userId}`), {
        username: name,
        email: email,
        password: password
    });
};