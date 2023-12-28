
import logo from './logo.svg';
import  Counter  from './features/counter/Counter';
import './App.css';
import ProductList from './features/product/components/ProductList';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Home from './pages/Home';
import React, { useEffect } from "react";
import {createRoot} from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link
} from "react-router-dom";
import "./index.css";
import CartPage from './pages/CartPage';
import CheckOutPage from './pages/CheckOutPage';

import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccess from './pages/OrderSuccess';
import UserOrders from './features/user/components/UserOrders';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfile from './features/user/components/UserProfile';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUser } from './features/user/userApi';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <Home></Home>
      </Protected>,
  },
  {
    path: "/login",
    element: (<LoginPage></LoginPage>),
  },
  {
    path: "/signup",
    element: (<SignUpPage></SignUpPage>),
  },
  {
    path: "/cart",
    element: <Protected>
      <CartPage></CartPage>
      </Protected>,
  },
  {
    path: "/checkout",
    element: (<Protected><CheckOutPage></CheckOutPage></Protected>),
  },
  {
    path: "/product-detail/:id",
    element: (<Protected><ProductDetailPage></ProductDetailPage></Protected>),
  },
  {
    path: "/order-success/:id",
    element: (<OrderSuccess></OrderSuccess>),
  },
  {
    path: "/orders",
    element: (<UserOrdersPage></UserOrdersPage>),
  },
  {
    path: "/profile",
    element: (<UserProfilePage></UserProfilePage>),
  },
  {
    path: "/logout",
    element: (<Logout></Logout>),
  },
  {
    path: "/forgotpassword",
    element: (<ForgotPasswordPage></ForgotPasswordPage>),
  },
  {
    path: "*",
    element: (<PageNotFound></PageNotFound>),
  }
]);


function App() {
  // const dispatch = useDispatch();
  // const user = useSelector(selectLoggedInUser);

  // useEffect(()=>{
  //   if(user){
  //     dispatch(fetchItemsByUserIdAsync(user.id))
  //   }
  // },[dispatch, user])

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)
  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }  
  },[dispatch,user])
  return (
    <div className="App">
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;
