import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NOT_HOME } from '../../redux/actions'

import './Home.css'

const Home = (props) => {
  useEffect(() => {
    props.dispatch({ type: NOT_HOME })
  }, [])

  return (
    <div className='designHome'>
      {/* <img className="fondo" src={require('../../img/login.jpg')} alt="fondo" ></img> */}
    </div>
  )
}

export default connect()(Home)
