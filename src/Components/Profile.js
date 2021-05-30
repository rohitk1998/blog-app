import React from 'react';
import {Container , Row , Col , Button} from 'react-bootstrap'

function Profile() {
    return (
        <div>
            <Container  className="user-profile">
                <Row>
                    <Col xl={6} className = "user-profile-container">
                    <img className="userprofilepic" src="https://images.unsplash.com/photo-1619738756213-5abf56e67355?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80" alt=''/>
                    </Col>
                    <Col xl={6}>
                    <Container  className="user-profile-details">
                <Row>
                    <Col xl={7} className='user-profile-detail-label'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
</svg>
                     <h6>Registered Date :</h6>
                    </Col>
                    <Col xl={5} className="user-profile-detail-value">
                   <h6>27 Apr 2021</h6>
                    </Col>
                </Row>
                <Row>
                    <Col xl={7} className='user-profile-detail-label'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
</svg>
                     <h6>Registered Date :</h6>
                    </Col>
                    <Col xl={5} className="user-profile-detail-value">
                   <h6>27 Apr 2021</h6>
                    </Col>
                </Row>
                <Row>
                    <Col xl={7} className='user-profile-detail-label'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
</svg>
                     <h6>Registered Date :</h6>
                    </Col>
                    <Col xl={5} className="user-profile-detail-value">
                   <h6>27 Apr 2021</h6>
                    </Col>
                </Row>
                <Row>
                    <Col xl={7} className='user-profile-detail-label'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
</svg>
                     <h6>Registered Date :</h6>
                    </Col>
                    <Col xl={5} className="user-profile-detail-value">
                   <h6>27 Apr 2021</h6>
                    </Col>
                </Row>
                <Row>
                    <Col xl={7} className='user-profile-detail-label'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
</svg>
                     <h6>Registered Date :</h6>
                    </Col>
                    <Col xl={5} className="user-profile-detail-value">
                   <h6>27 Apr 2021</h6>
                    </Col>
                </Row>
            </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Profile
