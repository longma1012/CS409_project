import React, { useState } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import {auth} from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="loginContainer">
            <form className="loginInnerContainer" onSubmit={signIn}>
                <div className="loginTitle"> Login</div>
                <div className="loginFormContainer">
                    <input
                        type="text"
                        className="login_section"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="text"
                        className="login_section"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="signupIfNoAccount">
                        Don’t have an account?
                        <Link to="/signup" className="signUplink">
                            Sign up
                        </Link>
                    </div>

                    <div className="enterButton">
                        <Link to="/main">
                            <button type="submit">Enter</button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
