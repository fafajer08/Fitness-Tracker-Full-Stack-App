import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import '../style/navbar.css'

const AppNavbar = () => {
    const { user, logout } = useContext(AuthContext); // Use AuthContext

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">FitnessApp</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/workouts">Workouts</a>
                    </li>
                    {/* Add more nav items as needed */}
                </ul>
                <ul className="navbar-nav ml-auto">
                    {user ? (
                        <>
                            <li className="nav-item">
                                <span className="nav-link">Welcome, {user.name}</span>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/register">Register</a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default AppNavbar;
