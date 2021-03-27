import React from 'react';
import Navbar from './Components/Navbar/Navbar';
//pages
import ToDo from './Components/pages/Todo/ToDo';
import About from './Components/pages/About/About';
import Contact from './Components/pages/Contact/Contact';
import NotFound from './Components/pages/NotFound/NotFound';
import SingleCard from './Components/pages/SingleCard/SingleCard'

//
import { Route, Switch, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const router = [
  {
    component: ToDo,
    path: '/',
    exact: true
  },
  {
    component: About,
    path: '/about',
    exact: true
  },
  {
    component: Contact,
    path: '/contact',
    exact: true
  },
  {
    component: NotFound,
    path: '/404',
    exact: true
  },
  {
    component: SingleCard,
    path: '/card/:id',
    exact: true
  },
];
class App extends React.Component {
  state = {
    isOpen: false,
  }
  toggleNavbar = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    })
  }
  render() {
    const routerPages = router.map((item, index) => {
      return (
        <Route
          key={index}
          path={item.path}
          component={item.component}
          exact={item.exact}
        />

      )
    })
    const { isOpen} = this.state;
    return (
      <div className={isOpen ? 'App vh' : 'App'}>
        <div onClick={this.toggleNavbar} className='openNav'>
          <span className={!isOpen ? 'toggleSpan' : 'activeSpan'}></span>
        </div>
        
        {
          isOpen && <Navbar
            toggleNavbar={this.toggleNavbar}
          />
        }
        <Switch>
          {routerPages}
          <Redirect  to='/404' ></Redirect>
        </Switch>


      </div>
    )
  }

}


export default App;