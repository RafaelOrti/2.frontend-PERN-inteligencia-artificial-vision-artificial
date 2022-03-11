
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { MOVIE_DETAIL } from '../../redux/types';
import {raiz} from '../../utiles';
import './Film.css';

const Film = (props) => {

    const [Film, setFilm] = useState([]);
    let navigate = useNavigate();

    useEffect(()=>{
        //No es correcto realizar el try catch en el useEffect
        //dado que el useEffect es en si un proceso con un callback, meter un proceso
        //asíncrono traería problemas y React no lo permite, por ello, llamamos a una funcion
        //que habremos hecho nosotros y se encargará de ello

        traePelis();
    },[]);

    //useEffect custom para el hook Film

    useEffect(()=>{
        console.log("vaya, , Film ha cambiado, ", Film);
    },[Film]);

    const traePelis = async () => {

        try {

            let res = await axios.get("https://lug-movie-club.herokuapp.com/movie-db/new");

            //Una vez han venido los datos del backend, nosotros, lo siguiente que haremos para que no se pierdan
            //será setear esos datos en el hook, haciendo que las peliculas estén disponibles 
            //para los return del componente.

            setTimeout(()=>{

                setFilm(res.data.results);
            },2000);

        } catch (error) {
            console.log(error);
        }
    };

    const escogePelicula = (pelicula) => {
        
        console.log(pelicula);
        //Guardamos la pelicula escogida en redux
        props.dispatch({type:MOVIE_DETAIL, payload: pelicula});


        //Redirigimos a movieDetail con navigate
        navigate("/moviedetail");
    }
 
    if(Film[0]?.id != undefined){
        return(
            <div className="designRooster">

                {
                    //Voy a mapear las películas
                    Film.map(pelicula => {
                        //a cada elemento que voy a mapear
                        //le brindo un KEY (obligatorio) que lo distinguirá de
                        //el resto de elementos
                        return (
                            //Al mapear, cada elemento que se itera del array (en este caso pelicula es ese elemento),
                            //si le hacemos propiedad onclick y pasamos el elemento como argumento,
                            //a esa funcion le va a llegar el objeto que hayamos clickado entero
                            <div key={pelicula.id} onClick={()=>escogePelicula(pelicula)}>
                                <img src={raiz + pelicula.poster_path} alt={pelicula.title}/>
                            </div>
                        )
                    })
                }
                
            </div>
        )
    }else{
        return (
            <div className='designFilm'>
                <div className="marginLoader">
                    <img src={require('../../img/loader.gif')} alt="cargador"/>
                </div>
            </div>
        )
    }
}

export default connect()(Film);