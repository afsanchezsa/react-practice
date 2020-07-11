import React from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect ,withRouter} from 'react-router-dom';
import Home from './HomeComponent'
import AboutUs from './AboutComponent';
import {connect} from 'react-redux';
const mapStateToProps=state=>{//este state es el estado retornado por el reducer
  return {
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders///aqui se pasa a los props todas las propiedades del destado global
  }
  
}
class Main extends React.Component {
  constructor(props) {
    super(props);
  
    
  }

  render() {
    const HomePage=()=>{/*ahora se usa el props pues se hizo el macth state to props*/
      return(<Home dish={this.props.dishes.filter((dish)=>dish.featured)[0]}
      promotion={this.props.promotions.filter((promo)=>promo.featured)[0]}
      leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
      />);
    }
    const DishWidthId=({match})=>{
      console.log(match.params);
      return (
        <Dishdetail dish={this.props.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]}
        comments={this.props.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))}
        />
        
      );

    }
    const AboutComponent=({leaders})=>{
      return(<AboutUs leaders={leaders}/>);
    }
    return (
      <div>
        <Header />

        <Switch>

          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" component={DishWidthId}/>
          <Route exact path='/contactus' component={Contact}/>
          <Route exact path='/aboutus' component={()=><AboutComponent leaders={this.props.leaders}/>}/>
          <Redirect to="home"/>
        </Switch>


        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
/* withRouter es para que funcione el router aun cuando se hace el connect*/
