import { Outlet } from "react-router-dom";
import Header from './Components/Header.jsx';
import Footer from "./Components/Footer.jsx";
import { useState } from "react";

const Layout = () => {
  const [productCount, setProductCount] = useState(sessionStorage.length)
  return (
  <>
    <Header count={productCount} />
    <Outlet context={setProductCount} />
    <Footer />
  </>
)
}

export default Layout