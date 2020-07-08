
import React from 'react';
import {Component} from 'react';
import {Card ,CardImg,CardImgOverlay,CardText,CardBody,Media, CardTitle} from 'reactstrap'
class Dishdetail extends Component{
constructor(props){
    super(props);
}
renderComments(comments){
    if(comments!=null){
        return (

            <div className="col-md-5 col-sm-12 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
            {comments.map((comment)=>{
            return (<li>{comment.description}<br/>{comment.author}</li>)
            
            
            })}
            
            
            </ul>
            
            </div>
            
            )
    }else{
        return (<div></div>)
    }

}
renderDish(dish){
        
    if(dish!=null){
        return (
            <div className="col-md-5 col-xs-12 m-1">
            <Card >
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>
                    {dish.description}
                    </CardText>                    </CardBody>
            </Card>
            </div>
        );
    }else{
        return(<div></div>)
    }
}
render(){
    return(
        <div className="container">
        <div className="row">
    {this.renderDish(this.props.dish)}
    {this.renderComments([{description:'Primer Comentario',author:'Andres'},{description:'Segundo Comentario',author:'Sanchez'}])}
    </div>
    </div>
    )
}

}
export default Dishdetail;