import {React, useState} from 'react';
import { Container, Col, Row, Button, Form, Input, Label } from 'reactstrap';
import api from '../utils/Api';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function CreateDish() {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Pizza");
    const [price, setPrice] = useState("");
  
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await api.request(
          "post",
          '/dishes',
          {
            "name": name,
            "description": description,
            "image": image,
            "category": category,
            "price": price
          },
          { "Content-Type": "application/json" }
        );
        if (res.status === 201 || res.status === 200) {
            alert("Dish created.")
        }
    }
  
    return (
        <>
            <Breadcrumb className='marginTop20'>
                <Breadcrumb.Item href="/">Main</Breadcrumb.Item>
                <Breadcrumb.Item active>Create dish</Breadcrumb.Item>
            </Breadcrumb>
            <Container className="createDishBox DishTemplate">
                <Form onSubmit={e => handleSubmit(e)}>
                    <Row className="form-group marginTop20 marginBottom20">
                        <Label htmlFor="name" md={2}>name</Label>
                        <Col md={10}>
                            <Input type="text" name="name" id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </Col>
                    </Row>
                    <Row className='form-group marginBottom20'>
                        <Col md={12}>
                            <Input type="textarea" name="description" id="description" 
                                value={description} style={{'height': '200px'}}
                                onChange={(e) => setDescription(e.target.value)} />
                        </Col>
                    </Row>
                    <Row className="form-group marginBottom20">
                        <Label htmlFor="image" md={2}>Image</Label>
                        <Col md={10}>
                            <Input type="text" name="image" id="image" 
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)} />
                        </Col>
                    </Row>
                    <Row className="form-group marginBottom20">
                        <Label htmlFor="category" md={2}>Category</Label>
                        <Col md={10}>
                            <Input type="select" name="category" id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    defaultValue={""}>
                            <option value={"Pizza"}>Pizza</option>
                            <option value={"Pasta"}>Pasta</option>
                            <option value={"Soup"}>Soup</option>
                            <option value={"Drink"}>Drink</option>
                            </Input>
                        </Col>
                    </Row>
                    <Row className="form-group marginBottom20">
                        <Label htmlFor="price" md={2}>Price</Label>
                        <Col md={10}>
                            <Input type="number" name="price" id="price" 
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)} />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={4}></Col>
                        <Col md={4}>
                            <Button type='submit' color='danger' size="lg">Create Dish</Button>
                        </Col>
                    </Row>     
                </Form>
            </Container>
        </>
    );
}

export default CreateDish;