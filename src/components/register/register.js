import React, { useState } from "react";
import '../login/login.css';
import {Link, useHistory} from 'react-router-dom';
import { useForm } from "../../hooks/useForm";
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { getUser } from "../../utils/helper";
export const Register = () => {
  const history = useHistory();
  if(getUser() != null){
    history.replace('/');
  }
    const [error, setError] = useState({error:false, message: ''});
    const [register, setRegister] = useState(false);
    const [formValues, handleInputChange] = useForm({
        nombre : '',
        apellidos : '',
        email : '',
        password : '',
        confirmpassword : '',
    });
    const {nombre, apellidos, email, confirmpassword, password} = formValues;
    const handleInputSubmit = async (e) =>{
        e.preventDefault();
    
        if(!nombre || !apellidos || !email || !confirmpassword || !password){
          setError({error: true, message:"llene todos los campos"});
        } else if (password === confirmpassword) {
          try {
            await axios.post(`http://localhost:3000/api/auth/register`,{
              "nombre": nombre,
              "apellidos": apellidos,
              "email": email,
              "password": password,
              "confirmpassword": confirmpassword
          });
          setError({error: false, message: ''});
          setRegister(true);
          } catch (error) {
            console.log(error.response)
            if(error.response.status === 404){
            setError({error: true, message: "el email ya esta en uso"});
            setRegister(false);
            }else{
              setError({error: true, message: [error.response.data.message]});
              setRegister(false);
            }
          }
        } else {
          setError({error: true, message: "las contraseñas no coinciden"});
          setRegister(false);

        }     
    }
  return (
    <div className="login-page">
      {
        error.error
        ? <Alert severity="error">{error.message}</Alert>
        : ''
      }
      {
        register
        ? <Alert severity="success"> usuario registrado correctamente</Alert>
        : ''
      }
      <div className="form">
        <form className="register-form" onSubmit={handleInputSubmit}>
          <input 
           type="text"
           placeholder="nombre" 
           name="nombre"
           onChange={handleInputChange}
           value={nombre}
           />
          <input 
           type="text"
           placeholder="apellidos" 
           name="apellidos"
           onChange={handleInputChange}
           value={apellidos}
           />
          <input 
            type="email" 
            placeholder="email" 
            name="email" 
            onChange={handleInputChange}
            value={email}
            />
          <input 
            type="password" 
            placeholder="contraseña" 
            name="password" 
            onChange={handleInputChange}
            value={password}
            />
          <input 
            type="password" 
            placeholder="confirmar contraseña" 
            name="confirmpassword" 
            onChange={handleInputChange}
            value={confirmpassword}
            />


          <button>Crear</button>
          <p className="message">

            Ya estas registrado? <Link to="/login">Iniciar session</Link >
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;