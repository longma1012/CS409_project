import React, { useState } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
    return <div className="loginContainer">
    <div className="loginInnerContainer">
      <div className="loginTitle"> Login</div>
      <div className="loginFormContainer">
        <input type="text" className="login_section" placeholder="username" />
        <input type="text" className="login_section" placeholder="password" />
        <div className="signupIfNoAccount">
          Don’t have an account?
          <Link to="/signup">Sign up</Link>
        </div>

        <div className="enterButton">
          <button type="submit">Enter</button>
        </div>
      </div>
    </div>
  </div>;
};

export default LoginPage;
