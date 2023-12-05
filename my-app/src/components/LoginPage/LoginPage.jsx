import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signInError, setSignInError] = useState(null);
    const navigate = useNavigate();

    // console.log(auth?.currentUser?.email);

    const signIn = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(userCredential);
            navigate("/main");
        } catch (error) {
            console.log(error);
            setSignInError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginInnerContainer} onSubmit={signIn}>
                <div className={styles.loginTitle}> Login</div>
                <div className={styles.loginFormContainer}>
                    <input
                        type="text"
                        className={styles.login_input_section}
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className={styles.login_input_section}
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={styles.signupIfNoAccount}>
                        <div>Don’t have an account?&nbsp;</div>
                        <Link to="/signup" className={styles.signUplink}>
                            Sign up
                        </Link>
                    </div>
                    <div className={styles.login_error}>
                        {signInError && <p>{signInError}</p>}
                    </div>
                    <div className={styles.login_enterButton}>
                        <button onClick={signIn} type="submit">
                            Enter
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
