// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/Navbar'; // Import the Navbar component
import LoginComponent from './pages/Login';
import RegisterComponent from './pages/Register';
import WorkoutsPage from './pages/Workouts';



const App = () => {
    return (
        <Router>
            <AppNavbar /> {/* Add Navbar to the layout */}
            <div>
                <Routes>
                    <Route path="/register" element={<RegisterComponent />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/workouts" element={<WorkoutsPage />} />
                    <Route path="/" element={<h1>Welcome to My Fitness App Tracker!</h1>} /> {/* Optional: Home route */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
