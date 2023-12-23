
import logo from './logo.svg';
import  Counter  from './features/counter/Counter';
import './App.css';
import ProductList from './features/product/components/ProductList';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Home from './pages/Home';
import React from "react";
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
]);


function App() {
  // const dispatch = useDispatch();
  // const user = useSelector(selectLoggedInUser);

  // useEffect(()=>{
  //   if(user){
  //     dispatch(fetchItemsByUserIdAsync(user.id))
  //   }
  // },[dispatch, user])
  return (
    <div className="App">
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;
