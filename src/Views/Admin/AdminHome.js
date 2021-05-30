import React , {useEffect} from 'react'
import AdminHeader from "./AdminHeader";
import {useHistory} from "react-router-dom";
import {Container , Row , Col} from 'react-bootstrap'
import { Menu, Dropdown, Button, Space } from 'antd';

function AdminHome() {
    const history = useHistory();
    const user_role = localStorage.getItem('User_Role')
    useEffect(()=>{
        if(user_role === 'User'){
            history.push('/Home')
        }
        else if (user_role === 'Admin'){
           history.push('/AdminHome')
        }
    },[])
    return (
        <>
        <AdminHeader></AdminHeader>
        <Container fluid className='main-content'>
           <Row>
               <Col sm={4}>
               <Button onClick={()=> history.push('/createBlog')} type="text">Pofile</Button>
               </Col>
           </Row>
        </Container>
        </>
    )
}

export default AdminHome
