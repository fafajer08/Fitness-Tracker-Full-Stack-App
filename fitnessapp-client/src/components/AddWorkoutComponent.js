// AddWorkoutComponent.js
import React, { useState } from 'react';

const AddWorkoutComponent = () => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [status, setStatus] = useState('incomplete');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleAddWorkout = async (e) => {
        e.preventDefault();

        const requestBody = {
            name,
            duration,
            dateAdded: new Date(),  // Adding the current date
            status
        };

        try {
            const token = localStorage.getItem('token'); // Assuming you're storing JWT token
            const response = await fetch('https://fitnessapp-api-In8u.onrender.com/workouts/addWorkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Workout added successfully!');
            } else {
                setError(data.error || 'Failed to add workout');
            }
        } catch (error) {
            setError('Something went wrong');
        }
    };

    return (
        <div>
            <form onSubmit={handleAddWorkout}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Workout Name"
                />
                <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Duration"
                />
                <button type="submit">Add Workout</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default AddWorkoutComponent;
