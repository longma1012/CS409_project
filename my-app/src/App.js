import logo from "./logo.svg";
import "./App.css";
import React from "react";
import SignUpPage from "./components/SignUpPage";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/signup" element={<SignUpPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
