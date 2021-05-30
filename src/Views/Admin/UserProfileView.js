import React from 'react'
import AdminHeader from './AdminHeader';
import Profile from "../../Components/Profile"

function UserProfileView() {
    return (
      <>
        <AdminHeader/>
        <div className="main-content"> 
             <Profile/>
        </div>
      </>
    )
}

export default UserProfileView
