import React from 'react';
import Navbar from './Components/Navbar/Navbar';
//pages
import ToDo from './Components/pages/Todo/ToDo';
import About from './Components/pages/About/About';
import Contact from './Components/pages/Contact/Contact';

import {Route,Switch ,Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  state =  {
    isOpen:false,
  }
  toggleNavbar = ()=> {
    const {isOpen} = this.state;
    this.setState({
      isOpen:!isOpen
    })
  }
  render() {
      const {isOpen} =this.state;
      return (
        <div className={isOpen ? 'App vh' : 'App'}>
          <div onClick={this.toggleNavbar}  className='openNav'>
            <span className={!isOpen?'toggleSpan':'activeSpan'}></span>
          </div>
          {
            isOpen && <Navbar 
              toggleNavbar={this.toggleNavbar}
            />
          }
          <Switch>
            <Route path='/' render={()=> <ToDo />} exact /> 
            <Route path='/about' render={()=> <About />} exact />
            <Route path='/contact' render={()=> <Contact />} exact />
            <Redirect to='/'></Redirect>
          </Switch>
            
            
        </div>
      )
  }
  
}


export default App;