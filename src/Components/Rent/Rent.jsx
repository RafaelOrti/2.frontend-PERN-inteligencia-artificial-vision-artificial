
import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import './Rent.css'

const Rent = (props) => {
  const navigate = useNavigate()

  const alquilar = async () => {
    const body = {
      // este body corresponde al body de pedido de postman
      precio: 5,
      peliculaId: props.id,
      usuarioId: props.idUser,
      fechaEntrega: 'nuncaaaaaaaaaaaaaaaa hahahaha'
    }

    const config = {
      headers: { Authorization: `Bearer ${props.token}` }
    }

    try {
      const res = await axios.post('https://movie-db-geekshubs.herokuapp.com/pedidos', body, config)

      if (res) {
        console.log(res)
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='designRent' onClick={() => alquilar()}>Alquilar</div>
  )
}

export default Rent
