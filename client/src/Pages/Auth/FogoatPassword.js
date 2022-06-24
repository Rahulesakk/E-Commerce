import React, {useState,useEffect} from 'react'
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function FogoatPassword() {
    const history = useNavigate()
    // const selector = useSelector();
    const[email,setEmail] = useState("")
    const[loading,setLoading] = useState(false)
    const {user} =  useSelector((state)=>({...state}))
     useEffect(()=>{
        if(user && user.token) history("/");
    },[user])
    const config = {
      url: process.env.REACT_APP_FORGOAT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };

    const  handleSubmit  = async (e) => {
        e.preventDefault();
        setLoading(true);
        await sendPasswordResetEmail(auth,email,config)
        .then(() => {
            setEmail('');
            setLoading(false);
            toast.success("Check your Email for reset  Password")
        })
        .catch((err) => {
            setLoading(false)
            console.log("Error",err)
            toast.error(err.message)
        })
        
    }
    const forgotPassword = () => {
       
    };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 ">
          {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Fogoat Password</h4>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus={true}
            />
            <br />
            <button className="btn btn-primary" disabled={!email}>Submit</button>
          </form>
          {/* {forgoatFrom()} */}
        </div>
      </div>
    </div>
  );
}

export default FogoatPassword