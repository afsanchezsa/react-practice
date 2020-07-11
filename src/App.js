import React from 'react';
import logo from './logo.svg';
import {Navbar, NavbarBrand} from 'reactstrap'
import './App.css';
import MainComponent from './components/MainComponent';
import Menu from './components/MenuComponent';
import {DISHES} from './shared/dishes';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import {ConfigureStore} from './redux/configureStore';
const store=ConfigureStore();
class App extends React.Component{
 
render() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div>
     
      <MainComponent/>  
      
    </div>
    </BrowserRouter>
    </Provider>
  );
}
}

export default App;
