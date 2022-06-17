
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { MOVIE_DETAIL, NOT_HOME } from '../../redux/actions'
import './SearchResults.css'

const SearchResults = (props) => {
  // const [films, setFilms] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    props.dispatch({ type: NOT_HOME })
  }, [])

  const escogePelicula = (pelicula) => {
    // Guardamos la pelicula escogida en redux
    props.dispatch({ type: MOVIE_DETAIL, payload: pelicula })
    // Redirigimos a movieDetail con navigate
    navigate('/moviedetail')
  }

  if (props.films[0]?.id !== undefined) {
    return (
      <div className='designRooster'>
        {
                    // Voy a mapear las películas
                    props.films.map(pelicula => {
                      // a cada elemento que voy a mapear
                      // le brindo un KEY (obligatorio) que lo distinguirá de
                      // el resto de elementos
                      return (
                      // Al mapear, cada elemento que se itera del array (en este caso pelicula es ese elemento),
                      // si le hacemos propiedad onclick y pasamos el elemento como argumento,
                      // a esa funcion le va a llegar el objeto que hayamos clickado entero
                        <div key={pelicula.id} onClick={() => escogePelicula(pelicula)}>
                          <img className='cartel' src={pelicula.image} alt={pelicula.title} />
                        </div>
                      )
                    })
                }
      </div>
    )
  } else {
    return (
      <div className='designHome'>
        <div className='marginLoader'>
          <img src={require('../../img/loader.gif')} alt='cargador' />
        </div>
      </div>
    )
  }
}

export default connect((state) => ({
  // Este films que se invocará mediante props.films valdrá lo que vale en redux peliculas
  films: state.search.peliculas
}))(SearchResults)
