import React , {useEffect} from 'react';
import UserHeader from "./UserHeader";
import {Container , Row , Col , Form} from 'react-bootstrap'
// import { Menu, Dropdown, Button, Space } from 'antd';
import Card from "../../Components/Card";
import {Base_Path} from "../../Authenctication/Base_Path";
import { Input } from 'antd';
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


function UserHome() {
    const [allPosts , setallPosts] = React.useState([]);
    const [searchinput , setSearchInput] = React.useState('');
    const [searchedposts , setSearchPosts] = React.useState([])
    const API_CONFIG = {
        getAllPosts : Base_Path + '/api/posts',
        getPostIdByTagname:Base_Path + '/api/GetTagsRelatedPostByTag',
    }
    useEffect(()=> {
          getPosts()
    },[])

    const getPosts = async()=>{
      let postarr = []
      await fetch(API_CONFIG.getAllPosts,{
          method :"GET"
      }).then(res => res.json())
      .then(data => {
        console.log(data.length)
        if(data.length > 0){
            data.map(post => {
             if(post.statusofpost === 'active'){
              console.log(post);
               postarr.push(post)
             }
            })
          }
          setallPosts(postarr)
      })
    }
    const handleSearchFunction = async()=> {
       setallPosts([])
        console.log(searchinput)
        if(searchinput !== ''){
            console.log('go and search tag ')
            await fetch(API_CONFIG.getPostIdByTagname , {
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
                    tagname : searchinput,
                })
              }).then(response => response.json())
              .then((data) => {
                console.log('Getting Postids by Tagname on Search >>> Success:', data);
                setSearchPosts(data[0])
              })
        }
    }
    // const getAllPostByTag = async (postid , index)=> {
    //   console.log(postid , index)
    //         let postarray = [] ; 
    //         console.log('searchedposts' , searchedposts)
    //          await saveinarray(index)
    //         await fetch(API_CONFIG.getAllPostsByTags , {
    //            method: 'POST', 
    //            mode: 'cors', 
    //            cache: 'no-cache', 
    //            credentials: 'same-origin', 
    //            headers: {
    //              'Content-Type': 'application/json'
    //            },
    //            redirect: 'follow',
    //            referrerPolicy: 'no-referrer',
    //            body: JSON.stringify({
    //               postId : postid
    //            })
    //          }).then(response => response.json())
    //          .then(async(data) => {
    //            console.log('getting all posts by tags >>> Success:', data);
    //            const posts = JSON.stringify(data[0])
    //            postarray.push(posts)
    //          })
    //          .catch((error) => {
    //            console.error('Error:', error);
    //          })
    //         setSearchPosts(postarray)
    // }

    function saveinarray(index){
      if(index > 0 ){
        searchedposts.map((post)=> {
          console.log('posts already in array state >>' , post)
        })
       }
    }
    return (
        <>
          <UserHeader/>
          <div className='main-content'> 
          <Container fluid className='search-container'>
            <Row>
                <Col sm={6} lg={6} xl={6} xs={6}>
                <Input placeholder="Basic usage" value={searchinput} type='text' onClick={()=> console.log('check if enter is clicked')} onChange={(e)=> setSearchInput(e.target.value)} />
                </Col>
                <Col sm={6} lg={6} xl={6} xs={6}>
                <Tooltip title="search">
      <Button onClick={handleSearchFunction} type="primary" shape="circle" icon={<SearchOutlined />} />
    </Tooltip>
                </Col>
            </Row>
          </Container>
           <Container fluid className='blog-container'>
                <Row>
                    <Col sm={12} lg={12} xl={12} xs={12}>
                   <Container fluid>
                  <Row>
                      {
                        allPosts.length > 0 ? (
                          allPosts.map(post =>(
                            <Col sm={12}>
                            <Card
                            blog_post_id = {post.postId}
                            creatername = {post.createrName} 
                            createimage = {post.createrImage}
                            blog_post_content={post.postContent}
                             blog_post_content_image={post.postContentImage}
                             blog_post_created_date={post.createdDate}
                             blog_post_title={post.postTitle}
                            />
                          </Col>
                          ))
                        ) : 
                        (
                          searchedposts.map(post =>(
                            <Col sm={12}>
                            <Card
                            blog_post_id = {post.postId}
                            creatername = {post.creatername} 
                            createimage = {post.createrimage}
                            blog_post_content={post.postcontent}
                             blog_post_content_image={post.postcontimage}
                             blog_post_created_date={post.createddate}
                             blog_post_title={post.posttitle}
                            />
                          </Col>
                          // console.log(post , allPosts)
                          ))
                        )
                      }
                  </Row>
                   </Container>
                    </Col>
                </Row>
           </Container>
        </div>
        </>
    )
}

export default UserHome;
