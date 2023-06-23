import React, { useState } from "react";
import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register";

const AuthLayout = () => {
  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(false);

  const handleLogin = () => {
    setLogin(true);
    setRegister(false);
  };
  const handleRegister = () => {
    setLogin(false);
    setRegister(true);
  };

  return (
    <div>
      {login && <Login handleRegister={handleRegister} />}
      {register && <Register handleLogin={handleLogin} />}
    </div>
  );
};

export default AuthLayout;
