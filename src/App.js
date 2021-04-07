import React from 'react';
import Navbar from './Components/Navbar/Navbar';
//pages
import ToDo from './Components/pages/Todo/ToDo';
import About from './Components/pages/About/About';
import ContactWithClass from './Components/pages/Contact/Contacts/ContactWithClass';
import ContactWithHook from './Components/pages/Contact/Contacts/ContactWithHook';
import ContactWithReducer from './Components/pages/Contact/Contacts/ContactWithReducer'
import ContactPage from './Components/pages/Contact/ContactPage'
import Contact from './Components/pages/Contact/Contact'
import NotFound from './Components/pages/NotFound/NotFound';
import SingleCard from './Components/pages/SingleCard/SingleCard';
import SingleCardWithReducer from './Components/pages/SingleCard/SingleCardWithReducer'
//
import SinglePageProvider from './Context/providers/SinglePageProvider'
//
import { Route, Switch, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const router = [
  {
    component: Contact,
    path: '/contact',
    exact: true
  },
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
    component: ContactWithHook,
    path: '/contactformhook',
    exact: true
  },
  {
    component: ContactPage,
    path: '/contactpage',
    exact: true
  },
  {
    component: ContactWithClass,
    path: '/contactformclass',
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
  {
    component: SingleCardWithReducer,
    path: '/single-card/:id',
    exact: true
  },
  {
    component: ContactWithReducer,
    path: '/contact-reducer',
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
    const rout = router.map((item, index) => {
      if (item.path === '/card/:id') {
        return (
          <Route
            key={index}
            path={item.path}
            render={(props) => (
              <SinglePageProvider {...props}>
                <item.component {...props} />
              </SinglePageProvider>
            )

            }
            exact={item.exact}
          />
        )
      }
      return (
        <Route
          key={index}
          path={item.path}
          component={item.component}
          exact={item.exact}
        />

      )
    })
    const { isOpen } = this.state;
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
          {rout}
          <Redirect to='/404' ></Redirect>
        </Switch>

      </div>
    )
  }

}


export default App;