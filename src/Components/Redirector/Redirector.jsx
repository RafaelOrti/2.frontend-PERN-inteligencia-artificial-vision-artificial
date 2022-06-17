import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGOUT } from '../../redux/actions'
import { connect } from 'react-redux'

import './Redirector.css'

const Redirector = (props) => {
  const navigate = useNavigate()

  const navegar = (lugar) => {
    setTimeout(() => {
      navigate(lugar)
    }, 200)
  }

  const logOut = () => {
    // Borrar de RDX las credenciales
    props.dispatch({ type: LOGOUT })

    setTimeout(() => {
      navigate('/')
    }, 1500)
  }

  if (!props.credentials?.token) {
    return (
      <div className='designRedirector'>
        <div className='RedirectorSpace' />
        <div className='RedirectorSpace' />
        <div className='RedirectorSpace linksDesign'>
          <div className='link' onClick={() => navegar('/login')}>Login</div>
          <div className='link' onClick={() => navegar('/register')}>Registro</div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='designRedirector'>
        <div className='RedirectorSpace' />
        <div className='RedirectorSpace' />
        <div className='RedirectorSpace linksDesign'>
          <div className='link' onClick={() => navegar('/profile')}>{props.credentials?.usuario.nombre}</div>
          <div className='link' onClick={() => logOut()}>Logout</div>
        </div>
      </div>
    )
  }
}

export default connect((state) => ({
  credentials: state.credentials
}))(Redirector)
