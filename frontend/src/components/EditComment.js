import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Col, Row, Button, Form, Input, Label } from 'reactstrap';
import api from '../utils/Api';

function EditComment({ userId }) {
    const [comment, setComment] = useState({});
    const [authorId, setAuthorId] = useState("");
    const [rating, setRating] = useState("");
    const [commentText, setCommentText] = useState("");
    let { dishId, commentId } = useParams();

    const getComment = async () => {
        const data = await api.request("get", `/dishes/${dishId}/comments/${commentId}`);
        if (data) {
            setComment(data);
            setRating(data.rating);
            setCommentText(data.comment);
            setAuthorId(data.author._id);
        }
        console.log(data)
    };

    useEffect((_) => {
      getComment()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await api.request(
          "put",
          `/dishes/${dishId}/comments/${commentId}`,
          {
            "rating": rating,
            "comment": commentText
          },
          { "Content-Type": "application/json" }
        );
        if (res.status == 200) {
            alert("Comment changed!")
        }
    }
  
    return (
      <Row className="g-0">
        {
            comment ? (
                (authorId === userId) ? (
                  <div>
                    <Row className="g-0">
                      <Col md={4}></Col>
                      <Col md={4}>
                        <Container className="signForm">
                          <Form onSubmit={e => handleSubmit(e)}>
                              <Row className='marginTop20'>
                                  <Col md={2}>
                                    <Label for="rating">Rating</Label>
                                  </Col>
                                  <Col md={10}>
                                      <Input type="number" name="rating" id="rating" 
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)} />
                                  </Col>
                              </Row>
                              <Row className='marginTop20'>
                                  <Col md={2}>
                                    <Label for="commentText">Comment</Label>
                                  </Col>  
                                  <Col md={10}>
                                      <Input type="textarea" name="commentText" id="commentText" 
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)} />
                                  </Col>
                              </Row>
                              <Row className='marginTop20'>
                                  <Col md={4}></Col>
                                  <Col md={4}>
                                      <Button type='submit' color='danger' size="lg">Edit</Button>
                                  </Col>
                              </Row>     
                          </Form>
                        </Container>  
                      </Col>  
                    </Row>
                  </div>
              ) : (
                <div>
                    <h3>You can't change this comment!</h3>
                </div>
              )
            ) : (
              <div>
                  <h3>Comment is not loaded yet...</h3>
              </div>
            )
         }
      </Row>
    );
}

export default EditComment;