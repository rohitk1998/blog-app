import React , {useEffect} from 'react';
import UserHeader from "./UserHeader";
import { MDBInput,MDBBtn} from "mdbreact";
import {Container , Row , Col , Button} from 'react-bootstrap'
import {Base_Path} from "../../Authenctication/Base_Path";
import CommentBar from "../../Components/CommentBar";

function UserBlogView(props) {
   const [post , setpost] = React.useState([]);
   const [liked , setLiked] = React.useState(false);
   const [likes , setLikes] = React.useState('');
   const [sidebarOpen,onSideBarOpen] = React.useState(false);
   const [addcomment , setaddComment] = React.useState(false);
   const [postitle , setPostTitle] = React.useState('');
   const [posthashtags,setPostHashTags] = React.useState();
    const postid = props.location.state.post_id ;
    console.log(postid);
    const userid = localStorage.getItem('User_Id')
    const API_CONFIG = {
      getAllPosts : Base_Path + '/api/getpostdata',
      getAllLikesByPost : Base_Path + '/api/getLikesbyPost',
      AddLikeByUser : Base_Path + '/api/liked',
      deleteLikeByUser:Base_Path + '/api/deltelike'
  }


  React.useEffect(()=> {
     getPost();
     getLikes();
},[])

  const handleCommentSiderBar  =async()=>{
    if(sidebarOpen === false){
      onSideBarOpen(true)
      console.log("open function from parent compoent")
    }
    else {
      onSideBarOpen(false)
      console.log("Close function from child component")
    }
  }

    const getLikes = async()=>{
      await fetch(API_CONFIG.getAllLikesByPost , {
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
           postId : postid
        }) // body data type must match "Content-Type" header
      }).then(response => response.json())
      .then(data => {
        console.log('All the Likes on Perticular post :', data);
        if(data.recordset.length !== 0){
          if(data.recordset[0].userid === Number(userid)){
            setLiked(true);
          }
        }
        setLikes(data.recordset.length)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

    const getPost =async()=>{
      await fetch(API_CONFIG.getAllPosts , {
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
            postId : postid
         })
       }).then(response => response.json())
       .then(async(data) => {
         console.log('Success:', data);
         setpost(data)
         await gettags(data.recordset[0].postTitle)
       })
       .catch((error) => {
         console.error('Error:', error);
       });
    }

    const gettags = (posttitle)=>{
      console.log("posttitle >>>>>",posttitle)
      var regexp = /#(\w+)/g;
      var match = regexp.exec(posttitle);
      var tag = [];
      var title2 = posttitle
      while (match != null){
        tag.push(match[1])
        match = regexp.exec(posttitle)
      }
      console.log("array of values having hashtags",tag)
      setPostHashTags(tag)
      for(var i = 0 ; i < tag.length ; i++){
        console.log("running !!!")
        var title = title2.replace(`#${tag[i]}`,'')
        console.log(" var title = title2.replace(`#${tag[0]}`,'')",title);
        var title2 = title ; 
        console.log(" title2 = title1 ; ",title2);
        setPostTitle(title2);
      }
    }

    const handlePostLikes = ()=>{
      if(liked === false){
         setLiked(true);
      
         checkLike(true);
      }
      else if(liked === true){
         setLiked(false)
        
         checkLike(false)
      }
    }

    const checkLike = (value)=>{
           if(value === true){
             postLike();
           }
           else{
             removeLike();
           }
    }

    const postLike =async()=> {
      console.log(`liked by user ${userid}`)
      await fetch(API_CONFIG.AddLikeByUser , {
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
           userid:userid
        }) // body data type must match "Content-Type" header
      }).then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        getLikes();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }


    const removeLike =async()=>{
      console.log(`post disliked by user ${userid}`)
      await fetch(API_CONFIG.deleteLikeByUser , {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
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
           userid:userid
        })
      }).then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        getLikes();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }


    
    return (
       <>
       <UserHeader/>
        <div className='main-content'>
          {
             post.map((post , index)=> (
                <Container key={index} className="blog-view">
                  <h3>{postitle}<a style={{color:"blue"}}>{posthashtags && posthashtags.map((tag,index)=> ('#'+tag))}</a></h3>
                  <img src={post.postContentImage} />
                  <p>{post.postContent}</p>
                </Container>
             ))
           
          }
          <Container  className="blog-actions" >
          <Button className = "btn btn-light like-action" onClick={handlePostLikes}>
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className={liked === true ?  "bi bi-suit-heart liked":"bi bi-suit-heart notliked"} viewBox="0 0 16 16">
  <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
</svg>
<h6>{likes} likes</h6>
</Button>

<Button className = "btn btn-light comment-action" onClick={handleCommentSiderBar}>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
  <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
</svg>
<h6>Comments</h6>
</Button>
</Container>
      </div>
      {
  sidebarOpen === true ? (
    <div className="sidebar-comment-section sticky">
    <CommentBar postid={postid} SidebarClose = {handleCommentSiderBar}/>
</div>
  ) : ''
}
       </>
    )
}

export default UserBlogView;
