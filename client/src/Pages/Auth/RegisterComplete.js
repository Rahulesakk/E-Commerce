import React,{useState,useEffect} from 'react'
import {auth} from '../../firebase'
import { signInWithEmailLink,updatePassword } from "firebase/auth";
import {  toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const createOrUpdate = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};


function RegisterComplete(props) {
    console.log(props, "historyhistory")
    // let history = useHistory()
    const history = useNavigate();
     const dispatch = useDispatch();
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  useEffect(()=>{
    setEmail(window.localStorage.getItem('emailForSignIn'));
    console.log(window.localStorage.getItem('emailForSignIn'))
  },[])
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!email || !password){
        toast.error('Eamil and Password required');
        return
    }
    if(password.length<6){
        toast.error("password must be attleat 6 character long");
        return
    }
    try{
        const result = await signInWithEmailLink(auth,email,window.location.href);
        console.log(result);
        if(result.user.emailVerified){
            window.localStorage.removeItem('emailForSignIn');
            //update the password 
            let user = auth.currentUser
            await updatePassword(user,password);
            const getIdTokenResult = await user.getIdTokenResult();
            createOrUpdate(getIdTokenResult.token)
            .then((res)=>{
              dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  name:res.data.name,
                  email: res.data.email,
                  token: getIdTokenResult.token,
                  role:res.data.role,
                  _id: res.data._id,
                },
              });
            });

            // history.push("/");
            history("/")

        }
    }
    
    catch(err){
        console.log(err)
        toast.error(err.message);
    }
  }

  const registerform = () => <form onSubmit={handleSubmit}>
    <input type="email" className="form-control" value={email} disabled />
      <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} autoFocus />
      <br/>
    <button type="submit" className="btn btn-raised ">Register</button>
  </form>

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerform()}
        </div>

      </div>
        
    </div>
  )
}

export default RegisterComplete