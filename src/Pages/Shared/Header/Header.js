import { useContext } from 'react';
import { Button, Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import LeftSideNav from '../LeftSideNav/LeftSideNav';
// import RightSideNav from '../RightSideNav/RightSideNav';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const signOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }

    return (
        <div>
            <Navbar className='mb-4' collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand className='fw-semibold fst-italic'><Link className='text-decoration-none' to='/'>Dragon-News</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">All News</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <NavDropdown title="Categories" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <>
                                {
                                    user?.uid ?
                                        <>
                                            <Link to="/profile">
                                                {
                                                    user?.photoURL ?
                                                        <Image style={{ height: '30px' }} roundedCircle src={user?.photoURL}></Image> :
                                                        <FaUserAlt></FaUserAlt>
                                                }
                                            </Link>
                                            <span className='mx-2'>{user?.displayName}</span>
                                            <Button onClick={signOut} variant="outline-warning">Log Out</Button>{' '}
                                        </>
                                        :
                                        <>
                                            <Link className='btn btn-outline-primary mx-2' to='/login'>Login</Link>
                                            <Link className='btn btn-outline-primary' to='/register'>Register</Link>
                                        </>
                                }
                            </>
                        </Nav>
                        <div className='d-lg-none'>
                            <LeftSideNav></LeftSideNav>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;