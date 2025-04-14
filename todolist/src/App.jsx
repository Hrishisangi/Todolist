import React, { useState, useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true'); 
    setIsLoggedIn(true); 
  };

  useEffect(() => {
  
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Home />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
