import React, { useState } from "react";
import "./SignUpPage.css";

function SignUpPage() {
  // const [netId, setNetId] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="container">
      <div className="innerContainer">
        <div className="signUpTitle"> Sign Up</div>
        <div className="submitInformation">
          <div className="formContainer">
            <input
              type="text"
              className="signup_section"
              placeholder="Your UIUC Net ID"
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
            <div className="loginIfHaveAccount">
              Already have an account? Sign in
            </div>

            <div className="enterButton">
              <button type="submit">Enter</button>
            </div>
          </div>
          <div className="photoUpload">
            <label for="profile-upload">Upload Profile Picture</label>
            <input type="file" id="profile-upload" hidden />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
