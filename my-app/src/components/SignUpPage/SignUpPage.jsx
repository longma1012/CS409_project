import React, { useState } from "react";
import "./SignUpPage.css";
import { Link } from "react-router-dom";

const SignUpPage = () => {
    //   const [netId, setNetId] = useState("");
    //   const [password, setPassword] = useState("");
    //   const [confirmPassword, setConfirmPassword] = useState("");
    return (
        <div className="container">
            <div className="innerContainer">
                <div className="signUpTitle"> Sign Up</div>
                <div className="uiucInformationContainer">
                    <input
                        type="text"
                        className="signup_uiuc_section"
                        placeholder="Your UIUC Net ID"
                    />

                    <input
                        type="text"
                        className="signup_uiuc_section"
                        placeholder="Your UIUC password"
                    />
                </div>
                <div className="otherformContainer">
                    <div className="signupForm">
                        <input
                            type="text"
                            className="signup_section"
                            placeholder="Create a username"
                        />
                        <input
                            type="text"
                            className="signup_section"
                            placeholder="Create a password"
                        />
                        <input
                            type="text"
                            className="signup_section"
                            placeholder="Confirm your password"
                        />
                    </div>
                    <div className="photoUpload">
                        <label for="profile-upload">
                            Upload <br></br>Profile Picture
                        </label>
                        <input type="file" id="profile-upload" hidden />
                    </div>
                </div>
                <div className="loginIfHaveAccount">
                    Already have an account?
                    <Link to="/" className="loginInLink">
                        Login
                    </Link>
                </div>

                <div className="enterButtonSignup">
                    <Link to="/main">
                        <button type="submit">Enter</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
