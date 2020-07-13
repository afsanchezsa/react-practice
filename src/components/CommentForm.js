import React, { Component } from 'react';
import { Button, Modal, Form, ModalHeader, ModalBody, Col, Row, Label } from 'reactstrap';

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
                                    className='form-control' rows='4'
                                   

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
export default CommentForm;