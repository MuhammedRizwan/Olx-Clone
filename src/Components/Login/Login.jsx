import React, { useContext, useState } from "react";
import Logo from "../../olx-logo.png";
import "./Login.css";
import {FirebaseContext} from '../../Store/FirebaseContext' 
import { useNavigate } from "react-router-dom";
import { emailValidation, passwordValidation ,truncate} from "../../Validation/validation";
import swal from 'sweetalert'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors,setErrors]=useState({
    email:'',
    password:''
  })
  const {firebase}=useContext(FirebaseContext)
  const navigate= useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault()
    const emailError=emailValidation(email)
    const passwordError=passwordValidation(password)
    if(emailError||passwordError){
      setErrors({
        email:emailError,
        password:passwordError
      })
      return 
    }
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      swal("success!", "successfully Logged in!", "success");
      navigate('/')
    }).catch(err=>{
      swal(`${err.code}!`, `invalid email and password!`, "error");
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="80%" height="80%" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e) =>{
              setEmail(e.target.value)
              setErrors({...errors,email:emailValidation(e.target.value)})
            } 
          }
          style={{
            borderBottomColor: errors.email ? "red" : "black",
          }}
          />
            {errors.email && (
            <p className="errorMessage">{truncate(errors.email)}</p>
          )}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e) =>{
              setPassword(e.target.value)
              setErrors({...errors,password:passwordValidation(password)})
            } 
          }
          style={{borderBottomColor:errors.password?'red':'black'}}  
          />
          {errors.password && (<p className="errorMessage">{truncate(errors.password)}</p>)}
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{
           navigate('/signup')
        }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
