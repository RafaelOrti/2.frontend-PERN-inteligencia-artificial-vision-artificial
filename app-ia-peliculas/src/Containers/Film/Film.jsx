import React, { useState, useEffect, useRef } from 'react';
//av camara
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MOVIE_DETAIL } from '../../redux/actions';
import { connect } from 'react-redux';
import { NOT_HOME } from "../../redux/actions";

import { raiz } from '../../utiles';
import './Film.css';
import 'antd/dist/antd.css';

import { loadModels } from '../../helpers/faceApi';
import { createFaLibrary } from '../../helpers/icons';

import Camera from '../../Components/Camera/Camera';

createFaLibrary();
loadModels();

let a = 0;
const Film = (props) => {

    console.log("pagina cargada", props.emotions?.timer)

    const [films, setFilms] = useState([]);
    // let [av, setAv] = useState(0);
    let navigate = useNavigate();

    let i = 0;


    useEffect(() => {
        console.log('Created')
        props.dispatch({ type: NOT_HOME })//grande Luigi!!!
        traePelis();
    }, [])

    const uploadResults = (emotion) => {
        console.log(emotion, props.credentials?.usuario.id)
    }

    // useEffect(() => {
    //     a++;
    //     if(a===2000){
    //         a=0;
            
    //     }
    // }, [a])

    setTimeout(() => {
        a++;
        console.log(a);
        if(a===20){
            a=0;
            uploadResults(props.emotions?.emotion);
        }
      }, 500)

    const traePelis = async () => {
        try {
            let res = await axios.get(raiz + "peliculas/", { headers: { "Authorization": `Bearer ${props.credentials?.token}` } });
            console.log("res")
            console.log(res)
            setTimeout(() => {
                console.log("res2")
                console.log(res.data)
                setFilms(res.data);
            }, 2);
        } catch (error) {
            console.log(error);
        }
    };
    const traePelisAV = async () => {
        try {
            let res = await axios.post(raiz + "usuarios/dataset", { headers: { "Authorization": `Bearer ${props.credentials?.token}` } });
            console.log("res")
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    };

    const escogePelicula = (pelicula) => {
        //Guardamos la pelicula escogida en redux
        props.dispatch({ type: MOVIE_DETAIL, payload: pelicula });
        //Redirigimos a movieDetail con navigate
        navigate("/moviedetail");
    }

    if (films[0]?.id !== undefined) {
        return (
            <div className='designFilm'>
                <br />
                <br />
                <br />
                <br />
                <br />
                <Camera mode={false} />
                <div className='designFilmSubFilm'>
                    <div className="container">
                        {
                            films.slice(i, i + 10).map(pelicula => {
                                return (
                                    <div className="item" key={pelicula.id} onClick={() => escogePelicula(pelicula)}>
                                        <img className="fotoCard" src={pelicula.imagen} alt={pelicula.title} />
                                        <p className="fotoName">{pelicula.titulo}</p>
                                    </div>
                                )
                            })
                        }
                        {props.emotions?.timer && 
                        <>
                        </>
                        }
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='designFilm'>
                <div className="marginLoader">
                    <img src={require('../../img/loader.gif')} alt="cargador" />
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    credentials: state.credentials,
    emotions: state.emotions
}))(Film);