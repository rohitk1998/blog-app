import React from 'react';
import AdminHeader from './AdminHeader';
import {useHistory} from "react-router-dom"
import {Container , Row , Col , Button} from 'react-bootstrap'
import {Base_Path} from "../../Authenctication/Base_Path"
import {MDBIcon} from "mdbreact";


function UsersList() {
  const [blogusers , setBlogUsers] = React.useState([]);
  // const [userid,setUserId] = React.useState();
  const history = useHistory();
  const API_COFIG = {
    getAllUsers : Base_Path + '/api/getAllUser'
  }
  React.useEffect(()=>{
    FetchingBlogUsersList();
  },[])

  const FetchingBlogUsersList =async()=>{
        await fetch(API_COFIG.getAllUsers , {
          method:'GET',
        }).then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          if(data.length > 0){
            setBlogUsers(data);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  }
  const ShowUserProfile =async(userid)=>{
    console.log("userid",userid);
    history.push('/UserProfileView')
  }  
    return (
       <>
        <AdminHeader/>
        <div className='main-content'>
        <Container  className="title-container">
        <h2>Users List</h2>
        <p>All Users Who are live member of Blog App.</p>
        </Container>
        <Container  className='user-table-container'>
        <table class="table">
  <thead>
    <tr>
      <th style={{fontSize:16,fontWeight:'normal'}} scope="col">Username</th>
      <th style={{fontSize:16,fontWeight:'normal'}} scope="col">UserId</th>
      <th style={{fontSize:16,fontWeight:'normal'}} scope="col">Image</th>
      <th style={{fontSize:16,fontWeight:'normal'}} scope="col">Email</th>
      <th style={{fontSize:16,fontWeight:'normal'}} scope="col">Created On</th>
      <th style={{fontSize:16,fontWeight:'normal'}} scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
 
    {
      blogusers.map((user , index) => (    
    <tr key={index} class="table-white">
      <td>{user.firstname + ' ' + user.lastname}</td>
      <td>{user.userid}</td>
      <td>
        <img src={user.image} alt=''/>
      </td>
      <td>{user.email}</td>
      <td>{user.registereddate}</td>
      <td>
<Button onClick={()=> ShowUserProfile(user.userid)} className = "btn btn-light action-button">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>
</Button>
<Button className = "btn btn-light action-button">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
</Button>
<Button  className = "btn btn-light action-button">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
</svg>
</Button>
      </td>
      </tr>
      ))
    }
   
  </tbody>
</table>
        </Container>
        </div>
       </>
    )
}

export default UsersList
