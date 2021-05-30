import React, { useState } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import { Menu, Dropdown, Button, Space } from 'antd';
import {useHistory} from "react-router-dom";

function AdminHeader(){
const [isOpen , setIsOpen] = useState(false)

const toggleCollapse = () => {
  setIsOpen(!isOpen);
}

const history = useHistory();
const User_Image = localStorage.getItem('User_Image');
console.log(history);

const HANDLE_USER_LOGOUT = ()=>{
      localStorage.clear();
      history.push('/Login');
} 
const menu = (
    <Menu>
      <Menu.Item>
      <Button onClick={()=> history.push('/profile')} type="text">Pofile</Button>
      </Menu.Item>
      <Menu.Item>
        <Button onClick={()=> history.push('/setting')} type="text" >Setting</Button>
      </Menu.Item>
      <Menu.Item>
      <Button onClick={HANDLE_USER_LOGOUT} type="primary">Logout</Button>
      </Menu.Item>
    </Menu>
  );


  return (
      <MDBNavbar color="black" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Navbar</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="/AdminHome">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/All_Users">Blog-Users</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/">create Blog</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
          <MDBNavItem>
          <Space wrap>
      <Dropdown overlay={menu} placement="bottomCenter">
      <img src={User_Image} alt="" />
       </Dropdown>
     </Space>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  
}

export default AdminHeader;