
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NOT_HOME } from '../../redux/actions'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { raiz } from '../../utiles'
import './MovieDetail.css'

const MovieDetail = (props) => {
  const navigate = useNavigate()

  useEffect(() => {
    enviaDataSet()
    props.dispatch({ type: NOT_HOME })
  }, [])

  const enviaDataSet = async () => {
    try {
      const body = {
        p: props.search?.id,
        id: props.credentials?.usuario.id
      }
      await axios.post(raiz + 'usuarios/dataset', body)
    } catch (error) {
      console.log(error)
    }
  }

  const navegar = (lugar) => {
    setTimeout(() => {
      navigate(lugar)
    }, 200)
  }

  useEffect(() => {
    // Compruebo si hay datos de la película escogida en redux, en caso de NO
    // haber datos, redirijo a HOME.
    if (props.search?.titulo === undefined) {
      navigate('/')
    }
  })

  return (
    <div className='designMovieDetail'>
      <div className='filmDetailHalf'>
        <div className='seccionVer'>
          <div className='dataFilm'>{props.search?.titulo}</div>
        </div>
        <div className='seccionVer'>
          <div className='dataFilm'>{props.search?.sinopsis}</div>
        </div>
        <div className='seccionVer'>
          <div className='button type3 espacio' onClick={() => { navegar('/display') }}>Ver</div>
        </div>
      </div>
      <div className='filmDetailHalf'>
        <img className='cartel' src={props.search.imagen} alt={props.search.titulo} />
      </div>
    </div>
  )
}
// navegar("/display");
export default connect((state) => ({
  credentials: state.credentials,
  search: state.search.film
}))(MovieDetail)
