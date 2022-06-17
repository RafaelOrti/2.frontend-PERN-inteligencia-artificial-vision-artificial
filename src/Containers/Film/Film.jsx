import React, { useState, useEffect } from 'react'
// av camara
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MOVIE_DETAIL, NOT_HOME } from '../../redux/actions'
import { connect } from 'react-redux'
import { raiz } from '../../utiles'
import './Film.css'
import 'antd/dist/antd.css'
import { loadModels } from '../../helpers/faceApi'
import { createFaLibrary } from '../../helpers/icons'
import Camera from '../../Components/Camera/Camera'

createFaLibrary()
loadModels()

let a = 0
const Film = (props) => {
  console.log('pagina cargada', props.emotions?.timer)

  const [films, setFilms] = useState([])
  const [filmsTerror, setFilmsTerror] = useState([])
  const [filmsAccion, setFilmsAccion] = useState([])
  const [filmsHumor, setFilmsHumor] = useState([])
  const [filmsAI, setFilmsAI] = useState('')
  const [filmsAV, setFilmsAV] = useState('')
  // let [av, setAv] = useState(0);
  const navigate = useNavigate()
  let body
  const i = 0
  const [ai, setAI] = useState(0)

  // elementos cargados al inicio
  useEffect(() => {
    console.log('Created')
    props.dispatch({ type: NOT_HOME })// grande Luigi!!!
    traePelis()
    traePelisTerror()
    traePelisHumor()
    traePelisAccion()
    traePelisAI()
  }, [])

  // llamada directa a backend
  const traePelis = async () => {
    try {
      const res = await axios.get(raiz + 'peliculas/', { headers: { Authorization: `Bearer ${props.credentials?.token}` } })
      setTimeout(() => {
        setFilms(res.data)
      }, 500)
    } catch (error) {
      console.log(error)
    }
  }

  const traePelisTerror = async () => {
    try {
      body = {
        genero: 'terror'
      }
      const res = await axios.post(raiz + 'peliculas/genero', body)
      setTimeout(() => {
        setFilmsTerror(res.data)
      }, 2)
    } catch (error) {
      console.log(error)
    }
  }

  const traePelisHumor = async () => {
    try {
      const res = await axios.post(raiz + 'peliculas/genero', {
        genero: 'humor'
      })
      setTimeout(() => {
        setFilmsHumor(res.data)
      }, 2)
    } catch (error) {
      console.log(error)
    }
  }

  const traePelisAccion = async () => {
    try {
      const res = await axios.post(raiz + 'peliculas/genero', {
        genero: 'accion'
      })
      setTimeout(() => {
        setFilmsAccion(res.data)
      }, 2)
    } catch (error) {
      console.log(error)
    }
  }

  // llamada con procesado red neuronal de recomendaciones
  const traePelisAI = async () => {
    try {
      // http://localhost:3000/peliculas
      const res = await axios.post(raiz + `peliculas/ia/${props.credentials?.usuario.id}`, { headers: { Authorization: `Bearer ${props.credentials?.token}` } })
      setTimeout(() => {
        setFilmsAI(res.data)
      }, 2)
    } catch (error) {
      console.log(error)
    }
  }

  // elementos cargados cada x segundos
  setTimeout(() => {
    a++
    console.log(a)
    if (a === 3) {
      a = 0
      traePelisAV(props.emotions?.emotion)
    }
  }, 100)

  // Procesado de datos cad x segundos a traves de redux para hacer llamada a backend

  const traePelisAV = async (emotion) => {
    try {
      if (emotion.angry > 1) {
        emotion.angry = emotion.angry / 10
      }
      if (emotion.disgusted > 1) {
        emotion.angry = emotion.disgusted / 10
      }
      if (emotion.fearful > 1) {
        emotion.angry = emotion.fearful / 10
      }
      if (emotion.angry > 1) {
        emotion.sad = emotion.sad / 10
      }

      body = {
        angry: emotion.angry,
        disgusted: emotion.disgusted,
        fearful: emotion.fearful,
        happy: emotion.happy,
        neutral: emotion.neutral,
        sad: emotion.sad,
        surprised: emotion.surprised,
        id: props.credentials?.usuario.id
      }

      const res = await axios.post(raiz + 'peliculas/avias', body)
      setTimeout(() => {
        console.log('cosas que hemos detectado con AV', emotion)
        console.log('cosas que trae la av')
        console.log(res.data)
        setFilmsAV(res.data)
      }, 2)
    } catch (error) {
      console.log(error)
    }
  }

  // redirecion a movie detail

  const escogePelicula = (pelicula) => {
    // Guardamos la pelicula escogida en redux

    props.dispatch({ type: MOVIE_DETAIL, payload: pelicula })
    // Redirigimos a movieDetail con navigate
    navigate('/moviedetail')
  }

  const avanzarPeliculas = (b) => {
    // let b=i
    if (films.length < (b + 1)) {
      b += 10
      setAI(b)
    }
  }
  const atrasarPeliculas = (b) => {
    if (i <= 10) {
      b -= 10
      setAI(b)
    }
  }

  if (films[0]?.id !== undefined && filmsTerror[0]?.id !== undefined && filmsHumor[0]?.id !== undefined && filmsAccion[0]?.id !== undefined && filmsAI[0]?.id !== undefined) {
    return (
      <div className='designFilm'>
        <div className='espacioSupFilm' />
        <Camera mode={false} />
        <div className='designFilmSubFilm'>
          <div className='divPFilm'>
            <p className='pFilm'>Peliculas AV AI</p>
          </div>
          <div className='container'>
            {
              (filmsAV !== '') &&
              (
                filmsAV.slice(i, i + 10).map(peliculaAV => {
                  return (
                    <div className='item' key={peliculaAV.id} onClick={() => escogePelicula(peliculaAV)}>
                      <img className='fotoCard' src={peliculaAV.imagen} alt={peliculaAV.titulo} />
                      <p className='fotoName'>{peliculaAV.titulo}</p>
                    </div>
                  )
                }))
            }
            {
              (filmsAV === '') &&
              (
                films.slice(i, i + 10).map(pelicula => {
                  return (
                    <div className='item' key={pelicula.id} onClick={() => escogePelicula(pelicula)}>
                      <img className='fotoCard' src={pelicula.imagen} alt={pelicula.titulo} />
                      <p className='fotoName'>{pelicula.titulo}</p>
                    </div>
                  )
                }))
            }
          </div>
          <div className='divPFilm'>
            <p className='pFilm'>Peliculas AI</p>
          </div>
          <div className='container'>
            {
              (filmsAI !== '') &&
              (
                filmsAI.slice(i, i + 10).map(peliculaAI => {
                  return (
                    <div className='item' key={peliculaAI.id} onClick={() => escogePelicula(peliculaAI)}>
                      <img className='fotoCard' src={peliculaAI.imagen} alt={peliculaAI.titulo} />
                      <p className='fotoName'>{peliculaAI.titulo}</p>
                    </div>
                  )
                }))
            }
            {
              (filmsAI === '') &&
              (
                films.slice(i, i + 10).map(pelicula => {
                  return (
                    <div className='item' key={pelicula.id} onClick={() => escogePelicula(pelicula)}>
                      <img className='fotoCard' src={pelicula.imagen} alt={pelicula.titulo} />
                      <p className='fotoName'>{pelicula.titulo}</p>
                    </div>
                  )
                }))
            }
          </div>
          <div className='divPFilm'>
            <p className='pFilm'>Todas las películas</p>
          </div>
          <div className='container'>
            <div className='link flechaI' onClick={() => atrasarPeliculas(ai)} />
            {
              films.slice(ai, ai + 10).map(pelicula => {
                return (
                  <div className='item' key={pelicula.id} onClick={() => escogePelicula(pelicula)}>
                    <img className='fotoCard' src={pelicula.imagen} alt={pelicula.titulo} />
                    <p className='fotoName'>{pelicula.titulo}</p>
                  </div>
                )
              })
            }
            <div className='link flechaD' onClick={() => avanzarPeliculas(ai)} />
          </div>
          <div className='divPFilm'>
            <p className='pFilm'>Películas de terror</p>
          </div>
          <div className='container'>
            {
              filmsTerror.slice(i, i + 10).map(peliculaTerror => {
                return (
                  <div className='item' key={peliculaTerror.id} onClick={() => escogePelicula(peliculaTerror)}>
                    <img className='fotoCard' src={peliculaTerror.imagen} alt={peliculaTerror.titulo} />
                    <p className='fotoName'>{peliculaTerror.titulo}</p>
                  </div>
                )
              })
            }

          </div>
          <div className='divPFilm'>
            <p className='pFilm'>Películas de humor</p>
          </div>
          <div className='container'>
            {
              filmsHumor.slice(i, i + 10).map(peliculaHumor => {
                return (
                  <div className='item' key={peliculaHumor.id} onClick={() => escogePelicula(peliculaHumor)}>
                    <img className='fotoCard' src={peliculaHumor.imagen} alt={peliculaHumor.titulo} />
                    <p className='fotoName'>{peliculaHumor.titulo}</p>
                  </div>
                )
              })
            }

          </div>
          <div className='divPFilm'>
            <p className='pFilm'>Películas de accion</p>
          </div>
          <div className='container'>
            {
              filmsAccion.slice(i, i + 10).map(peliculaAccion => {
                return (
                  <div className='item' key={peliculaAccion.id} onClick={() => escogePelicula(peliculaAccion)}>
                    <img className='fotoCard' src={peliculaAccion.imagen} alt={peliculaAccion.titulo} />
                    <p className='fotoName'>{peliculaAccion.titulo}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='designFilm'>
        <div className='marginLoader'>
          <img className='marginLoaderImage' src={require('../../img/loader.gif')} alt='cargador' />
        </div>
      </div>
    )
  }
}

export default connect((state) => ({
  credentials: state.credentials,
  emotions: state.emotions
}))(Film)
