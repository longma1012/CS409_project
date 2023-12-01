import React, { useState } from "react";
import "./SignUpPage.css";
import { Link } from "react-router-dom";

function SignUpPage() {
  // const [netId, setNetId] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
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
            <label for="profile-upload">Upload Profile Picture</label>
            <input type="file" id="profile-upload" hidden />
          </div>
        </div>
        <div className="loginIfHaveAccount">
          Already have an account?
          <Link to="/">Login</Link>
        </div>

        <div className="enterButton">
          <button type="submit">Enter</button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
