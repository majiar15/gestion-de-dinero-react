import React from "react";
import './login.css';
import {Link} from 'react-router-dom';
export const Login = () => {
  return (
    <div className="login-page">
      <div className="form">
     
        <form className="login-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Entrar</button>
          <p className="message">
            No estas registrado? <Link to="/register">Crear cuenta</Link>
            
          </p>
        </form> 
      </div>
    </div>
  );
};

export default Login;