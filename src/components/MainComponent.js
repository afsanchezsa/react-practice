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
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent'
import AboutUs from './AboutComponent';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreators';
/*
NOTA: para implementar redux:
1. crear los tipos de acciones como en archivo ActionTypes
2. crear las acciones (funciones que retornan un  objeto con type y payload) como en Action Creators
3.cree los reducers (vea el ejemplo de comment.js ) los cuales son funciones que reciben el estado actual y una accion y retornan el nuevo estado.
4.Cree el store combinando todos los reducers tal como se hizo el archivo configureStore.
5. En App.js con un Provider haga disponible en la aplicacion el store.
6. en el MainComponent o el archivo donde desee usar el store, haga el connecto con el withRouter para
seguir usando el React Router (vea la ultima linea de este archivo)
7. Declare las funciones mapStateToProps que va a retornar un objeto con las props que vienen de la store
8.declare la funcion MatchDispatchToProps que recibe el dispatcher. a este
dispatcher se le pasa como parametro una accion (creada en ActionCreators) con sus parametros y
con esta accion construye el nuevo estado global de la aplicacion.
como el estado global cambió  se ejecuta de nuevo mapStateToProps y cambian las props y asi se actualizan los datos


*/
const mapStateToProps = state => {//este state es el estado retornado por el reducer (en este caso el reducer formado por combine reducer)
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders///aqui se pasa a los props todas las propiedades del destado global
  }

}
const mapDispatchToProps = (dispatch) => {
return {
addComment:(dishId,rating,author,comment)=>dispatch(addComment(dishId,rating,author,comment))
//se hace dispatch con addComment que es una accion creada en ActionCreators
}
}
class Main extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    const HomePage = () => {/*ahora se usa el props pues se hizo el macth state to props*/
      return (<Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
        leader={this.props.leaders.filter((leader) => leader.featured)[0]}
      />);
    }
    const DishWidthId = ({ match }) => {
      console.log(match.params);
      return (
        <Dishdetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          addComment={this.props.addComment}
          />

      );

    }
    const AboutComponent = ({ leaders }) => {
      return (<AboutUs leaders={leaders} />);
    }
    return (
      <div>
        <Header />

        <Switch>

          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" component={DishWidthId} />
          <Route exact path='/contactus' component={Contact} />
          <Route exact path='/aboutus' component={() => <AboutComponent leaders={this.props.leaders} />} />
          <Redirect to="home" />
        </Switch>


        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
/* withRouter es para que funcione el router aun cuando se hace el connect*/
