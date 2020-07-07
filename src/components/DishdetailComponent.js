
import React from 'react';
import {Component} from 'react';
import {Card ,CardImg,CardImgOverlay,CardText,CardBody,Media, CardTitle} from 'reactstrap'
class Dishdetail extends Component{
constructor(props){
    super(props);
}
render(){
    return(
        <div className="row">
        <Card >
                
        <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name}/>
    
    <CardImgOverlay>
        <CardTitle>{this.props.dish.name}</CardTitle>
          
    </CardImgOverlay>
    </Card>

    </div>
    )
}

}
export default Dishdetail;