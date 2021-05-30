import React , {useEffect} from 'react';
import UserHeader from "./UserHeader";
import { MDBInput } from "mdbreact";
import { MDBBtn } from "mdbreact";
import {Container , Row , Col , Form} from 'react-bootstrap'
import {Base_Path} from "../../Authenctication/Base_Path"
import { useHistory } from 'react-router-dom';
import PostRow from "../../Components/PostRow"


function UserCreateBlog() {
    const [allPosts , setallPosts] = React.useState([]);
    const [title , settitle] = React.useState('');
    const [content , setcontent] = React.useState('');
    const [image , setimage] = React.useState('');
    const [lastpostid , setLastPostId] = React.useState('');
    const [status , setStatus] = React.useState('');
    const creatername = localStorage.getItem('User_Firstname') + ' ' + localStorage.getItem('User_Lastname')
    const createrid = localStorage.getItem('User_Id')
    const createrimage = localStorage.getItem('User_Image')
    const creatertypename = localStorage.getItem('User_Role')
    const history = useHistory();

    const API_CONFIG = {
        AddNewPost : Base_Path + '/api/create-post',
        AddNewPostTag:Base_Path + '/api/AddNewPostTagByUser',
        getLastrecord : Base_Path + '/api/getlastrecordid',
        getAllPosts : Base_Path + '/api/posts',
    }


    useEffect(()=> {
      getPosts();
      handleBlogPost();
    },[status])

    const getPosts = async()=>{
      let postarr = []
      await fetch(API_CONFIG.getAllPosts,{
          method :"GET"
      }).then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.length > 0){
            data.map(post => {
             if(post.statusofpost === 'saved' && post.createrId == localStorage.getItem('User_Id')){
              console.log(post);
               postarr.push(post)
             }
            })
          }
        setallPosts(postarr);
      })
    }

    const AddNewPostTag = async(tag , postdata)=>{
      await fetch(API_CONFIG.AddNewPostTag , {
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
            tagname : tag,
            postid:postdata.postId,
            title:postdata.postTitle,
            content:postdata.postContent,
            image:postdata.postContentImage,
            id:postdata.createrId,
            createrimage:postdata.createrImage,
            name:postdata.createrName
        })
      }).then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
    }

    const handleBlogPost = async()=>{
      console.log(title , content , image)
      if(title !== '' && content !== '' && image !== ''){
        await fetch(API_CONFIG.AddNewPost , {
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
              posttitle : title,
              postcontent:content,
              postcontentimage:image,
              createrid:createrid,
              creatername:creatername,
              creatertypename:creatertypename,
              createrimage:createrimage,
              status:status === 'saved' ? "saved" : "active"
          })
        }).then(response => response.json())
        .then(async(data) => {
          console.log('Added New Post By User >> Success:', data);
          if(data){
            await fetch(API_CONFIG.getLastrecord , {
              method: 'GET', 
              mode: 'cors', 
              cache: 'no-cache', 
              credentials: 'same-origin',
              headers: {
                'Content-Type': 'application/json'
              },
              redirect: 'follow',
              referrerPolicy: 'no-referrer',
            }).then(response => response.json())
            .then(async(data) => {
              const lastpostdata = data[data.length - 1]
              console.log('last record :', lastpostdata)
              if(lastpostdata !== '' || lastpostdata !== null){
        var regexp = /#(\w+)/g;
        var match = regexp.exec(title);
        var tag = 0;
        while (match != null){
          console.log(match[1])
          await AddNewPostTag((match[1]), lastpostdata)
          tag = match[1]
          match = regexp.exec(title)
        }
              }
            if(status !== "saved"){
              settitle('')
              setcontent('')
              setimage('')
              history.push('/Home')
            }
            else{
              settitle('')
              setcontent('')
              setimage('')
              getPosts();
            }
            })
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
    }

    return (
        <>
          <UserHeader/>
          <div className='main-content'> 
           <Container>
               <Row>
                   <Col>
                   <label>Title</label>
                   <MDBInput label="Medium input" value={title} onChange={(e)=> settitle(e.target.value)} />
                   </Col>
               </Row>
               <Row>
                   <Col>
                   <label>Content</label>
                   <MDBInput type="textarea" label="Material textarea" rows="5" value={content} onChange={(e)=> setcontent(e.target.value)} />
                   </Col>
               </Row>
               <Row>
                   <Col>
                   <label>Post Your Image Here ...</label>
                   <MDBInput label="Medium input" value={image} onChange={(e)=> setimage(e.target.value)} />
                   </Col>
               </Row>
               <Row>
                   <Col>
                   <MDBBtn color="elegant" onClick={()=> setStatus('create')}>Publish</MDBBtn>
                   </Col>
                   <Col>
                   <MDBBtn color="blue-grey" onClick={()=>setStatus('saved')}>Save For Later</MDBBtn>
                   </Col>
               </Row>
           </Container>
           <Container className="saved-posts">
             <Row>
               <Col sm={12} lg={12} xl={12} xs={12}>
                 <h4>Saved Posts</h4>
               </Col>
             </Row>
             {
              allPosts.length !== 0 ? (
                allPosts.map((savedpost,index) => (
                  <Row key={index}>
                  <Col sm={12} lg={12} xl={12} xs={12}>
                   <PostRow getSavedPost={getPosts} postid = {savedpost.postId} postimage = {savedpost.postContentImage} posttitle = {savedpost.postTitle} postcreatedon={savedpost.createdDate}/>
                  </Col>
                </Row>
                 ))
              ) : 
              (
                <Row>
                  <Col sm={12} lg={12} xl={12} xs={12} style={{display:"flex",justifyContent : "center",alignItems:'center',height:'150px'}}>
                    <h5>No Post Is Saved Yet.</h5>
                  </Col>
                </Row>
              )
             }
           </Container>
        </div>
        </>
    )
}

export default UserCreateBlog;
