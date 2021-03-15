import './App.css';
import React from 'react';
import ToDo from './Components/Todo/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  
  render() {
      return (
        <div className='App'>
          <ToDo />
        </div>
      )
  }
  
}


export default App;