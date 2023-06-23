import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { isLoggedIn,dispatch } = useContext(AuthContext);

  const logout = ()=>{
    dispatch({ type: "SIGNOUT" });
  }

  return (
    <>
      <nav class="navbar bg-primary navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            User Management
          </a>

          {isLoggedIn && (
            <div className="d-flex">
              {" "}
              <Link className="nav-link me-2" to={"/profile"}>Profile</Link>{" "}
              <div className="cursor_pointer nav-link me-2" onClick={logout}>Logout</div>
            </div>
          )}

        </div>
      </nav>
    </>
  );
};

export default Header;
