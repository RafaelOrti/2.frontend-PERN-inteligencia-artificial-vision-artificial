
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MOVIE_DETAIL } from '../../redux/actions';
import { connect } from 'react-redux';
import { NOT_HOME } from "../../redux/actions";

import {raiz} from '../../utiles';
import './Add.css';
import { Card } from 'antd';
import 'antd/dist/antd.css';


const Add = (props) => {

    const [Adds, setAdds] = useState([]);
    let navigate = useNavigate();
    const { Meta } = Card;

    useEffect(()=>{
        //No es correcto realizar el try catch en el useEffect
        //dado que el useEffect es en si un proceso con un callback, meter un proceso
        //asíncrono traería problemas y React no lo permite, por ello, llamamos a una funcion
        //que habremos hecho nosotros y se encargará de ello
        console.log('Created')
        props.dispatch({ type: NOT_HOME })
        traePelis();
    },[]);

    //useEffect custom para el hook Adds

    useEffect(()=>{
        console.log("vaya, , Adds ha cambiado, ", Adds);
    },[Adds]);

    const traePelis = async () => {
        
        // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoxLCJub21icmUiOiJQYWNvIiwiYXBlbGxpZG8iOiJNYXJ0aW5leiIsIm5pY2tuYW1lIjoiaG9sYSIsImVkYWQiOjIyLCJlbWFpbCI6ImhvbGFAZ21haWwiLCJyb2wiOmZhbHNlLCJwYXNzd29yZCI6IiQyYiQxMCRzWTNaQi96Y2ZWbTRrWFlvbm1YRVcucnlnazZXWXRyenpwNTdtTjN6OW9Cb2hRa0duTEFHYSIsInB1bnRvcyI6MCwicDAiOjAsInAxIjowLCJwMiI6MCwicDMiOjAsInA0IjowLCJwNSI6MCwicDYiOjAsInA3IjowLCJwOCI6MCwicDkiOjAsImxlY3R1cmEiOjAsImNyZWF0ZWRBdCI6IjIwMjItMDMtMDhUMTg6MjI6MTkuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjItMDMtMDhUMTg6MjI6MTkuMDAwWiJ9LCJpYXQiOjE2NDcxMzE2NzIsImV4cCI6MTY0NzMwNDQ3Mn0.vy_I9cNjJ7NvHONSYphAwd0McOcXIri8TIyXYtSE41c";

        try {

            let res = await axios.get(raiz + "peliculas/", { headers: {"Authorization" : `Bearer ${props.credentials?.token}`} });
            console.log("res")
            console.log(res)

            //Una vez han venido los datos del backend, nosotros, lo siguiente que haremos para que no se pierdan
            //será setear esos datos en el hook, haciendo que las peliculas estén disponibles 
            //para los return del componente.

            setTimeout(()=>{
                console.log("res2")
                console.log(res.data)
                setAdds(res.data);
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
 
    if(Adds[0]?.id !== undefined){
        
        return(
            <div className="designRooster">

                {
                    //Voy a mapear las películas
                    Adds.map(pelicula => {
                        console.log(pelicula.imagen)
                        //a cada elemento que voy a mapear
                        //le brindo un KEY (obligatorio) que lo distinguirá de
                        //el resto de elementos
                        return (
                            //Al mapear, cada elemento que se itera del array (en este caso pelicula es ese elemento),
                            //si le hacemos propiedad onclick y pasamos el elemento como argumento,
                            //a esa funcion le va a llegar el objeto que hayamos clickado entero
                            
                           
                                pelicula.anuncio===true &&
                                <div className="cardPelicula" key={pelicula.id} onClick={()=>escogePelicula(pelicula)}>
                                    <img className="fotoCard" src={pelicula.imagen} alt={pelicula.titulo}/>
                                    <p>{pelicula.titulo}</p>
                                </div>
                                
                            
                               
                    
                            
                        )
                    })
                }
                
            </div>
        )
    }else{
        return (
            <div className='designAdd'>
                <div className="marginLoader">
                    <img src={require('../../img/loader.gif')} alt="cargador"/>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    credentials: state.credentials
}))(Add);
//te exporta el add diciendo que esta conectado a redux

export const pepe = connect((state) => ({
    credentials: state.credentials
}))(Add);
//puedes exportar lo que quieras funcion variable objeto etc...
