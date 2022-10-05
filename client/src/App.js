import react,{useEffect} from 'react';
import {Routes,Route, browserHistory} from 'react-router-dom'
// import { hashHistory } from 'react-router;'
import Login from './Pages/Auth/Login'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Register from './Pages/Auth/Register'
import Home from './Pages/Home'
import Product from './Pages/Product'
import Header from './components/nav/Header'
import RegisterCompelete from './Pages/Auth/RegisterComplete'
import ForgotPassword from './Pages/Auth/FogoatPassword'
import History  from './Pages/users/History';
import Password from './Pages/users/Password';
import Whilist from './Pages/users/Whilist';
import AdminDashboard from "./Pages/admin/AdminDashboard";
import CategoryCreate from "./Pages/admin/category/CategoryCreate";
import CategoryUpdate from "./Pages/admin/category/CategoryUpdate";
import SubCreate from "./Pages/admin/sub/SubCreate";
import SubUpdate from "./Pages/admin/sub/SubUpdate";
import ProductCreate from "./Pages/admin/product/ProductCreate";
import AllProduct from "./Pages/admin/product/AllProduct";
import ProductUpdate from "./Pages/admin/product/ProductUpdate";


import UserRoute from './components/routes/UserRoute';
import AdminRoutes from "./components/routes/AdminRoutes";


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
        <Route element={<UserRoute />}>
          <Route exact path="/user/history/" element={<History />} />
          <Route exact path="/user/password/" element={<Password />} />
          <Route exact path="/user/wishlist/" element={<Whilist />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
          <Route exact path="/admin/category" element={<CategoryCreate />} />
          <Route exact path="/admin/sub" element={<SubCreate />} />
          <Route exact path="/admin/product" element={<ProductCreate />} />
          <Route exact path="/admin/products" element={<AllProduct />} />
          <Route exact path="/admin/products/:slug" element={<ProductUpdate />} />
          <Route
            exact
            path="/admin/sub/:slug"
            element={<SubUpdate />}
          />
         
          <Route
            exact
            path="/admin/category/:slug"
            element={<CategoryUpdate />}
          />
           <Route
            exact
            path="/product/:slug"
            element={<Product />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
