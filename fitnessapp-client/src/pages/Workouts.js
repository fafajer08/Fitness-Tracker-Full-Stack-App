import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Container, Row, Alert } from 'react-bootstrap';
import WorkoutList from '../components/WorkoutsListComponent';

const WorkoutsPage = () => {
    const [workouts, setWorkouts] = useState([]);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newWorkout, setNewWorkout] = useState({
        name: '',
        duration: '',
        status: 'pending'
    });

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

    const handleAddWorkout = async () => {
        try {
            const token = localStorage.getItem('token'); // Assuming you're storing JWT token
            const response = await fetch('https://fitnessapp-api-In8u.onrender.com/workouts/addWorkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newWorkout)
            });

            const data = await response.json();
            if (response.ok) {
                setWorkouts([...workouts, data]);
                setShowModal(false);
                setNewWorkout({ name: '', duration: '', status: 'pending' });
            } else {
                setError(data.error || 'Failed to add workout');
            }
        } catch (error) {
            setError('Something went wrong');
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">My Workouts</h1>
            <div className="text-center mb-4">
                <Button id="addWorkout" variant="primary" onClick={() => setShowModal(true)}>
                    Add Workout
                </Button>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formWorkoutName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter workout name"
                                value={newWorkout.name}
                                onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formWorkoutDuration">
                            <Form.Label>Duration (minutes)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter duration"
                                value={newWorkout.duration}
                                onChange={(e) => setNewWorkout({ ...newWorkout, duration: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formWorkoutStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={newWorkout.status}
                                onChange={(e) => setNewWorkout({ ...newWorkout, status: e.target.value })}
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" className="mt-3" onClick={handleAddWorkout}>
                            Add Workout
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Row>
                <WorkoutList workouts={workouts} />
            </Row>
            
            {error && <Alert variant="danger" className="mt-4">{error}</Alert>}
        </Container>
    );
};

export default WorkoutsPage;
