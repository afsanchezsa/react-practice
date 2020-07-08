import React,{Component} from 'react';
import {Card ,CardImg,CardImgOverlay,CardText,CardBody,Media, CardTitle} from 'reactstrap'
import Dishdetail from './DishdetailComponent';
class Menu extends Component{

    constructor(props){
        super(props);
        this.state={
            dishes:this.props.dishes,
            selectedDish:null
        }
       console.log('Menu Component constructor is invoked');
    }
    componentDidMount(){
        console.log('Component Did Mount is executed');
    }
    onDishSelected(dish){
        this.setState({
            selectedDish:dish
        });
       
    }
    
    
    render(){
        const menu=this.state.dishes.map((dish)=>{return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card onClick={()=>this.props.onClick(dish.id)}>
                
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                            
                </CardImgOverlay>
                </Card>


            </div>
        )});      
        console.log('render method is invoked');         
        return(


<div className="container">
<div className="row">

{menu}

</div>

</div>

        );
    }
}
export default Menu;