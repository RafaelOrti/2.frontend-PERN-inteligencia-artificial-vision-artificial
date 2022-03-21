import React, {useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {raiz} from '../../utiles';
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

    console.log("propsvideo")
    console.log(props)
    console.log(props.search?.video)
    let body;
    const [filmsAV, setFilmsAV] = useState("");

    useEffect(() =>{
        props.dispatch({ type: IS_HOME })
    },[])


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

    // let navigate = useNavigate();
    // const navegar = (lugar) => {
    //     setTimeout(() => {
    //         navigate(lugar);
    //     }, 200);
    // }
    // let ref = player => {
    //     this.player = player
    //   }
    // var youtube = document.getElementById("playerRef");
    // youtube = youtube.contentWindow;
    // youtube.oncontextmenu = function(e) {
    // e.preventDefault();
    // console.log("Blocked!");
    // }
    

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
            <Camera  mode={false} width='10em'
            height='10em'/>
            </div>
         
        {/* <button onClick={() => {
  	    console.log(Math.round(playerRef.current.getCurrentTime()));}}></button> */}
        </div>
        
    )

    

}

export default connect((state) => ({

    search : state.search.film,
    emotions: state.emotions
}))(Display);
//para enviar datos para recibir y enviar el otro en caso de nada el simple


{/* <ReactPlayer 
            ref={this.ref}
            url='https://www.youtube.com/watch?v=ysz5S6PUM-U' 
            width='100%'
            height='100%'
            muted="false"
            controls
            playing
            onEnded={() => navegar("/films")}

            /> */}



// import React, {useEffect, useState} from 'react';
// import { connect } from 'react-redux';
// import {useNavigate} from 'react-router-dom';
// import Rent from '../../Components/Rent/Rent';
// // import {raiz} from '../../utiles';

// import './MovieDetail.css';

// const MovieDetail = (props) => {

//     let navigate = useNavigate();
    


//     useEffect(()=> {
//         //Compruebo si hay datos de la película escogida en redux, en caso de NO
//         //haber datos, redirijo a HOME.
        
//         if(props.search?.titulo === undefined){
//             navigate("/");
//         }
//     });

//         return(
//             <div className='designFilm'>
//                 <div className="filmDetailHalf">
//                     <div className="dataFilm">{props.search?.title}</div>
//                     <div className="dataFilm">{props.search?.synopsis}</div>
//                     <div className="dataFilm">
//                         {
//                             //EN CASO DE QUE TOKEN SEA TRUE, SI SE INCLUYE EL ELEMENTO RENT
//                             props.credentials.token && <Rent id={props.search.id} token={props.credentials.token} idUser={props.credentials.usuario.id}/>
//                         }
//                     </div>
//                 </div>
//                 <div className="filmDetailHalf">
//                     <img className="cartel" src={props.search.imagen} alt={props.search.titulo}/></div>    
//             </div>
//         )
   
// }

// export default connect((state) => ({
//     credentials: state.credentials,
//     search : state.search.film
// }))(MovieDetail);

