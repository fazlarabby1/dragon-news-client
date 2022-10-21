import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import {toast} from 'react-hot-toast';

const Register = () => {
    const { createUser, updateUserProfile, verifyEmail } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [accepted, setAccepted] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setError('');
                form.reset();
                handleUpdateUserProfile(name, photoURL);
                handleEmailVerification();
                toast.success('Please Verify your email address.')
            })
            .catch(error => setError(error.message))
    }

    const handleUpdateUserProfile = (name , photoURL) =>{
        const profile = {
            displayName: name,
            photoURL: photoURL
        }

        updateUserProfile(profile)
        .then(()=>{})
        .catch(error => console.error(error));
    }

    const handleEmailVerification = () =>{
        verifyEmail()
        .then(()=>{})
    }

    const handleAccepted = event =>{
        setAccepted(event.target.checked);
    }

    return (
        <Form onSubmit={handleSubmit} className='mb-3'>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control name='name' type="text" placeholder="Enter Your Name" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Photo URL</Form.Label>
                <Form.Control name='photo' type="text" placeholder="Enter Your Photo URL" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name='email' type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                    onClick={handleAccepted}
                        type="checkbox"
                        label={<>Accept <Link to='/terms'>Terms & Conditions</Link></>} />
                </Form.Group>
                {
                    error && <Form.Text className="text-danger">
                        {error}
                    </Form.Text>
                }
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!accepted}>
                Register
            </Button>
        </Form>
    );
};

export default Register;