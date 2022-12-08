import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

function DishTemplate({dish, mini}) {
    let imageSrc = (mini) ? dish.image : '../' + dish.image
    return (
        <Container>
         {
            mini ? (
                <NavLink to={`/Dish/${dish._id}`} style={{"text-decoration": "none"}}>
                <Row className='DishTemplate miniBT marginBottom20'>
                    <Col sm={12} style={{'textAlign': 'left', 'paddingLeft': '61px'}}>
                        <h3>{dish.name}</h3>
                    </Col>
                    <Col sm={12} style={{'color': 'rgb(99, 99, 99)'}}>
                        <i>Category: {dish.category}. Price: {dish.price/100}$</i>
                    </Col>
                    <Col sm={12} className='marginTop20 marginBottom20'>
                        <img src={imageSrc} alt="dish_image" className='img-small'/>
                    </Col>
                    <Col sm={12} style={{'color': 'rgb(99, 99, 99)'}}>
                        {dish.description}
                    </Col>
                </Row></NavLink>
            ) : (
                <Row className='fullBT  marginBottom20'>
                    <Col lg={6} className='marginTop20'>
                        <img src={imageSrc} alt="dish_image" className='img-large'/>
                    </Col>
                    <Col lg={6}>
                        <h3><b>{dish.name}</b></h3><br/>
                        Category: <b>{dish.category}</b><br/>
                        Price: <b>{dish.price/100}$</b><br/>
                        {dish.description}
                    </Col>
                </Row>
            )
         }
        </Container>
    )
}

export default DishTemplate;