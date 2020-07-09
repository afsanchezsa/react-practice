import React from 'react';
import logo from './logo.svg';
import {Navbar, NavbarBrand} from 'reactstrap'
import './App.css';
import MainComponent from './components/MainComponent';
import Menu from './components/MenuComponent';
import {DISHES} from './shared/dishes';
import {BrowserRouter} from 'react-router-dom';
class App extends React.Component{

render() {
  return (
    <BrowserRouter>
    <div>
     
      <MainComponent/>  
      
    </div>
    </BrowserRouter>
  );
}
}

export default App;
