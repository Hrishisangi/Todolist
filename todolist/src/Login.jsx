import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        axios.post('https://todolist-final-9vyx.onrender.com/login', {
            email: email.trim().toLowerCase(),
            password: password
        })
            .then(res => {
                if (res.data.success) {
                    localStorage.setItem("isLoggedIn", "true");
                    setError('');
                    onLogin();
                } else {
                    setError("Unauthorized user");
                }
            })
            .catch(() => {
                setError("Unauthorized user");
            });
    };

    return (
        <div className="login_form">
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Login;
