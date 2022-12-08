import React from 'react';
import Cookies from "universal-cookie";
import { Container, Col, Row, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

function Header ({isAuthorized, setIfAuthorized}) {
    const logout = async () => {
        const isSure = window.confirm(
            "Are you sure you want to log out?"
        );
        if (!isSure) {
            return;
        }
        const cookies = new Cookies();
        cookies.remove("jwt");

        setIfAuthorized(false);
      }

    return (
        <div className="header" style={{'maxWidth': 'inherit'}}>
            <Container>
                <Row>
                    <Col md={2}>
                        {
                            isAuthorized && <Button size='lg' color="warning" onClick={() => logout()}>Log out</Button>
                        }
                    </Col>
                    <Col md={8} style={{'textAlign': 'center'}}>
                        <NavLink to={'/'} className='aHeader'>Restaurant</NavLink>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Header;