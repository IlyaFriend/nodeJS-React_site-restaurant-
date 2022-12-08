import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

function UserMenu({isAuthorized}) {
    return (
        <Container>
            {
            isAuthorized ? (
                <Row className='navUl'>
                  <Col sm={4} className='navLi'><NavLink to="/dishes" className='nav_navLink' id="menu_btn">Dishes</NavLink></Col>
                  <Col sm={4} className='navLi'><NavLink to="/users" className='nav_navLink' id="users_btn">Users</NavLink></Col>
                  <Col sm={4} className='navLi'><NavLink to="/create" className='nav_navLink' id="create_dish_btn">Create Dish</NavLink></Col>
                </Row>
            ) : (
                <Row className='navUl marginTop20'>
                    <Col className='navLi'><NavLink to="/login" className='nav_navLink'>Login</NavLink></Col>
                    <Col className='navLi'><NavLink to="/signup" className='nav_navLink'>Sign up</NavLink></Col>
                </Row>
            )
          }
        </Container>
    )
}

export default UserMenu;