import React, { useState } from "react";
import './login.css';
import {Link, useHistory} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import { getUser, setUserSession } from "../../utils/helper";

export const Login = () => {
  const history = useHistory();  
  const [error, setError] = useState({error:false, message: ''});
  if(getUser() != null){
    history.replace('/');
  }
    const [formValues, handleInputChange] = useForm({
      email : '',
      password : '',
  });
  const {email, password} = formValues;
  const handleFormSubmit = async (e)=>{
    e.preventDefault();
    if(!email || !password){
      setError({error: true, message: "llene todos los campos"});
    }else{
      try {
        const response = await axios.post(`http://localhost:3000/api/auth/login`,{
          "email": email,
          "password": password
      });
      setUserSession(response.data.token, response.data.user);
      history.replace('/');
      } catch (error) {
        if(error.response.status === 400){
          setError({error: true, message: "usuario o contraseña incorrectos"});
        }else{
          setError({error: true, message: "error en el servidor, intentelo mas tarde"});
        }
      }
    }
  }
  return ( 
    <div className="login-page">
      {
        error.error
        ? <Alert severity="error">{error.message}</Alert>
        : ''
      }
      <div className="form" onSubmit={handleFormSubmit}>
     
        <form className="login-form">
          <input 
            type="email" 
            placeholder="Email" 
            name="email"
            value={email}
            onChange={handleInputChange}
          />
          <input 
            type="password" 
            placeholder="Password" 
            name="password"
            value={password}
            onChange={handleInputChange}
          />
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