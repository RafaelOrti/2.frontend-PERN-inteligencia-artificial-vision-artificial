import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {raiz} from '../../utiles';
import axios from 'axios';

import Rent from '../../Components/Rent/Rent';

import './Display.css';

const Display = () => {

    return (
        <div className='designDisplay'>
            <video className='video'>
            <source
            src="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4"
            type="video/mp4"
            />
            Your browser does not support the video tag.
            </video>
        </div>
    )

}

export default Display;



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

