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
import {auth} from './firebase';
import {useDispatch} from 'react-redux';

function App() {
const dispatch = useDispatch();

//to check the firebase auth state and
useEffect(()=>{
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if(user){
      const getIdTokenResult = await user.getIdTokenResult()
      console.log(user ,"user")
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: getIdTokenResult.token,
        },
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
      </Routes>
    </>
  );
}

export default App;
