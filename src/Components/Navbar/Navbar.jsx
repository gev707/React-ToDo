import styles from './navbar.module.css';
import {Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

 const Navbar = ({toggleNavbar}) => {
     const menuItems = [
         {
             name:'Main',
             to: '/',
             exact:true,
         },
         {
            name:'About',
            to: '/about',
            exact:true,
        },
        {
            name:'Contact',
            to: '/contact',
            exact:true,
        },
        
    ];
     const menuItem = menuItems.map((item,index)=>{
         return <NavLink
             key = {index}
             to = {item.to}
             exact = {item.exact}
             onClick={toggleNavbar}
             className='nav-link' 
             activeClassName={styles.activeMenuItem}
         >{item.name}</NavLink>
     })
    return (
        <Nav className={styles.navBar}>
            <Nav.Item>
                {menuItem}
            </Nav.Item>
        </Nav>
    )
}
export default Navbar