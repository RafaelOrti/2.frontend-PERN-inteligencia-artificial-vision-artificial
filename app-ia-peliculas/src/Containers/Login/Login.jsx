
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//REDUX...
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';


import './Login.css';

const Login = (props) => {

    let navigate = useNavigate();

    //1-Hooks (equivalen al estado en los componentes de clase)
    const [datosUsuario, setDatosUsuario] = useState({email: "", password: ""});
    const [msgError, setMsgError] = useState("");
    const [msgError2, setMsgError2] = useState("");



    //Funciones handlers
    const rellenarDatos = (e) => {
        //Funcion handler que setea los datos en el hook...[e.target.name] obtiene 
        //el nombre de la propiedad a cambiar, e.target.value tiene el valor..ambos
        //obtienen los datos del evento, que es el hecho de escribir en un input en concreto
        setDatosUsuario({...datosUsuario, [e.target.name]: e.target.value})
    };

    //Funciones locales

    const login = async () => {

        try {

            //Me invento las credenciales
            let body = {
                 email: datosUsuario.email,
                 password: datosUsuario.password
            }

            let resultado = await axios.post("http://localhost:3000/Usuarios/login",body);


            //Cambiamos el valor del hook credenciales, por lo tanto se recargará el componente
            // console.log(resultado)
            if(resultado.data === "Usuario o contraseña inválido"){
                setMsgError2("Usuario o contraseña inválido")
            }else{

                //Guardamos los datos en redux...


                // props.dispatch({type:LOGIN, payload: resultado.data});


                // setTimeout(()=>{
                //     navigate("/");
                // },1500);
                console.log(resultado.data)
            }


        } catch (error) {

            console.log(error)

        }

        
    };

    //2-Render (lo que pinta en pantalla)
         
        return(
            
            <div className='designLogin'>
                 {<pre>{JSON.stringify(datosUsuario, null,2)}</pre>}
                <div className="designFormulario">
                    <input type="email" name="email" id="email" title="email" placeholder="Correo Electrónico" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/>
                    <input type="password" name="password" id="password" title="password" placeholder="Contraseña" autoComplete="off" onChange={(e)=>{rellenarDatos(e);}}/>
                    {msgError}
                    {msgError2}
                </div>
                <div className="loginButton espacio" onClick={()=>login()}>LOG ME!</div>
            </div>
        );

};


export default connect()(Login);