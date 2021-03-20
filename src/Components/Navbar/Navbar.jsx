import styles from './navbar.module.css';
import {Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom'
 const Navbar = ({toggleNavbar}) => {
    return (
        <Nav className={styles.navBar}>
            <Nav.Item>
                <NavLink 
                    to='/' 
                    className='nav-link' 
                    exact={true} 
                    onClick={toggleNavbar}
                    >Home
                </NavLink>
                <NavLink 
                    to='/about' 
                    className='nav-link' 
                    exact={true}
                    onClick={toggleNavbar}
                    >About Us
                </NavLink>
                <NavLink 
                    to='/contact' 
                    className='nav-link' 
                    exact={true}
                    onClick={toggleNavbar}
                    >Contact
                </NavLink>
            </Nav.Item>
            
        </Nav>
    )
}
export default Navbar