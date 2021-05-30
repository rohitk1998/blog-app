import React from 'react';
import {Container , Row , Col , Form} from 'react-bootstrap'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBView, MDBIcon } from 'mdbreact';
import {Link} from "react-router-dom"

function Card({blog_post_content_image ,blog_post_id, blog_post_content , blog_post_created_date , blog_post_title, creatername , createimage}) {
    return (
       <Container fluid className='post-card'>
         <Row>
         <Col sm={12} xs={12} xl={4} lg={4} className='card-img'>
             <img src={blog_post_content_image}  alt='' />
             </Col>
             <Col className="card-content" sm={12} xs={12} xl={8} lg={8}>
                 <Container>
                     <Row>
                     <Col sm={12} className='post-creater' >
                      <Container>
                          <Row> 
                              <Col sm={12} xs={12} xl={1} lg={1}>
                              <img src={createimage}  alt='' />
                              </Col>
                              <Col sm={12} xs={12} xl={11} lg={11} className="creater-name">
                             <h6>{creatername}</h6>
                             <p>{blog_post_created_date}</p>
                              </Col>
                          </Row>
                      </Container>
                         </Col>
                         <Col sm={12} className='card-text' >
                         <Link to={{
                             pathname : '/Blog',
                             state:{post_id : blog_post_id}
                         }}>{blog_post_title}</Link>
                       </Col>
                         <Col sm={12} className='card-text'>
                         <p>{blog_post_content}</p>
                         </Col>
                     </Row>
                 </Container>
             </Col>
         </Row>
       </Container>
    )
}

export default Card
