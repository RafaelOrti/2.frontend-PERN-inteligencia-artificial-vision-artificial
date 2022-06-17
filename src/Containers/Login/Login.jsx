
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { raiz } from '../../utiles'
import axios from 'axios'

// REDUX...
import { connect } from 'react-redux'
import { LOGIN, NOT_HOME } from '../../redux/actions'

import './Login.css'

const Login = (props) => {
  const navigate = useNavigate()
  useEffect(() => {
    console.log('Created')
    props.dispatch({ type: NOT_HOME })
  }, [])

  // 1-Hooks (equivalen al estado en los componentes de clase)
  const [datosUsuario, setDatosUsuario] = useState({ email: '', password: '' })
  const [msgError, setMsgError] = useState('')
  const [msgError2, setMsgError2] = useState('')

  // Funciones handlers
  const rellenarDatos = (e) => {
    // Funcion handler que setea los datos en el hook...[e.target.name] obtiene
    // el nombre de la propiedad a cambiar, e.target.value tiene el valor..ambos
    // obtienen los datos del evento, que es el hecho de escribir en un input en concreto
    setDatosUsuario({ ...datosUsuario, [e.target.name]: e.target.value })
  }

  // Funciones locales

  const login = async () => {
    try {
      // Me invento las credenciales
      const body = {
        email: datosUsuario.email,
        password: datosUsuario.password
      }
      const resultado = await axios.post(raiz + 'usuarios/login', body)
      console.log(resultado)
      // Cambiamos el valor del hook credenciales, por lo tanto se recargará el componente
      if (resultado.data === 'Usuario o contraseña inválido') {
        setMsgError2('Usuario o contraseña inválido')
        setMsgError('Usuario o contraseña inválido')
      } else {
        // Guardaríamos los datos en redux...
        props.dispatch({ type: LOGIN, payload: resultado.data })
        setTimeout(() => {
          navigate('/film')
        }, 1500)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 2-Render (lo que pinta en pantalla)

  return (
    <div className='designLogin'>
      <div className='espacio' />
      <div className='login'>
        {/* {
                     <pre>{JSON.stringify(datosUsuario, null,2)}</pre>} */}
        <div className='designFormulario'>
          <input type='email' className='input' name='email' id='email' title='email' placeholder='Correo Electrónico' autoComplete='off' onChange={(e) => { rellenarDatos(e) }} />
          <input type='password' className='input' name='password' id='password' title='password' placeholder='Contraseña' autoComplete='off' onChange={(e) => { rellenarDatos(e) }} />
          {msgError}
          {msgError2}
        </div>
        <br />
        <div className='button type3 espacio' onClick={() => login()}>Logueame</div>
      </div>
    </div>
  )
}

export default connect()(Login)
