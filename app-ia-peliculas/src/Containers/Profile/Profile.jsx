
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {MODIFY_CREDENTIALS} from '../../redux/types';
import axios from 'axios';

import "./Profile.css";

const Profile = (props) => {

    let navigate = useNavigate();

    //Hooks
    const [datosUsuario, setDatosUsuario] = useState({
        nombre: props.credentials.usuario.nombre, apellido: props.credentials.usuario.apellido, edad: props.credentials.usuario.edad, email: props.credentials.usuario.email, 
        dni: props.credentials.usuario.dni,  telefono: props.credentials.usuario.telefono, 
        numCuenta: props.credentials.usuario.numCuenta
    });

    //Handler (manejador)
    const rellenarDatos = (e) => {
        setDatosUsuario({...datosUsuario, 
            [e.target.name]: e.target.value})
    };

    useEffect(() => {
        if (props.credentials.token === '') {
            navigate("/");
        }
    })

    const updateUser = async () => {

        let body = {
            nombre: datosUsuario.nombre,
            apellido: datosUsuario.apellido,
            email: datosUsuario.email,
            telefono: parseInt(datosUsuario.telefono),
            numCuenta: datosUsuario.numCuenta
        }

        let config = {
            headers: { Authorization: `Bearer ${props.credentials.token}` }
        };

        try {
            //Hacemos el update en la base de datos
            let res = await axios.put(`https://movie-db-geekshubs.herokuapp.com/usuarios/${props.credentials.usuario.id}`,body, config);

            
            
            
            if(res){
                //Guardamos en redux
                props.dispatch({type:MODIFY_CREDENTIALS, payload: datosUsuario});
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="designProfile">
            <div className="designProfileHalf profileLeft">
                <div className="profileField"><b>Nombre:<input type="text" name="nombre" id="nombre" title="nombre" placeholder={props.credentials.usuario.nombre} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                </b></div>
                <div className="profileField"><b>Apellidos:</b><input type="text" name="apellido" id="apellido" title="apellido" placeholder={props.credentials.usuario.apellido} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                </div>
                <div className="profileField"><b>Email:</b><input type="email" name="email" id="email" title="email" placeholder={props.credentials.usuario.email} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} /></div>
                <div className="profileField"><b>Teléfono:</b><input type="text" name="telefono" id="telefono" title="telefono" placeholder={props.credentials.usuario.telefono} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                </div>
                <div className="profileField"><b>N. cuenta:</b><input type="text" name="numCuenta" id="numCuenta" title="numCuenta" placeholder={props.credentials.usuario.numCuenta} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                </div>
            </div>
            <div className="designProfileHalf profileRight">
                <div className="updateBoton" onClick={()=>updateUser()}>Update</div>  
             
            </div>
        </div>
    )


}

export default connect((state) => ({
    credentials: state.credentials
}))(Profile);