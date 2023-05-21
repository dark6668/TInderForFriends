
import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './page/login/login';
import Page1 from './page/1/page1';
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
const router = createBrowserRouter([



  {
    path: "",
    element: <Login />


  },  {
    path: "page1",
    element: <Page1 />


  }


])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);