import Cookies from "universal-cookie";
import { useState } from "react";
import api from "../utils/Api";
import { Container, Col, Row, Button, Form, Input, Label } from 'reactstrap';

function Signup ({ setIfAuthorized, setUserId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleSubmit = async (e) => {
      e.preventDefault()
        
      const res = await api.request(
          "post",
          `/users/signup`,
          {
            "username": username,
            "password" : password,
            "firstname" : firstname,
            "lastname" : lastname,
          },
          { "Content-Type": "application/json" }
      );
      const cookies = new Cookies();
      const date_of_expiration = new Date();
      date_of_expiration.setTime(
        date_of_expiration.getTime() + 14 * 24 * 60 * 60 * 1000
      );

      cookies.set("jwt", res.data.token, {
        path: "/",
        expires: date_of_expiration,
      });

      setIfAuthorized(true);
      setUserId(res.data.userId);
      alert('Yiu are rolled in! Welcome!')
  }

  return (
    <Row className="g-0" style={{'marginTop': '80px'}}>
      <Col md={3}></Col>
      <Col md={6}>
        <Form onSubmit={e => handleSubmit(e)} className='signForm'>
          <Container className="signupBox">
            <Row className="form-group marginBottom20">
                <Label htmlFor="username" md={{size: 2, offset: 0}} lg={{size: 2, offset: 0}}>Username</Label>
                <Col md={{size: 9, offset:1}} lg={{size: 10, offset: 0}}>
                    <Input name="username" id="username" 
                          value={username}
                          onChange={(e) => setUsername(e.target.value)} />
                </Col>
            </Row>
            <Row className="form-group marginBottom20">
                <Label htmlFor="password" md={{size: 2, offset: 0}} lg={{size: 2, offset: 0}}>Password</Label>
                <Col md={{size: 9, offset:1}} lg={{size: 10, offset: 0}}>
                    <Input type="password" name="password" id="password" placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                </Col>
            </Row>
            <Row className="form-group marginBottom20">
                <Label htmlFor="firstname" md={{size: 2, offset: 0}} lg={{size: 2, offset: 0}}>Firstname</Label>
                <Col md={{size: 9, offset:1}} lg={{size: 10, offset: 0}}>
                    <Input type="firstname" name="firstname" id="firstname"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)} />
                </Col>
            </Row>
            <Row className="form-group marginBottom20">
                <Label htmlFor="lastname" md={{size: 2, offset: 0}} lg={{size: 2, offset: 0}}>Lastname</Label>
                <Col md={{size: 9, offset:1}} lg={{size: 10, offset: 0}}>
                    <Input type="lastname" name="lastname" id="lastname"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)} />
                </Col>
            </Row>
            <Row className="form-group">
                <Col md={4}></Col>
                <Col md={4}>
                    <Button type='submit' color='danger' size="lg">Sign up</Button>
                </Col>
            </Row>  
          </Container>   
        </Form>  
      </Col>  
    </Row>
  );
};

export default Signup;