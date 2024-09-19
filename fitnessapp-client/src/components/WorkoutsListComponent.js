// WorkoutsListComponent.js
import React, { useEffect, useState } from 'react';

const WorkoutsListComponent = () => {
    const [workouts, setWorkouts] = useState([]);
    const [error, setError] = useState('');

    const fetchWorkouts = async () => {
        try {
            const token = localStorage.getItem('token'); // Assuming you're storing JWT token
            const response = await fetch('https://fitnessapp-api-In8u.onrender.com/workouts/getMyWorkouts', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                setWorkouts(data);
            } else {
                setError(data.error || 'Failed to fetch workouts');
            }
        } catch (error) {
            setError('Something went wrong');
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    return (
        <div>
            <h1>My Workouts</h1>
            {workouts.length > 0 ? (
                workouts.map((workout) => (
                    <div key={workout._id}>
                        <h3>{workout.name}</h3>
                        <p>Duration: {workout.duration}</p>
                        <p>Status: {workout.status}</p>
                        <p>Date Added: {new Date(workout.dateAdded).toLocaleDateString()}</p>
                    </div>
                ))
            ) : (
                <p>No workouts found.</p>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default WorkoutsListComponent;
