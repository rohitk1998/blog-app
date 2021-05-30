import React , {useEffect , useState} from 'react'
import AdminHeader from "./AdminHeader";
import {Container , Row , Col , Form} from 'react-bootstrap'
import { Menu, Dropdown, Button, Space } from 'antd';

function AdminCreateBlog() {
    const [title, settitle] = useState('')
    const [content , setContent] = useState('');
    const [blogmainimage , setBlogMainImage] = useState('');
    const creater_id = localStorage.getItem('User_Id');
    const creater_name = localStorage.getItem('User_Firstname') + ' ' + localStorage.getItem('User_Lastname')
    
    const HANDLE_POST_CREATION = async()=> {
        console.log(title , content , blogmainimage);
       await fetch('http://localhost:3000/api/blog/create-blog' , {
        method: 'POST',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            blog_post_id:1,
            blog_post_title:title,
            blog_post_content:content,
            blog_post_content_image:blogmainimage,
            blog_post_typename:'post',
            blog_post_creater_id:creater_id,
            blog_post_creater_name:creater_name,
            blog_post_creater_type_name:'Admin',
            blog_post_created_date:'17/04/2021'
        })
       })
       .then(res => res.json())
       .then(data => {
           console.log(data);
       })
    }
    return (
       <>
        <AdminHeader></AdminHeader>
        <div className='main-content'>
        <Container fluid className='create-blog'>
           <Row>
               <Col sm={12}>
               <h6>create Blog</h6>
               </Col>
               <Col sm={12} className='Blog-title'>
              <input type="text" placeholder='Blog-title' onChange={(e)=> settitle(e.target.value)} value={title} />
               </Col>
               <Col sm={12} className='Blog-content'>
               <textarea type='text' onChange={(e)=> setContent(e.target.value)} value={content} />
               </Col>
               <Col sm={12} className='Blog-image'>
               <input type="text" placeholder='Blog-image' onChange={(e)=> setBlogMainImage(e.target.value)} value={blogmainimage} />
               </Col>
               <Col>
               <Button onClick={HANDLE_POST_CREATION}>Publish</Button>
               </Col>
           </Row>
        </Container>
        </div>
       </>
    )
}

export default AdminCreateBlog
