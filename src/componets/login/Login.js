import React from "react";
import './login.css';
export const Login = () => {
  return (
    <div class="login-page">
      <div class="form">
     
        <form class="login-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Entrar</button>
          <p class="message">
            No estas registrado? <span>Crear cuenta</span>
          </p>
        </form> 
      </div>
    </div>
  );
};

export default Login;