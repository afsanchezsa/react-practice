
import React from 'react';
import { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, Media, CardTitle, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Modal, Form, ModalHeader, ModalBody, Col, Row, Label } from 'reactstrap';

import { Control, LocalForm, Errors } from 'react-redux-form';
const minLength=(len)=>(val)=>val&&val.length>=len;
const maxLength=(len)=>(val)=>val&&val.length<=len;
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.toggleCommentForm = this.toggleCommentForm.bind(this);
        this.state = {
            isOpen: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(values) {
        this.toggleCommentForm();
        this.props.addComment(this.props.dishId,values.rating,values.author,values.comment);
        alert("Current State:" + JSON.stringify(values));
    }
    toggleCommentForm() {
        this.setState({ isOpen: !this.state.isOpen })
    }
    render() {
        return (<div className='mb-3'>
            <Modal isOpen={this.state.isOpen} toggle={this.toggleCommentForm}
            >
                <ModalHeader>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor='rating' md={2}>Rating</Label>
                            <Col md={12}>
                                <Control.select model='.rating' id='rating' name='rating'
                                    className='form-control'


                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>

                                </Control.select>
                               
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor='author' md={3}>Your Name</Label>
                            <Col md={12}>
                                <Control.text model='.author' id='author' name='author'
                                    className='form-control'
                                    validators={{minLength:minLength(3),maxLength:maxLength(15)}}

                                />
                                    

                                
                                <Errors
                                    className='text-danger'
                                    model='.author'
                                    show='touched'
                                    messages={{
                                        
                                        minLength: 'Must be grater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor='comment' md={3}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model='.comment' id='comment' name='comment'
                                    className='form-control' rows='6'
                                   

                                />
                                    

                                
                             
                            </Col>
                        </Row>
                        <Button className='submit' color='primary'>Submit</Button>
                    </LocalForm>

                </ModalBody>

            </Modal>
            <Button outline onClick={this.toggleCommentForm}><span className='fa fa-pencil fa-lg mr-1'></span>Submit Comment</Button>
        </div>);
    }
}
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