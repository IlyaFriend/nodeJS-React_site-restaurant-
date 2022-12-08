import Cookies from "universal-cookie";
import { useState } from "react";
import api from "../utils/Api";
import { Container, Col, Row, Button, Form, Input, Label } from 'reactstrap';

function Login ({ setIfAuthorized, setIfAdmin, setUserId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.request(
        "post",
        `/users/login`,
        {
          "username": username,
          "password" : password
        },
        { "Content-Type": "application/json" }
      );
      const cookies = new Cookies();
      const date_of_expiration = new Date();
      date_of_expiration.setTime(
        date_of_expiration.getTime() + 24 * 60 * 60 * 1000
      );
      console.log(res.data)
      cookies.set("jwt", res.data.token, {
        path: "/",
        expires: date_of_expiration,
      });
      cookies.set("userId", res.data.userId,  {
        path: "/",
        expires: date_of_expiration,
      });
      cookies.set("isAdmin", res.data.admin,  {
        path: "/",
        expires: date_of_expiration,
      });
      setIfAuthorized(true);
      setIfAdmin(res.data.admin);
      setUserId(res.data.userId);
    } catch (e) {
      if (e.code === 'ERR_BAD_REQUEST') {
        alert('There is no such user.')
      } 
      else if (e.statusCode === 401) {
        alert('There is no such user.')
      } else {
        console.log('Error occurred: ' + e.message)
        alert('Wrong input.')
      }
    }

  }

  return (
    <Row className="g-0" style={{'marginTop': '80px'}}>
      <Col md={3}></Col>
      <Col md={6} className='signForm'>
        <Form onSubmit={e => handleSubmit(e)}>
          <Container className="loginBox">
            <Row className="form-group marginBottom20">
                <Label htmlFor="username" lg={2}>Username</Label>
                <Col lg={10}>
                    <Input name="username" id="username" 
                          value={username}
                          onChange={(e) => setUsername(e.target.value)} />
                </Col>
            </Row>
            <Row className="form-group marginBottom20">
                <Label htmlFor="password" lg={2}>Password</Label>
                <Col lg={10}>
                    <Input type="password" name="password" id="password" placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                </Col>
            </Row>
            <Row className="form-group">
                <Col md={4}></Col>
                <Col md={4}>
                    <Button type='submit' color='primary' size="lg">Log in</Button>
                </Col>
            </Row>
          </Container>
        </Form>
        </Col>  
    </Row>
  );
};

export default Login;