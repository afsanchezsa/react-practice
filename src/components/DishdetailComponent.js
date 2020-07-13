
import React from 'react';
import { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, Media, CardTitle, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import  CommentForm from './CommentForm'
function RenderComments({ comments ,addComment,dishId}) {
    console.log( "comments :"+ JSON.stringify(comments));
    if (comments != null) {
        return (

            <div className="col-md-5 col-sm-12 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return (<li >{comment.comment}<br /><br />---{comment.author}<br /><br /></li>)


                    })}


                </ul>
               
                     <CommentForm dishId={dishId} addComment={addComment}/>
                    
            </div>

        )
    } else {
        return (<div></div>)
    }

}
function RenderDish({ dish }) {

    if (dish != null) {
        return (
            <div className="col-md-5 col-xs-12 m-1">
                <Card >
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>
                            {dish.description}
                        </CardText>                    </CardBody>
                </Card>
            </div>
        );
    } else {
        return (<div></div>)
    }
}
function Dishdetail(props) {
    /*
    componentDidMount() {
        console.log('DidMount in dishdetail');
    }
    componentDidUpdate() {
        console.log('Has updated Dishdetail');
    }
    */

    /*render() {
        console.log('Dishdetail render');*/
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>

            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.comments} 
                addComment={props.addComment}
                dishId={props.dish.id}
                />
            </div>
        </div>
    )
}

//}
export default Dishdetail;