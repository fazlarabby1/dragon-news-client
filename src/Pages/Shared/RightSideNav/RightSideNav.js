import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaGoogle, FaGithub, FaFacebook, FaTwitter, FaWhatsapp, FaTwitch } from "react-icons/fa";
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import BrandCarousel from '../BrandCarousel/BrandCarousel';
import {toast} from 'react-hot-toast';


const RightSideNav = () => {
    const { providerLogin, verifyEmail } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();


    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                handleEmailVerification();
                toast.success('Please Verify your email address.')
            })
            .catch(error => console.error(error))
    }

    const handleEmailVerification = () => {
        verifyEmail()
            .then(() => { })
    }
    return (
        <div>
            <ButtonGroup vertical>
                <Button onClick={handleGoogleSignIn} className='mb-2' variant='outline-primary'><FaGoogle /> Login With Google</Button>
                <Button variant='outline-dark'><FaGithub /> Login With Github</Button>
            </ButtonGroup>
            <div className='mt-5'>
                <p className='text-muted'>Find Us On</p>
                <ListGroup>
                    <ListGroup.Item className='mb-2'><FaFacebook /> Facebook</ListGroup.Item>
                    <ListGroup.Item className='mb-2'><FaTwitter /> Twitter</ListGroup.Item>
                    <ListGroup.Item className='mb-2'><FaWhatsapp /> WhatsApp</ListGroup.Item>
                    <ListGroup.Item className='mb-2'><FaTwitch /> Twitch</ListGroup.Item>
                </ListGroup>
            </div>
            <div>
                <BrandCarousel></BrandCarousel>
            </div>
        </div>
    );
};

export default RightSideNav;