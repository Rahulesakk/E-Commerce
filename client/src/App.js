import react,{useEffect} from 'react';
import {Routes,Route, browserHistory} from 'react-router-dom'
// import { hashHistory } from 'react-router;'
import Login from './Pages/Auth/Login'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Register from './Pages/Auth/Register'
import Home from './Pages/Home'
import Header from './components/nav/Header'
import RegisterCompelete from './Pages/Auth/RegisterComplete'
import ForgotPassword from './Pages/Auth/FogoatPassword'
import History  from './Pages/users/History';
import UserRoute from './components/routes/UserRoute';

import {auth} from './firebase';
import {useDispatch} from 'react-redux';
import {currentUser} from "./functions/auuth"

function App() {
const dispatch = useDispatch();


//to check the firebase auth state and
useEffect(()=>{
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if(user){
      const getIdTokenResult = await user.getIdTokenResult()
      console.log(user ,"user")
      currentUser(getIdTokenResult.token)
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
    }
  })
  return  () => unsubscribe();
},[])

  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/register/complete"
          element={<RegisterCompelete />}
        />
        <Route exact path="/forgot/password" element={<ForgotPassword />} />
        <Route exact path="/user/history/*" element={<UserRoute />} />
      </Routes>
    </>
  );
}

export default App;
