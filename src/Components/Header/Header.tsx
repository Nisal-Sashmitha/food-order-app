import React, { useContext } from "react";
import classes from "./Header.module.css";
import headerBackgroundImage from "./../../assests/headerBackgroundImage.jpg";
import HeaderCartButton from "./HeaderCartButton";
import { Link } from "react-router-dom";
import AuthContext from "../../Store/AuthContext";



const Header: React.FC<{onShowCart:()=>void}> = (props)=> {
  const authCtx = useContext(AuthContext);
  
  const isLoggedIn = authCtx.isLoggedIn;
  const logoutHandler = ()=> authCtx.logout();


 

  return (
    <header
      className={classes.header_background}
      style={{ backgroundImage: `url(${headerBackgroundImage})` }}
    >
      <nav className={classes.navbar}>
        <HeaderCartButton onClick={props.onShowCart} />
        {isLoggedIn && (
          <div onClick={logoutHandler} className={classes.loginbtn}>
            LogOut
          </div>
        )}
        {!isLoggedIn && (
          <Link to="/login" className={classes.loginbtn}>
            LogIn
          </Link>
        )}
      </nav>
      <div className={classes.header_fade} />
    </header>
  );
}

export default Header;
