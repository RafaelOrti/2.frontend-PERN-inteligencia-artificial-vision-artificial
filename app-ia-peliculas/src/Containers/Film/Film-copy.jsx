
import React, { useState, useEffect, useRef } from 'react';
//av camara

import classnames from 'classnames';

import { detectFaces, drawResults } from '../../helpers/faceApi';

// import Button from '../Button/Button';
// import Gallery from '../Gallery/Gallery';
import Results from '../../Components/Results/Results';
import Webcam from 'react-webcam';
//av camara

//results

//results
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MOVIE_DETAIL } from '../../redux/actions';
import { connect } from 'react-redux';
import { NOT_HOME } from "../../redux/actions";

import { raiz } from '../../utiles';
import './Film.css';
import { Card } from 'antd';
import 'antd/dist/antd.css';

import { loadModels } from '../../helpers/faceApi';
import { createFaLibrary } from '../../helpers/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Switch from 'react-switch';
import Camera from '../../Components/Camera/Camera';
//_-----------------------------

createFaLibrary();
loadModels();
const Film = (props) => {

    const [films, setFilms] = useState([]);
    const [mode, setMode] = useState(false);
    // const [av, setAV] = useState([]);
    let navigate = useNavigate();

    let i = 0;
    // let a= useRef();
    //AV
    // const camera = useRef();
    // const cameraCanvas = useRef();

    // const [photo, setPhoto] = useState(undefined);
    // const [showGallery, setShowGallery] = useState(false);
    // const [photos, setPhotos] = useState([]);
    // const [results, setResults] = useState([]);

    // const getFaces = async () => {
    //     if (camera.current !== null) {
    //         const faces = await detectFaces(camera?.current?.video);
    //         await drawResults(camera?.current?.video, cameraCanvas?.current, faces, 'boxLandmarks');
    //         setResults(faces);
    //     }
    // };

    // const clearOverlay = (canvas) => {
    //     canvas.current.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    // };

    // useEffect(() => {
    //     if (!mode && camera !== null) {
    //         const ticking = setInterval(async () => {
    //             await getFaces();
    //         }, 80);
    //         return () => {
    //             clearOverlay(cameraCanvas);
    //             clearInterval(ticking);
    //         };
    //     } else {
    //         return clearOverlay(cameraCanvas);
    //     }
    // }, [mode]);

    // useEffect(() => {
    //     a=results;
    //     console.log("a[0]")
    //     console.log(a)
    // }, [results]);

    // const toggleGallery = () => setShowGallery(!showGallery);

    // const capture = () => {
    //     const imgSrc = camera.current.getScreenshot();
    //     const newPhotos = [...photos, imgSrc];
    //     setPhotos(newPhotos);
    //     setPhoto(imgSrc);
    //     setShowGallery(true);
    // };
    // const reset = () => {
    //     setPhoto(undefined);
    //     setPhotos([]);
    //     setShowGallery(false);
    // };
    // const deleteImage = (target) => {
    //     const newPhotos = photos.filter((photo) => {
    //         return photo !== target;
    //     });
    //     setPhotos(newPhotos);
    // };

    //AV


    useEffect(() => {
        //No es correcto realizar el try catch en el useEffect
        //dado que el useEffect es en si un proceso con un callback, meter un proceso
        //asíncrono traería problemas y React no lo permite, por ello, llamamos a una funcion
        //que habremos hecho nosotros y se encargará de ello
        console.log('Created')
        props.dispatch({ type: NOT_HOME })
        traePelis();
        // traePelisAI();


    }, [])







    //useEffect custom para el hook films

    useEffect(() => {
        console.log("vaya, , films ha cambiado, ", films);
    }, [films]);


    const traePelis = async () => {


        try {

            

            let res = await axios.get(raiz + "peliculas/", { headers: { "Authorization": `Bearer ${props.credentials?.token}` } });
            console.log("res")
            console.log(res)

            //Una vez han venido los datos del backend, nosotros, lo siguiente que haremos para que no se pierdan
            //será setear esos datos en el hook, haciendo que las peliculas estén disponibles 
            //para los return del componente.

            setTimeout(() => {
                console.log("res2")
                console.log(res.data)
                setFilms(res.data);
            }, 2);

        } catch (error) {
            console.log(error);
        }
    };
    // let body = {
    //     angry: results[0].expressions.angry,
    //     disgusted: results[0].expressions.disgusted,
    //     fearful: results[0].expressions.fearful,
    //     happy: results[0].expressions.happy,
    //     neutral: results[0].expressions.neutral,
    //     sad: results[0].expressions.sad,
    //     surprised: results[0].expressions.surprised
    // }

    const traePelisAV = async () => {


        try {

            let res = await axios.post(raiz + "usuarios/dataset", { headers: { "Authorization": `Bearer ${props.credentials?.token}` } });
            console.log("res")
            console.log(res)


            // setTimeout(() => {
            //     console.log("res2")
            //     console.log(res.data)
            //     setAV(res.data);
            // }, 2000);

        } catch (error) {
            console.log(error);
        }
    };

    const traePelisAI = async () => {


        try {

            console.log("aaaaaaaaaaaaaa")
            console.log(raiz + `usuarios/ia/${props.credentials?.usuario.id}`)

            let res = await axios.post(raiz + `usuarios/ia/${props.credentials?.usuario.id}`, { headers: { "Authorization": `Bearer ${props.credentials?.token}` } });
            console.log("res")
            console.log(res)


            // setTimeout(() => {
            //     console.log("res2")
            //     console.log(res.data)
            //     setAV(res.data);
            // }, 2);

        } catch (error) {
            console.log(error);
        }
    };

    const escogePelicula = (pelicula) => {

        console.log(pelicula);
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
              

                    

                    

                {/* <div className="camera">
                        <div className="camera__wrapper">
                            <Webcam audio={false} ref={camera} width="100%" height="auto" />
                            <canvas className={classnames('webcam-overlay', mode && 'webcam-overlay--hidden')} ref={cameraCanvas} />
                        </div>
                        <div className="results__container">
                            <Results results={results} />
                        </div>
                    </div> */}


                <Camera mode={mode}/>
                <div className='designFilmSubFilm'>
                    {/* <div className="container">
                        {
                            films.slice(i, i + 10).map(pelicula => {
                                return (
  
                                    pelicula.anuncio === false &&
                                    <div className="item">
                                        <div className="cardPelicula" key={pelicula.id} onClick={() => escogePelicula(pelicula)}>

                                            <img className="fotoCard" src={pelicula.imagen} alt={pelicula.titulo} />
                                            <p className="fotoName">{pelicula.titulo}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div> */}

                    <div className="container">
                        {
                            
                            films.slice(i, i + 10).map(pelicula => {

                                //a cada elemento que voy a mapear
                                //le brindo un KEY (obligatorio) que lo distinguirá de
                                //el resto de elementos

                                return (
                                    //Al mapear, cada elemento que se itera del array (en este caso pelicula es ese elemento),
                                    //si le hacemos propiedad onclick y pasamos el elemento como argumento,
                                    //a esa funcion le va a llegar el objeto que hayamos clickado entero

                                    <div className="item" key={pelicula.id} onClick={() => escogePelicula(pelicula)}>
                                        <img className="fotoCard" src={pelicula.imagen} alt={pelicula.title} />
                                        <p className="fotoName">{pelicula.titulo}</p>
                                    </div>



                                    // <div className="item" key={pelicula.id} onClick={()=>escogePelicula(pelicula)}>
                                    //     <img className="fotoCard" src={pelicula.imagen} alt={pelicula.title}/>
                                    //     <p className="fotoName">{pelicula.titulo}</p>
                                    // </div>


                                    // pelicula.anuncio === false &&
                                    // <div className="item">
                                    //     <div className="cardPelicula" key={pelicula.id} onClick={() => escogePelicula(pelicula)}>

                                    //         <img className="fotoCard" src={pelicula.imagen} alt={pelicula.titulo} />
                                    //         <p className="fotoName">{pelicula.titulo}</p>
                                    //     </div>
                                    // </div>

                                )


                            })
                        }
                    </div>
                </div>
            </div>

            // </div>
        )
    } else {
        return (

            <div className='designFilm'>

                {/* <div className='designFilm'>
                    <span>{initializing ?'Initializing':'Ready'}</span>
                    <video ref={videoRef} autoPlay muted height={videoHeight} width={videoWidth}/>
                    <canvas ref={canvasRef}/>
                </div> */}
                <div className="marginLoader">
                    <img src={require('../../img/loader.gif')} alt="cargador" />
                </div>

            </div>
        )
    }
}

export default connect((state) => ({
    credentials: state.credentials,
    emotions: state.hideFooter
}))(Film);