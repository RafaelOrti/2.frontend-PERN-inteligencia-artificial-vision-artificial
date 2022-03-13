
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGOUT, MOVIES_TITLE } from '../../redux/types';
import { connect } from 'react-redux';
import axios from 'axios';
import 'antd/dist/antd.css';
import {
    Input,
    Button
} from 'antd';

import './Header.css';

const Header = (props) => {
    console.log(window.location.pathname)

    let navigate = useNavigate();

    const [titulo, setTitulo] = useState("");

    useEffect(() => {
        // console.log("props.credentials");
        // console.log(props.credentials);
    })

    const navegar = (lugar) => {

        setTimeout(() => {
            navigate(lugar);
        }, 200);

    }

    const logOut = () => {
        //Borrar de RDX las credenciales
        props.dispatch({ type: LOGOUT });

        setTimeout(() => {
            navigate("/");
        }, 1500);
    }

    const manejador = (ev) => {
        setTitulo(ev.target.value);
    }
    // {
    //     window.location.pathname === "/add" &&
    //     <div className="link" onClick={() => navegar("/film")}>Film</div>
    // }
    const busquedaPorTitulo = async () => {
    
        //Axios que trae resultados....
        // window.location.pathname === "/add" &&
        // <div className="link" onClick={() => navegar("/film")}>Film</div>
        try {
            let resultados = await axios.get(`https://videostore-backend.herokuapp.com/films/custom?arg=${titulo}`);

            //Guardo en redux los resultados de las películas

            props.dispatch({type: MOVIES_TITLE, payload: resultados.data});

            setTimeout(()=>{
                navigate("/searchresults");
            },500);


        } catch (error) {
            console.log(error);
        }
    }
    console.log(window.location.pathname);
    if (!props.credentials?.token) {
        return (
            <div className='designHeader'>
                <div className="headerSpace linksDesign">
                </div>
                <div className="headerSpace searchDesign">
                </div>
                <div className="headerSpace linksDesign">
                    <div className="link" onClick={() => navegar("/login")}>Login</div>
                    <div className="link" onClick={() => navegar("/register")}>Registro</div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='designHeader'>
                <div className="headerSpace linksDesign">
                    {
                         window.location.pathname === "/film" &&
                         <div className="link" onClick={() => navegar("/add")}>Add</div>
                    }
                    {
                         window.location.pathname === "/add" &&
                         <div className="link" onClick={() => navegar("/film")}>Film</div>
                    }
                </div>
                <div className="headerSpace searchDesign">
                    {
                    (window.location.pathname === "/film" || window.location.pathname === "/add") &&
                    <Input.Group compact>
                        <Input style={{ width: 'calc(100% - 200px)' }} placeholder="Busca una película por título" onChange={(ev)=>manejador(ev)}/>
                        <Button onClick={()=>busquedaPorTitulo()} type="primary">Go!</Button>
                    </Input.Group>
                    }
                    <div className="relleno"></div>
                </div>
                <div className="headerSpace linksDesign">
                    <div className="link" onClick={() => navegar("/profile")}>{props.credentials?.usuario.nombre}</div>
                    <div className="link" onClick={() => logOut()}>Logout</div>
                </div>
            </div>
        )
    }



}

export default connect((state) => ({
    credentials: state.credentials
}))(Header);