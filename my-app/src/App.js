import logo from './logo.svg';
import './App.css';
import React from 'react';
import SignUpPage from './components/SignUpPage/SignUpPage';

function App() {
  return (
    <div className="App">
      <div className='signup'>
        <SignUpPage />
      </div>
    </div>
  );
}

export default App;