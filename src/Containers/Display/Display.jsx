import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { raiz } from '../../utiles';
import axios from 'axios';
import ReactPlayer from 'react-player'
import { connect } from "react-redux";
import { IS_HOME } from "../../redux/actions";

import { loadModels } from '../../helpers/faceApi';
import { createFaLibrary } from '../../helpers/icons';

import 'antd/dist/antd.css';
import Camera from '../../Components/Camera/Camera';

import './Display.css';
createFaLibrary();
loadModels();

let a = 0;
const Display = (props) => {
    const playerRef = React.useRef();

    let body;
    const [filmsAV, setFilmsAV] = useState("");

    useEffect(() => {
        props.dispatch({ type: IS_HOME })
    }, [])

    const grabaPelisAV = async (emotion) => {
        try {
            body = {
                angry: emotion.angry,
                disgusted: emotion.disgusted,
                fearful: emotion.fearful,
                happy: emotion.happy,
                neutral: emotion.neutral,
                sad: emotion.sad,
                surprised: emotion.surprised,
                id: props.search?.id
            }

            let res = await axios.post(raiz + `peliculas/av`, body);
            setTimeout(() => {
                console.log("identificacion de av")
                console.log(res.data)
                setFilmsAV(res.data);
            }, 2);
        } catch (error) {
            console.log(error);
        }
    };

    setTimeout(() => {
        a++;
        console.log(a);
        if (a === 4) {
            a = 0;
            grabaPelisAV(props.emotions?.emotion);
        }
    }, 50)

    return (
        // <></> componente vacio que no tiene nada y le puedes intercalar {} para poner la condicion
        <div className='designDisplay'>

            {/* <YouTube
            showCaptions={false}
            controls
            annotations={false}
            url={props.search?.video}
            autoplay
            /> */}


            <ReactPlayer
                ref={playerRef}
                url={props.search?.video}
                className='react-player'
                playing
                controls
                width='100%'
                height='100%'
                position='absolute'
                z-index='10'
            />

            <div className="cameraHidden">
                <Camera mode={false} width='10em'
                    height='10em' />
            </div>
            {/* <button onClick={() => {
  	    console.log(Math.round(playerRef.current.getCurrentTime()));}}></button> */}
        </div>
    )

}

export default connect((state) => ({

    search: state.search.film,
    emotions: state.emotions
}))(Display);
//para enviar datos para recibir y enviar el otro en caso de nada el simple

