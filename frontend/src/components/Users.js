import { useEffect, useState } from "react";
import api from "../utils/Api";
import { Container, Col, Row} from 'reactstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function Users () {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const data = await api.request("get", `/users`);
        if (data) {
            setUsers(data);
        }
    };

    useEffect((_) => {
        const intervalId = setInterval(() => {
            getUsers();
        }, 2000);
        return () => clearInterval(intervalId);
    }, []);

    return ( 
        <Container className="marginTop20">
            <Breadcrumb>  
                <Breadcrumb.Item href="/">Main</Breadcrumb.Item>
                <Breadcrumb.Item active>Users</Breadcrumb.Item>
            </Breadcrumb>
            <table>
                <tr>
                    <th scope="col">username</th>
                    <th scope="col">firstname</th>
                    <th scope="col">lastname</th>
                    <th scope="col">admin</th>
                </tr>
                {
                    users.map((user) =>
                        <tr>
                            <th scope="row">{user.username}</th>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{ (user.admin) ? 'True' : 'False' }</td>
                        </tr>
                    )
                }
            </table>
        </Container>
    )
}

export default Users;