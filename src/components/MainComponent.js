import React from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
class Main extends React.Component{
constructor(props){
  super(props);
  this.state={
    dishes:DISHES,
    selectedDish:null
  };
}  
onDishSelected(dishId){
    this.setState({
        selectedDish:dishId
    });

}
render() {
  return (
    <div>
      <Header/>
     
      <Menu dishes={this.state.dishes} onClick={(dishId)=>this.onDishSelected(dishId)}/>  
      
      <Dishdetail dish={this.state.dishes.filter((dish)=>dish.id===this.state.selectedDish)[0]}/>
      <Footer/>
    </div>
  );
}
}

export default Main;
