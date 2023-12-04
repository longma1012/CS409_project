import React, { useState } from "react";
import "./SignUpPage.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import {    createUserWithEmailAndPassword} from "firebase/auth";

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signUpError, setSignUpError] = useState(null);
    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();
        
        if (!email.endsWith("@illinois.edu")) {
            setSignUpError("Not an UIUC email");
        } else if (password !== confirmPassword) {
            setSignUpError("Passwords do not match");
        } else {
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
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
        <div className="container">
            <div className="innerContainer">
                <div className="signUpTitle"> Sign Up</div>
                <div className="signUpformationContainer">
                    <input
                        type="text"
                        className="signup-input-section"
                        placeholder="Enter your UIUC email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        className="signup-input-section"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        className="signup-input-section"
                        placeholder="Confrim your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="loginIfHaveAccount">
                    Already have an account?
                    <Link to="/" className="loginInLink">
                        Login
                    </Link>
                </div>
                <div className="signup-error">
                    {signUpError && <p>{signUpError}</p>}
                </div>
                <div className="signup-enterButton">
                    <button onClick={signUp} type="submit">
                        Enter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
