import React, { useState } from 'react';
import api from '../utils/Api';
import { Container, Col, Row, Button, Form, Input, Label } from 'reactstrap';

function CreateComment({ dishId }) {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await api.request(
          "post",
          `/dishes/${dishId}/comments`,
          {
            "comment": comment,
            "rating": rating
          },
          { "Content-Type": "application/json" }
        );
        if (res.status === 200 || res.status === 201) {
            alert("Comment created.")
        }
    }

    return (
          <Container className="createCommentBox marginBottom20">
            <Form onSubmit={e => handleSubmit(e)}>
                <Row>
                    <Col md={4} className='marginBottom20'>
                      <Label for="rating" className='marginTop20'>Rating</Label>
                    </Col>      
                    <Col md={8}>
                        <Input type="number" name="rating" id="rating" 
                              min={1} max={5} value={rating}
                              onChange={(e) => setRating(e.target.value)} 
                              className='marginBottom20 marginTop20'/>
                    </Col>
                    <Col md={12}  className='marginBottom20'>
                        <Input type="textarea" name="review" id="review" 
                              value={comment}
                              onChange={(e) => setComment(e.target.value)} />
                    </Col>
                    <Col md={{size: 4, offset: 4}} className='marginBottom20'>
                      <Button type='submit' color='success' size="lg">Post</Button>
                    </Col>
                </Row>
            </Form>
          </Container>
    );
}

export default CreateComment;