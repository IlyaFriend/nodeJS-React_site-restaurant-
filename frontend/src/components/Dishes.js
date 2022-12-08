import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import DishTemplate from './subcomponents/DishTemplate';
import api from '../utils/Api';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function Dishes ({isAdmin}) {
    const [Dishes, setDishes] = useState([]);

    const onDelete = async (dishId) => {
        const isSure = window.confirm(
            "Are you sure you want to delete the dish?"
        );
        if (!isSure) {
            return;
        }
        let res = await api.request("delete", `/dishes/${dishId}`);
        if (res.status === 200) { alert("Dish deleted successfully") }
    };

    const getDishes = async () => {
        const data = await api.request("get", `/dishes`);
        if (data) {
            setDishes(data);
        }
    };
  
    useEffect((_) => {
        const intervalId = setInterval(() => {
            getDishes();
            console.log(Dishes)
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);  

    return (
        <Container  className='marginTop20'>
            <Breadcrumb>  
                {(isAdmin) && <Breadcrumb.Item href="/">Main</Breadcrumb.Item>}
                <Breadcrumb.Item active>Menu</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                {
                    Dishes.length > 0 ? Dishes.map(
                        (dish, idx) => 
                            <Col key={idx} lg={{ size: 5,  offset: 1 }}>
                                <DishTemplate dish={dish} mini={true} />
                                {
                                    isAdmin && (
                                        <Button className='marginBottom20' color='danger' size="lg" onClick={e => onDelete(dish._id)}>Delete</Button>
                                    )
                                }
                            </Col>
                    ) : (<h1>No dishes has been loaded yet...</h1>)
                }
            </Row>
        </Container>
    )
}

export default Dishes;