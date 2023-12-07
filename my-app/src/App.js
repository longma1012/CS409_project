import React from "react";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import MainPage from "./components/MainPage/MainPage";
import AfterSearch from "./components/MainPage/AfterSearch";
import SelfPost from "./components/SelfPost/SelfPost";
import ViewPost from "./components/ViewPost/ViewPost";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/searched" element={<AfterSearch />} />
          <Route path="/createpost" element={<SelfPost />} />
          {/* <Route path="/details/postid" element={<ViewPost />} /> */}
          <Route path="/details/:postId" element={<ViewPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
