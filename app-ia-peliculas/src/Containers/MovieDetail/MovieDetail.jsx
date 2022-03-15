
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { NOT_HOME } from "../../redux/actions";

import {useNavigate} from 'react-router-dom';
import Rent from '../../Components/Rent/Rent';
import Footer from '../../Components/Footer/Footer';
// import {raiz} from '../../utiles';

import './MovieDetail.css';

const MovieDetail = (props) => {

    let navigate = useNavigate();

    useEffect(() => {
        console.log('Created')
        props.dispatch({ type: NOT_HOME })
    }, [])
    
    const navegar = (lugar) => {

        setTimeout(() => {
            navigate(lugar);
        }, 200);

    }

   
    useEffect(()=> {
        //Compruebo si hay datos de la película escogida en redux, en caso de NO
        //haber datos, redirijo a HOME.
        
        if(props.search?.titulo === undefined){
            navigate("/");
        }
    });

        return(
            <div className='designFilm'>
                <div className="filmDetailHalf">
                    <div className="dataFilm">{props.search?.title}</div>
                    <div className="dataFilm">{props.search?.synopsis}</div>
                    <div className="link" onClick={() => {navegar("/display"); }}>Ver</div>
                    
                </div>
                <div className="filmDetailHalf">
                    <img className="cartel" src={props.search.imagen} alt={props.search.titulo}/></div>    
            </div>
        )
   
}
// navegar("/display"); 
export default connect((state) => ({
    credentials: state.credentials,
    search : state.search.film
}))(MovieDetail);

