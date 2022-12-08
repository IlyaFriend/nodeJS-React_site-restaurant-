import { React, useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Container, Col, Row, Button, Form, Input, Label } from 'reactstrap';
import api from '../utils/Api';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function EditDish({ isAdmin }) {
    const [Dish, setDish] = useState({});
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    let { dishId } = useParams();

    const getDish = async () => {
        const data = await api.request("get", `/dishes/${dishId}`);
        if (data) {
            setDish(data);
            setName(data.name);
            setDescription(data.description);
            setImage(data.image);
            setCategory(data.category);
            setPrice(data.price);
        }
    };

    useEffect((_) => {
        getDish();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await api.request(
          "put",
          `/dishes/${Dish._id}`,
          {
            "name": name,
            "description": description,
            "image": image,
            "category": category,
            "price": price
          },
          { "Content-Type": "application/json" }
        );
        if (res.status == 200) {
            alert("Dish changed!")
        }
    }
  
    return (
      <Row className="g-0">
        <Breadcrumb>  
            <Breadcrumb.Item href="/">Main</Breadcrumb.Item>
            <Breadcrumb.Item><NavLink to={'/dishes'}>Menu</NavLink></Breadcrumb.Item>
            <Breadcrumb.Item><NavLink to={`/Dish/${dishId}`}>{name}</NavLink></Breadcrumb.Item>
            <Breadcrumb.Item active>My comment</Breadcrumb.Item>
        </Breadcrumb>
        {
            Dish ? (
                (isAdmin) ? (
                  <Row>
                    <Col md={{"size": "6", "offset": "3"}}>
                      <Container className="signForm">
                        <Form onSubmit={e => handleSubmit(e)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Name</Label>
                                <Col md={10}>
                                    <Input type="text" name="name" id="name" 
                                          value={name}
                                          onChange={(e) => setName(e.target.value)} />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={2}>
                                    <Label for="description">Description</Label>
                                </Col>
                                <Col md={10}>
                                    <Input type="textarea" name="description" id="description" 
                                          value={description}
                                          onChange={(e) => setDescription(e.target.value)} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="image" md={2}>Image</Label>
                                <Col md={10}>
                                    <Input type="text" name="image" id="image" 
                                          value={image}
                                          onChange={(e) => setImage(e.target.value)} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="category" md={2}>Category</Label>
                                <Col md={10}>
                                    <Input type="select" name="category" id="category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            defaultValue={category}>
                                      <option value={""}>No category</option>
                                      <option value={"Pizza"}>Pizza</option>
                                      <option value={"Pasta"}>Pasta</option>
                                      <option value={"Soup"}>Soup</option>
                                      <option value={"Drink"}>Drink</option>
                                    </Input>
                                </Col>
                            </Row>
                            <Row className="form-group">
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
                                    <Button type='submit' color='danger' size="lg">Edit</Button>
                                </Col>
                            </Row>
                        </Form>
                      </Container>  
                    </Col>
                  </Row>
              ) : (
                <div>
                    <h3>You can't change this Dish!</h3>
                </div>
              )
            ) : (
              <div>
                  <h3>Dish is not loaded yet...</h3>
              </div>
            )
         }
      </Row>
    );
}

export default EditDish;