import React from 'react';
import './Auth.css';

function Logout({ onLogout }) {
    return (
        <div className="auth-container">
            <h2>تسجيل الخروج</h2>
            <p>هل أنت متأكد أنك تريد تسجيل الخروج؟</p>
            <button onClick={onLogout} className="auth-button">تسجيل الخروج</button>
        </div>
    );
}

export default Logout;
