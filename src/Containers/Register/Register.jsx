
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { checkError, raiz } from '../../utiles'
import './Register.css'
import { connect } from 'react-redux'
import { NOT_HOME } from '../../redux/actions'

const Register = (props) => {
  const navigate = useNavigate()

  useEffect(() => {
    props.dispatch({ type: NOT_HOME })
  }, [])
  // Hooks

  const [datosUsuario, setDatosUsuario] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    email: '',
    dni: '',
    password: '',
    password2: '',
    telefono: '',
    numCuenta: ''
  })

  const [msgError, setMsgError] = useState('')

  // useEffect

  useEffect(() => {
    // se ejecuta la primera vez que se ejecuta tan solamente
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

  const registrame = async () => {
    // Array de distintos campos

    setMsgError('')
    let error = ''
    const arrayCampos = Object.entries(datosUsuario)

    // 1 comprobación de errores antes de enviar al backend

    if (datosUsuario.password !== datosUsuario.password2) {
      return (setMsgError('Los dos password deben de coincidir'))
    } else {
      setMsgError('')
    }

    for (const elemento of arrayCampos) {
      error = checkError(elemento[0], elemento[1])
      if (error !== 'ok') {
        setMsgError(error)
        return
      };
    };

    console.log('todo ha ido bien')

    // 2construimos el body

    const body = {
      nombre: datosUsuario.nombre,
      apellido: datosUsuario.apellido,
      edad: parseInt(datosUsuario.edad),
      email: datosUsuario.email,
      nickname: datosUsuario.nickname,
      password: datosUsuario.password
    }

    // 3 envio de axios

    try {
      await axios.post(raiz + 'usuarios/registro', body)
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='designRegister'>
      <div className='cardRegister'>
        <div className='upCardRegister'>Formulario de Registro</div>
        <div className='middleCardRegister'>
          {/* {<pre>{JSON.stringify(datosUsuario, null,2)}</pre>} */}
          <input type='text' name='nombre' id='nombre' title='nombre' placeholder='Nombre:' autoComplete='off' onChange={(e) => { rellenarDatos(e) }} />
          <input type='text' name='apellido' id='apellido' title='apellido' placeholder='Apellido:' autoComplete='off' onChange={(e) => { rellenarDatos(e) }} />
          <input type='text' name='edad' id='edad' title='edad' placeholder='Edad:' autoComplete='off' onChange={(e) => { rellenarDatos(e) }} />
          <input type='email' name='email' id='email' title='email' placeholder='Correo Electrónico:' autoComplete='off' onChange={(e) => { rellenarDatos(e) }} />
          <input type='nickname' name='nickname' id='nickname' title='nickname' placeholder='Nickname:' autoComplete='off' onChange={(e) => { rellenarDatos(e) }} />
          {/* <input type="text" name="dni" id="dni" title="dni" placeholder="DNI" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/> */}
          <input type='password' name='password' id='password' title='password' placeholder='Contraseña' autoComplete='off' onChange={(e) => { rellenarDatos(e) }} />
          <input type='password' name='password2' id='password2' title='password2' placeholder='Repite contraseña' autoComplete='off' onChange={(e) => { rellenarDatos(e) }} />
          {/* <input type="text" name="telefono" id="telefono" title="telefono" placeholder="Telefono" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/> */}
          {/* <input type="text" name="numCuenta" id="numCuenta" title="numCuenta" placeholder="NºCuenta" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/> */}
        </div>
        <div className='bottomCardRegister'>
          {msgError}
          <div className='button type32 espacio' onClick={() => registrame()}>
            Registrar
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect()(Register)
