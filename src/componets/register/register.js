import React from "react";
import '../login/login.css';
export const Register = () => {
  return (
    <div class="login-page">
      <div class="form">
        <form class="register-form">
          <input type="text" placeholder="name" />
          <input type="password" placeholder="password" />
          <input type="text" placeholder="email address" />
          <button>Crear</button>
          <p class="message">

            Ya estas registrado? <span>Iniciar session</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;