import React, { useState } from "react";
import styles from "./SignUpPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { writeUserData , checkUsernameExists} from "../../dbUtils/CRUDUser";

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signUpError, setSignUpError] = useState(null);
    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();
        let usernameExists;
    
        try {
            const usernameExists = await checkUsernameExists(username);
            
            if (usernameExists) {
                setSignUpError("Username already exists. Please change to a new one");
                return;
            }
        } catch (error) {
            console.error(error);
            setSignUpError("Error checking username");
        }
    
        if (!email.endsWith("@illinois.edu")) {
            setSignUpError("Not a UIUC email");
        } else if (password !== confirmPassword) {
            setSignUpError("Passwords do not match");
        } else if (usernameExists) {
            setSignUpError("Username already exists. Please change to a new one");
        } else {
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const userId = userCredential.user.uid;
                writeUserData(userId, username, email, password);
                console.log(userCredential);
                navigate("/main");
            } catch (error) {
                if (error.code === "auth/email-already-in-use") {
                    setSignUpError("Email already exists, please go to login.");
                } else {
                    console.log(error);
                    setSignUpError("Invalid email or password. Please try again.");
                }
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.signUpTitle}> Sign Up</div>
                <div className={styles.signUpformationContainer}>
                    <input
                        type="text"
                        className={styles.signupInputSection}
                        placeholder="Enter your UIUC email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        className={styles.signupInputSection}
                        placeholder="Create a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        className={styles.signupInputSection}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        className={styles.signupInputSection}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className={styles.loginIfHaveAccount}>
                        <div>Already have an account?&nbsp;</div>
                        <Link to="/" className={styles.loginInLink}>
                            Login
                        </Link>
                    </div>
                    <div className={styles.signupError}>
                        {signUpError && <p>{signUpError}</p>}
                    </div>
                    <div className={styles.signupEnterButton}>
                        <button onClick={signUp} type="submit">
                            Enter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
