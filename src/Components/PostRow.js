import React , {useState} from 'react';
import { MDBInput } from "mdbreact";
import { MDBBtn } from "mdbreact";
import {Container , Row , Col , Form} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { Base_Path } from '../Authenctication/Base_Path';
import { Modal, Button } from 'antd';

function PostRow(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const API_CONFIG = {
        updatestatusofPost : Base_Path + '/api/updatepoststatus'
    }

    const handlePostPublished = async()=> {
        await fetch(API_CONFIG.updatestatusofPost , {
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
                postId:props.postid,
                status : "active"
            })
          }).then(response => response.json())
          .then(data => {
              console.log("response :" , data)
              props.getSavedPost()
          })
    }
    const handlePostRemoved = async()=> {
        await fetch(API_CONFIG.updatestatusofPost , {
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
                postId:props.postid,
                status : "removed"
            })
          }).then(response => response.json())
          .then(data => {
              console.log("response :" , data)
              props.getSavedPost()
          })
    }

    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
    return (
        <div className="saved-post-card">
           <Container fluid>
               <Row>
                   <Col xl={3} lg={3} sm={3} xs={3} className="post-row-image">
                   <img src={props.postimage}/>
                   </Col>
                   <Col xl={5} lg={5} sm={5} xs={5} className="post-row-title">
                   <h6>{props.posttitle}</h6>
                   </Col>
                   <Col xl={4} lg={4} sm={4} xs={4}>
                  <Container fluid>
                  <Row className="post-row-button">
                       <Col xl={6} lg={6} sm={6} xs={6}>
                       <MDBBtn color="elegant" onClick={handlePostPublished}>Publish</MDBBtn>
                       </Col>
                       <Col xl={6} lg={6} sm={6} xs={6}>
                       <MDBBtn color="elegant" onClick={showModal}>Remove</MDBBtn>
                       </Col>
                   </Row>
                  </Container>
                   </Col>
               </Row>
           </Container>
           <Modal title="Post Remove" visible={isModalVisible} onOk={handlePostRemoved} onCancel={handleCancel}>
        <p>This post will get permanentely removed from your saved posts.</p>
      </Modal>
        </div>
    )
}

export default PostRow
