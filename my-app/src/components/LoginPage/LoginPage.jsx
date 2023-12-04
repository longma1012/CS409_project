import React, { useState } from "react";
import "./LoginPage.css";
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
        <div className="loginContainer">
            <form className="loginInnerContainer" onSubmit={signIn}>
                <div className="loginTitle"> Login</div>
                <div className="loginFormContainer">
                    <input
                        type="text"
                        className="login_section"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
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
                    <div className="error">
                        {signInError && <p>{signInError}</p>}
                    </div>
                    <div className="enterButton">
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
