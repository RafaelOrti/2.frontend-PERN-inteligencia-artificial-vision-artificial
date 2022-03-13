
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { MOVIE_DETAIL } from '../../redux/types';
import {raiz} from '../../utiles';
import './SearchResults.css';

const SearchResults = (props) => {

    // const [films, setFilms] = useState([]);
    let navigate = useNavigate();

    useEffect(()=>{
        console.log(props.films);
    },[]);

    //useEffect custom para el hook films

    // useEffect(()=>{
    //     console.log("vaya, , films ha cambiado, ", props.films);
    // },[props.films]);

    // const traePelis = async () => {

    //     try {

    //         let res = await axios.get("https://lug-movie-club.herokuapp.com/movie-db/new");

    //         //Una vez han venido los datos del backend, nosotros, lo siguiente que haremos para que no se pierdan
    //         //será setear esos datos en el hook, haciendo que las peliculas estén disponibles 
    //         //para los return del componente.

    //         setTimeout(()=>{

    //             setFilms(res.data.results);
    //         },2000);

    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const escogePelicula = (pelicula) => {
        
        console.log(pelicula, "he escogido esta....");
        //Guardamos la pelicula escogida en redux
        props.dispatch({type:MOVIE_DETAIL, payload: pelicula});


        //Redirigimos a movieDetail con navigate
        navigate("/moviedetail");
    }
 
    if(props.films[0]?.id !== undefined){
        return(
            <div className="designRooster">

                {
                    //Voy a mapear las películas
                    props.films.map(pelicula => {
                        //a cada elemento que voy a mapear
                        //le brindo un KEY (obligatorio) que lo distinguirá de
                        //el resto de elementos
                        return (
                            //Al mapear, cada elemento que se itera del array (en este caso pelicula es ese elemento),
                            //si le hacemos propiedad onclick y pasamos el elemento como argumento,
                            //a esa funcion le va a llegar el objeto que hayamos clickado entero
                            <div key={pelicula.id} onClick={()=>escogePelicula(pelicula)}>
                                <img className='cartel' src={pelicula.image} alt={pelicula.title}/>
                            </div>
                        )
                    })
                }
                
            </div>
        )
    }else{
        return (
            <div className='designHome'>
                <div className="marginLoader">
                    <img src={require('../../img/loader.gif')} alt="cargador"/>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    //Este films que se invocará mediante props.films valdrá lo que vale en redux peliculas
    films: state.search.peliculas
}))(SearchResults);