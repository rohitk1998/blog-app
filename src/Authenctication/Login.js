import React , {useState , useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {Base_Path} from "./Base_Path";

function Login() {
    const history = useHistory();
    const [email, setemail] = useState('rohit@gmail.com');
    const [password, setpassword] = useState('1234@AdminPayroll');  //1234@AdminPayroll
    const [stringValidate1 , setstringValidate1] = useState('');
    const [emailValidate4 , setemailValidate4] = useState('');
    const [userData , setUserData] = useState();
    const user_role = localStorage.getItem('User_Role');
    const API_CONFIG = {
        user_login : Base_Path + '/api/loginUser'
     }


    useEffect(()=> {
          console.log("Hello Login Please......");
          if(user_role !== null){
            history.push('/Home')
          }
          else {
            history.push('/Login');
          }
    },[])

    const handleEmailInput4 = ()=> {
        const regex = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
        const found = email.match(regex);
        console.log(found);
        if(email.length === 0){
            setemailValidate4('Email is required.')  
        }
        else if(email.length > 0){
            if(found !== null){
                setemailValidate4('Email is Valid')
            }
            else {
                setemailValidate4('Email is not Valid')
            }
        }
    }

    const handleStringInput1 = ()=> {
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
       console.log(password);
       if(password.length === 0){
        setstringValidate1('Password is required.')
       }
       else if(password.length >= 0){
          const match = password.match(strongRegex);
          console.log(match);
          if(match === null){
            setstringValidate1('Password is not valid.')
          }
          else if (match !== null){
            setstringValidate1('Password is valid.')
          }
       }
    }
    const HANDLE_USER_LOGIN = async()=>{
    
        await fetch(API_CONFIG.user_login, {
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
            email: email,
            password:password
          })
        }).then(res => res.json())
        .then(data => {
          console.log(data);
         if(data.length === 0){
          console.log("Invalid Email or Password !! ")
         }
        else if(data.length !== 0){
          data.map(user => {
            setUserData(user);
            console.log(user);
            localStorage.setItem('User_Role' , user.role)
            localStorage.setItem('User_Image' , user.image)
            localStorage.setItem('User_Firstname' , user.firstname)
            localStorage.setItem('User_Lastname', user.lastname)
            localStorage.setItem('User_Id' , user.userid)
                if(user.role === 'admin'){
              history.push('/AdminHome')
            }
            else if (user.role === 'user'){
              history.push('/Home');
            }
         })
        }

        })
      }
    return (
      <>

        <div className="login">
        <div className="login_container">
        <div className="image_container">
          <img  alt="" src="https://images.unsplash.com/photo-1546177461-68622f53ed0e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80" />
        </div>
        <div className="form_container">

              <div className={emailValidate4 === 'Email is not Valid' || emailValidate4 === 'Email is required.'  ? 'form-group-not-valid' : emailValidate4 === 'Email is Valid' ? 'form-group-valid' : 'form-group'}>
              <label>
              Email
             </label>
             <input type="text" value={email} onChange={(e)=> setemail(e.target.value)}  onBlur={handleEmailInput4}/>
             {
   emailValidate4 === 'Input is valid.' ?
    <p>{emailValidate4}</p> 
    : 
    emailValidate4 === 'Input is not valid.' 
    ? 
    <p>{emailValidate4}</p>
     :
   <p>{emailValidate4}</p>
}
              </div>
              <div className={stringValidate1 === 'Password is not valid.' || stringValidate1 === 'Password is required.'  ? 'form-group-not-valid' : stringValidate1 === 'Password is valid.' ? 'form-group-valid' : 'form-group'}>
  
              <label>
              Password
             </label>
             <input type="password" value={password} onChange={(e)=> setpassword(e.target.value)} onBlur={handleStringInput1} />
             {
   stringValidate1 === 'Password is valid.' ?
    <p>{stringValidate1}</p> 
    : 
    stringValidate1 === 'Password is not valid.' 
    ? 
    <p>{stringValidate1}</p>
     :
   <p>{stringValidate1}</p>
}    
              </div>
              <div > 
              </div>
              <button  name="submit" onClick={HANDLE_USER_LOGIN} >  
                Login
              </button> 
        </div>
        </div>
      </div> 
      </>
    )
}

export default Login

