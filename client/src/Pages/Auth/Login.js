import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate, Link} from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import axios from "axios";
// import firebase from "firebase"


const createOrUpdate = async(authtoken) =>{
  return await axios.post(
    `http://localhost:5000/api/create-or-update-user`,
    {},
    {
      headers: {
         authtoken,
      },
    }
  );
}

function Login() {
  const dispatch = useDispatch();
  const history = useNavigate();

 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const roleBasedRedirect = async(res) => {
    if(res.data.role === 'admin'){
      history('/admin/dashboard')
    }else{
      history("/user/history")
    }
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      const { user } = result;
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
        roleBasedRedirect(res)
        // history("/");
      })
      .catch((err)=>{
        console.log(err)
      })
      
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
      signInWithPopup(auth,provider)
      .then(async (result) => {
        const { user } = result;
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
          roleBasedRedirect(res)
        });
        // .catch
        // history("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginform = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          autoFocus={true}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your Password"
          // autoFocus={true}
        />
      </div>
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length > 6}
      >
        Login With Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginform()}

          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login With Email
          </Button>
          <Link className="float-right text-danger" to="/forgot/password">Forgot Password</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
