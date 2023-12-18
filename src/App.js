
import logo from './logo.svg';
import  Counter  from './features/counter/Counter';
import './App.css';
import ProductList from './features/product-list/ProductList';
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


const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home></Home>),
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
    element: (<CartPage></CartPage>),
  },
]);


function App() {
  return (
    <div className="App">
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;
