import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './Layout.jsx';
import App from './App.jsx'
import './index.css'
import ErrorPage from "./Components/ErrorPage.jsx";
import CartPage from "./Components/CartPage.jsx";
import DetailPage from "./Components/DetailPage.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/product/:id",
        element: <DetailPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
