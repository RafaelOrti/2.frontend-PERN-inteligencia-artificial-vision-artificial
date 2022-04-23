
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { NOT_HOME } from "../../redux/actions";
import { raiz } from '../../utiles';
import { MODIFY_CREDENTIALS } from '../../redux/actions';
import axios from 'axios';

import "./Profile.css";
import Footer from '../../Components/Footer/Footer';

const Profile = (props) => {

    let navigate = useNavigate();
    const [res, setRes] = useState("");

    useEffect(() => {
        console.log('Created')
        props.dispatch({ type: NOT_HOME })
    }, [])


    //Hooks
    const [datosUsuario, setDatosUsuario] = useState({
        nombre: props.credentials.usuario.nombre, apellido: props.credentials.usuario.apellido, edad: props.credentials.usuario.edad, email: props.credentials.usuario.email,
        nickname: props.credentials.usuario.nickname, password: props.credentials.usuario.password
    });

    //Handler (manejador)
    const rellenarDatos = (e) => {
        //para cambiar el hook
        setDatosUsuario({
            ...datosUsuario,
            [e.target.name]: e.target.value
        })
        //para cambiar el redux
        props.dispatch({ type: MODIFY_CREDENTIALS, payload: { field: e.target.name, field_value: e.target.value } })
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
            edad: parseInt(datosUsuario.edad),
            nickname: datosUsuario.nickname,
            password: datosUsuario.password

        }

        let config = {
            headers: { Authorization: `Bearer ${props.credentials.token}` }
        };

        try {
            //Hacemos el update en la base de datos
            let resultado = await axios.put(raiz + `usuarios/actualizar/perfilId/${props.credentials.usuario.id}`, body, config);
            setTimeout(() => {
                setRes(resultado.data);
            }, 2);
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
                <div className="profileField"><b>Nickname:</b><input type="text" name="nickname" id="nickname" title="nickname" placeholder={props.credentials.usuario.nickname} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                </div>
                <div className="profileField"><b>Edad:</b><input type="text" name="edad" id="edad" title="edad" placeholder={props.credentials.usuario.edad} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                </div>

                <div className="profileField"><b>Password:</b><input type="text" name="password" id="password" title="password" placeholder="*****" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                </div>
                <div className="profileFieldButton">
                    <div className="button type3 espacio" onClick={() => updateUser()}>Actualiza</div>
                </div>
                <div className="profileFieldButtonMessage">
                    <div className="bottomCardAdminRegPelSub">{res}</div>
                </div>
            </div>
        </div>
    )

}

export default connect((state) => ({
    credentials: state.credentials
}))(Profile);