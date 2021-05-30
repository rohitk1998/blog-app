import React from 'react';
import {Container , Row , Col , Button} from 'react-bootstrap'
import { MDBInput,MDBBtn} from "mdbreact";
import ResponseBox from './ResponseBox';
import {Base_Path} from "../Authenctication/Base_Path"

function CommentBox({commentdetails}) {
    const [liked , setLiked] = React.useState(false);
    const [showresponses , setShowResponses] = React.useState(false);
    const [getResponse , setGetResponse] = React.useState(false);
    const [responsedata, setResponseData] = React.useState([]);
    const [responsetext , setResponseText] = React.useState('');
    const userid = localStorage.getItem('User_Id');
    const commentby = localStorage.getItem('User_Firstname') + ' ' + localStorage.getItem('User_Lastname');
    const image = localStorage.getItem('User_Image');


    const API_CONFIG = {
        GetAllResponseByCommentId : Base_Path + '/api/getallresponsesonUserComment',
        SaveNewReplyByUserOnPostComment:Base_Path + '/api/addresponsetocomment'
    }

    const handleAddResponseOnPostCommment = async(parentcommentid)=> {
        console.log("parentcommentid",parentcommentid)
        await fetch(API_CONFIG.SaveNewReplyByUserOnPostComment , {
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
              commentid : parentcommentid,
              userid:userid,
              userimage:image,
              username:commentby,
              responsetext:responsetext,
              responsetype:"reply_to_user_comment",
              status:"active"
            })
          }).then(response => response.json())
          .then(data => {
            console.log('Successfully saved new reply by user:', data);
            handleShowAllResponsesByComment(parentcommentid);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }

    const handleShowAllResponsesByComment = async(parentcommentid)=>{
        console.log(parentcommentid)
        await fetch(API_CONFIG.GetAllResponseByCommentId , {
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
              commentid : parentcommentid
            })
          }).then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            if(data[0].commentid === parentcommentid){
               if(showresponses === false ){
                setShowResponses(true)
                setResponseData(data)
               }
               else{
                setShowResponses(!true)
               }
               
            }
            setResponseText('')
            setGetResponse(false)
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }
    return (
        <div className="comment-box">
            <Container fluid>
                <Row>
                    <Col lg={10} sm={10} xl={10} className='comment-image-name'>
                       <img src={commentdetails.userimage} alt=''/>
                      <div className="comment-name-date">
                      <p>{commentdetails.username}</p>
                       <p>{commentdetails.commentcreatedon}</p>
                      </div>
                    </Col>
                    <Col lg={2} sm={2} xl={2} className="comment-report-button">
                    <Button className = "btn btn-light report-action"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
</svg></Button>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} sm={12} xl={12} className="comment-text">
                    <p>{commentdetails.commenttext}</p>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} sm={4} xl={4} className="comment-like-replies-row">
                    <Button  className = "btn btn-light comment-like-action">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class={liked === true ?  "bi bi-suit-heart liked":"bi bi-suit-heart notliked"} viewBox="0 0 16 16">
  <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
</svg>
</Button>
                    </Col>
                    <Col lg={4} sm={4} xl={4} className="comment-like-replies-row">
                    <Button onClick={()=> handleShowAllResponsesByComment(commentdetails.commentid)} className = "btn btn-light comment-replies-action" >
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
  <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
</svg>
</Button>
                    </Col >
                    <Col lg={4} sm={4} xl={4} >
                    <Button onClick={()=> setGetResponse(true)} className = "btn btn-light comment-replies-action" >
replies
</Button>
                    </Col>
                </Row>
              <Row>
              {
                    getResponse === true ? (
                      
                        <Col className="comment-response-container">
                        <MDBInput label="Material input" value={responsetext} onChange={(e)=> setResponseText(e.target.value)} />
                        <Button onClick={()=> setGetResponse(false)}>
                            cancel
                        </Button>
                        <Button onClick={()=> handleAddResponseOnPostCommment(commentdetails.commentid)}>
                            response
                        </Button>
                        </Col>
                    ) : ""
                }
              </Row>
               
                {
                    showresponses === true ? (
                       <Row>
                            <ResponseBox response={responsedata}/>
                       </Row>
                    ) : ""
                }
            </Container>
        </div>
    )
}

export default CommentBox
