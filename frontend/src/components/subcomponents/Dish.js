import { React, useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import DishTemplate from './DishTemplate';
import Comments from '../Comments';
import api from '../../utils/Api';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function Dish ({userId, isAdmin}) {
    const [dish, setDish] = useState({});
    let { dishId } = useParams();

    const getDish = async () => {
        const data = await api.request("get", `/dishes/${dishId}`);
        if (data) {
            setDish(data);
        }
    };

    useEffect((_) => {
        const intervalId = setInterval(() => {
            getDish();
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Container className='marginTop20'>
            <Breadcrumb>  
                {(isAdmin) && <Breadcrumb.Item href="/">Main</Breadcrumb.Item>}
                <Breadcrumb.Item><NavLink to={'/dishes'}>Menu</NavLink></Breadcrumb.Item>
                <Breadcrumb.Item active>{dish.name}</Breadcrumb.Item>
            </Breadcrumb>
         {
            dish ? (
                <Row>
                    <Col md={{ size: 8,  offset: 0 }} className='DishTemplate fullBT'>
                        <DishTemplate dish={dish} mini={false}/>
                        {isAdmin ? <NavLink to={`/edit-Dish/${dishId}`}><Button color='warning' size="lg">Edit</Button></NavLink> : null}
                    </Col>
                    <Col md={4}>
                        <Comments dishId={dishId} userId={userId} isAdmin={isAdmin}/>
                    </Col>
                </Row>
            ) : (
                <Row>
                    <h3><i>Dish is not loaded yet...</i></h3>
                </Row>
            )
         }
        </Container>
    )
}

export default Dish;