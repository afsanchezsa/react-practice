import React from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Home from './HomeComponent'
import AboutUs from './AboutComponent';
import {connect} from 'react-redux';
import {postComment, fetchDishes, fetchPromos, fetchComments, fetchLeaders, postFeedback} from '../redux/ActionCreators';
import {actions} from 'react-redux-form'
import {TransitionGroup,CSSTransition} from 'react-transition-group'
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
        dishes: state.dishes,//state.[nombrequesepusoenelcombinereducer] (por eso es state.dishes)
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders///aqui se pasa a los props todas las propiedades del destado global
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
        //se hace dispatch con addComment que es una accion creada en ActionCreators
        fetchDishes: () => {
            dispatch(fetchDishes())
        },
        resetFeedbackForm: () => {
            dispatch(actions.reset('feedback'))
        },
        fetchComments: () => {
            dispatch(fetchComments())
        },
        fetchPromos: () => {
            dispatch(fetchPromos())
        },
        fetchLeaders:()=>{
            dispatch(fetchLeaders())
        },
        postFeedback:(feedback)=>{dispatch(postFeedback(feedback))}

    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);


    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();

    }

    render() {
        const HomePage = () => {/*ahora se usa el props pues se hizo el macth state to props*/
            return (<Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                          dishesLoading={this.props.dishes.isLoading}
                          dishesErrMess={this.props.dishes.errMess}
                          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                          promosLoading={this.props.promotions.isLoading}
                          promosErrMess={this.props.promotions.errMess}
                          leadersLoading={this.props.leaders.isLoading}
                          leadersErrMess={this.props.leaders.errMess}
                          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}

            />);
        }
        const DishWidthId = ({match}) => {
            console.log(match.params);
            return (
                <Dishdetail
                    dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />

            );

        }
        const AboutComponent = ({leaders,leadersLoading,leaderErrMess}) => {
            return (<AboutUs leaders={leaders} isLoading={leadersLoading} errMess={leaderErrMess}/>);
        }
        return (
            <div>
                <Header/>
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
                <Switch>

                    <Route path="/home" component={HomePage}/>
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
                    <Route path="/menu/:dishId" component={DishWidthId}/>
                    <Route exact path='/contactus'
                           component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>}/>
                    <Route exact path='/aboutus' component={() => <AboutComponent leaders={this.props.leaders.leaders}
                                                                                  leadersLoading ={this.props.leaders.isLoading}
                                                                                    leaderErrMess={this.props.leaders.errMess}/>}/>
                    <Redirect to="home"/>
                </Switch>
                    </CSSTransition>
            </TransitionGroup>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
/* withRouter es para que funcione el router aun cuando se hace el connect*/
