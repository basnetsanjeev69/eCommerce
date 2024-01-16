import { signOut } from 'firebase/auth'
import React from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase-config/config'
import { setUser } from '../../redux/auth/userSlice'

function Header() {
    const { user } = useSelector(state => state.userInfo)
    const dispatch = useDispatch();
    const handleLogout = () => {
        console.log("I am logged out")
        // Logout, clear firebase auth session as well as redux state
        signOut(auth).then(() => {
            dispatch(setUser({}))
        })
    }
    return (
        <Navbar expand="lg" bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand href="/">Tech Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {user.uid
                            ?
                            <>
                                <Link to="/profile" className='nav-link'>Welcome, {user.fName}</Link>
                                <Link to="/#" className='nav-link' onClick={handleLogout}>Logout</Link>

                            </>
                            :
                            <Link to="/login" className='nav-link'>Login</Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header