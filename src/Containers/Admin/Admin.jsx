
import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { raiz } from '../../utiles'
import './Admin.css'
import { connect } from 'react-redux'
import { NOT_HOME } from '../../redux/actions'
// let res="";

const Admin = (props) => {
  // const navigate = useNavigate()
  const [res, setRes] = useState('')

  // Hooks

  const [datosUsuario, setDatosUsuario] = useState({
    titulo: '',
    genero: '',
    sinopsis: '',
    adult: '',
    popularity: '',
    imagen: '',
    video: '',
    fecha: '',
    idioma: ''
  })

  // const [msgError, setMsgError] = useState('')

  // useEffect

  useEffect(() => {
    props.dispatch({ type: NOT_HOME })
  }, [])

  useEffect(() => {
    // se ejecuta cada vez que se actualiza CUALQUIER HOOK
  })

  // Handler (manejador)
  const rellenarDatos = (e) => {
    setDatosUsuario({
      ...datosUsuario,
      [e.target.name]: e.target.value
    })
  }

  // Funciones locales del componente

  const registramePel = async () => {
    // construimos el body

    const body = {

      titulo: datosUsuario.titulo,
      genero: datosUsuario.genero,
      sinopsis: datosUsuario.sinopsis,
      adult: parseInt(datosUsuario.adult),
      popularity: parseInt(datosUsuario.popularity),
      imagen: datosUsuario.imagen,
      video: datosUsuario.video,
      fecha: Date.parse(datosUsuario.fecha),
      idioma: datosUsuario.idioma
    }

    // 3 envio de axios

    try {
      const resultado = await axios.post(raiz + 'peliculas/', body)
      setTimeout(() => {
        setRes(resultado.data)
      }, 2)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='designAdmin'>

      <div className='cardAdminRegPel'>
        <div className='upCardAdminRegPel'>Registro de películas</div>
        <div className='middleCardAdminRegPel'>
          {/* {<pre>{JSON.stringify(datosUsuario, null,2)}</pre>} */}
          <input type='text' name='titulo' id='titulo' title='titulo' placeholder='titulo:' autoComplete='off' onChange={(e) => { rellenarDatos(e) }} />
          <input type='text' name='genero' id='genero' title='genero' placeholder='genero:' autoComplete='off' onChange={(e) => { rellenarDatos(e) }} />
          <input type='text' name='sinopsis' id='sinopsis' title='sinopsis' placeholder='sinopsis:' autoComplete='off' onChange={(e) => { rellenarDatos(e) }} />
          <input type='text' name='adult' id='adult' title='adult' placeholder='adulto:' autoComplete='off' onChange={(e) => { rellenarDatos(e) }} />
          <input type='number' name='popularity' id='popularity' title='popularity' placeholder='popularidad:' autoComplete='off' onChange={(e) => { rellenarDatos(e) }} />
          <input type='text' name='imagen' id='imagen' title='imagen' placeholder='imagen' autoComplete='off' onChange={(e) => { rellenarDatos(e) }} />
          <input type='text' name='video' id='video' title='video' placeholder='video' autoComplete='off' onChange={(e) => { rellenarDatos(e) }} />
          <input type='text' name='fecha' id='fecha' title='fecha' placeholder='fecha' autoComplete='off' onChange={(e) => { rellenarDatos(e) }} />
          <input type='text' name='idioma' id='idioma' title='idioma' placeholder='idioma' autoComplete='off' onChange={(e) => { rellenarDatos(e) }} />
        </div>
        <div className='bottomCardAdminRegPel'>
          <div className='bottomCardAdminRegPelSub' />
          <div className='bottomCardAdminRegPelSub'>
            <div className='button type32 espacio ' onClick={() => registramePel()}>
              Registrar película
            </div>
          </div>
          <div className='bottomCardAdminRegPelSub'>{res}</div>
        </div>
      </div>
    </div>
  )
}

export default connect()(Admin)
