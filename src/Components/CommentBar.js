import React from 'react';
import {Container , Row , Col , Button} from 'react-bootstrap'
import { MDBInput,MDBBtn} from "mdbreact";
import {Base_Path} from "../Authenctication/Base_Path";
import CommentBox from "../Components/CommentBox"


function CommentBar({SidebarClose,postid}) {
    const [commenttext , setCommentText] = React.useState('');
    const [comments,setCommetns] = React.useState([]);
    const [totalcomments , setTotalComments] = React.useState();
    const userid = localStorage.getItem('User_Id');
    const commentby = localStorage.getItem('User_Firstname') + ' ' + localStorage.getItem('User_Lastname');
    const image = localStorage.getItem('User_Image');

    const API_CONFIG = {
        getAllCommentsByPostId: Base_Path + '/api/getAllComments',
        addNewComentByUserId:Base_Path +  '/api/addNewComment'
        
    }

    React.useEffect(()=>{
        getAllCommentsByPostId();
    },[])
    const addNewCommentByUserId = async()=>{
      console.log(commenttext)
      try{
        if(commenttext !== ''){
         await fetch(API_CONFIG.addNewComentByUserId , {
             method: 'POST', // *GET, POST, PUT, DELETE, etc.
             mode: 'cors', // no-cors, *cors, same-origin
             cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
             credentials: 'same-origin', // include, *same-origin, omit
             headers: {
               'Content-Type': 'application/json'
               // 'Content-Type': 'application/x-www-form-urlencoded',
             },
             redirect: 'follow', // manual, *follow, error
             referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
             body: JSON.stringify({
                postId : postid,
                userid:Number(userid),
                username:commentby,
                userimage:image,
                commenttext:commenttext,
                status:'active'
             })
           }).then(response => response.json())
           .then(data => {
             console.log('Success:', data);
             getAllCommentsByPostId();
             setCommentText('');
           })
           .catch((error) => {
             console.error('Error:', error);
           });
        }
        else{
            console.log("Please write down something to post comment !!")
        }
    }
    catch(error){
        console.log(error);
    }
    }
    const getAllCommentsByPostId = async(req,res)=>{
        await fetch(API_CONFIG.getAllCommentsByPostId , {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
               postId : postid,
            }) // body data type must match "Content-Type" header
          }).then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            console.log("total length of comments per post :" , data.length)
            setTotalComments(data.length)
            setCommetns(data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }

    const handleSidebarClose = ()=> {
        SidebarClose();
    }
    const handleUserCommentOnPost = (e)=> {
        setCommentText(e.target.value)
        console.log(e.target.value)
    }
    return (
        <div className="comment-bar">
           <Container>
               <Row className="commet-count-close-container">
                   <Col lg={6} sm={6}>
                   <h5>Responses({totalcomments})</h5>
                   </Col>
                   <Col  lg={6} sm={6}>
                 <Button className="btn btn-dark" onClick={handleSidebarClose}>
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg></Button>
                   </Col>
               </Row>
               <hr/>
               <Row className="comment-text-input">
                   <Col className="comment-text-input-col">
                   <MDBInput label="Material input" value={commenttext} onChange={(e)=> handleUserCommentOnPost(e)} />
                   <Button onClick={addNewCommentByUserId}>
                       Post
                   </Button>
                   </Col>
               </Row>
               {
                   comments && comments.map((comment , index)=>(
                      <CommentBox commentdetails={comment} key={index} />
                   ))
               }
               <hr/>
           </Container>
        </div>
    )
}

export default CommentBar
