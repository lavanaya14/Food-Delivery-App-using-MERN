import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../assets/assets";
import { Link } from 'react-router-dom';
import { StoreContext } from "../context/StoreContext";

const  Navbar = ({setShowLogin}) => {

    const [menu, setmenu] = useState("Menu")

    const { getTotalCartAmount } = useContext(StoreContext)
  return (
    <div className="navbar">
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setmenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
        <a href='#explore-menu'onClick={()=>setmenu("Menu")} className={menu==="Menu"?"active":""}>Menu</a>
        <a href='#app-download'onClick={()=>setmenu("Mobile-app")} className={menu==="Mobile-app"?"active":""}>Mobile-app</a>
        <a href='#footer'onClick={()=>setmenu("Contact-us")} className={menu==="Contact-us"?"active":""}>Contact-us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        <button onClick={()=>setShowLogin(true)}>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
