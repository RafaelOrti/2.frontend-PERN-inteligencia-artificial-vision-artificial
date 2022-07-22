
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGOUT } from '../../redux/actions'
import { connect } from 'react-redux'
// import axios from 'axios'
// import 'antd/dist/antd.css'
// import {
//   Input,
//   Button
// } from 'antd'
// import { raiz } from '../../utiles'

import './Header.css'

const Header = (props) => {
  const navigate = useNavigate()
  // const [titulo, setTitulo] = useState('')
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

  // const manejador = (ev) => {
  //   setTitulo(ev.target.value)
  // }

  // const busquedaPorTitulo = async () => {
  //   // Axios que trae resultados....
  //   // window.location.pathname === "/add" &&
  //   // <div className="link" onClick={() => navegar("/film")}>Film</div>
  //   try {
  //     const resultados = await axios.get(raiz + `peliculas/genero/titulo/${titulo}`)
  //     // Guardo en redux los resultados de las películas
  //     props.dispatch({ type: MOVIES_TITLE, payload: resultados.data })
  //     setTimeout(() => {
  //       navigate('/searchresults')
  //     }, 500)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  if (!props.credentials?.token) {
    return (
      <div className='designHeader'>
        <div className='headerSpace logoDesign'>
          <img className='logo' src={require('../../img/aiflix-logo.png')} alt='logo' onClick={() => navegar('/')} />
        </div>
        <div className='headerSpace searchDesign' />
        <div className='headerSpace linksDesign'>
          {
            (window.location.pathname === '/login') && <div className='link' onClick={() => navegar('/login')}><b>Login</b></div>
          }
          {
            (window.location.pathname !== '/login') && <div className='link' onClick={() => navegar('/login')}>Login</div>
          }
          {
            (window.location.pathname === '/register') && <div className='link' onClick={() => navegar('/register')}><b>Registro</b></div>
          }
          {
            (window.location.pathname !== '/register') && <div className='link' onClick={() => navegar('/register')}>Registro</div>
          }
        </div>
      </div>
    )
  } else {
    return (
      <div className='designHeaderGlobal'>
        {
          window.location.pathname !== '/display' &&
            <div className='designHeader'>
              <div className='headerSpace logoDesign'>
                <img className='logo' src={require('../../img/aiflix-logo.png')} alt='logo' onClick={() => navegar('/')} />
              </div>
              <div className='headerSpace searchDesign'>
                {/* {
                                    (window.location.pathname === "/film" || window.location.pathname === "/add") &&
                                    <Input.Group compact>
                                        <Input style={{ width: 'calc(100% - 200px)'}} placeholder="Busca una película por título" onChange={(ev) => manejador(ev)} />
                                        <Button style={{  backgroundColor:'black',border:"black"}} onClick={() => busquedaPorTitulo()} type="primary">Buscar</Button>
                                    </Input.Group>
                                } */}
                <div className='relleno' />
              </div>
              <div className='headerSpace linksDesign'>
                {/* {
                            ( window.location.pathname === "/add" ) &&
                            <div className="link" onClick={() => navegar("/add")}><b>Add</b></div>
                        }
                        {
                            (window.location.pathname !== "/add") &&
                            <div className="link" onClick={() => navegar("/add")}>Add</div>
                        } */}
                {
                  (props.credentials?.usuario.rol === true) && (window.location.pathname === '/admin') && <div className='link' onClick={() => navegar('/admin')}><b>Admin</b></div>

                }
                {
                  (props.credentials?.usuario.rol === true) && (window.location.pathname !== '/admin') && <div className='link' onClick={() => navegar('/admin')}>Admin</div>
                }

                {
                  (window.location.pathname === '/film') && <div className='link' onClick={() => navegar('/film')}><b>Películas</b></div>

                }
                {
                  (window.location.pathname !== '/film') && <div className='link' onClick={() => navegar('/film')}>Películas</div>
                }
                {
                  (window.location.pathname === '/profile') && <div className='link' onClick={() => navegar('/profile')}><b>{props.credentials?.usuario.nombre}</b></div>
                }
                {
                  (window.location.pathname !== '/profile') && <div className='link' onClick={() => navegar('/profile')}> {props.credentials?.usuario.nombre}</div>
                }
                {
                  (window.location.pathname === '/profile') && <div className='link' onClick={() => logOut()}> <b> Logout</b></div>
                }
                {
                  (window.location.pathname !== '/profile') && <div className='link' onClick={() => logOut()}>Logout</div>
                }
              </div>
            </div>
        }
        {
          window.location.pathname === '/display' &&
          (
            <div className='headerSpace logoDesign'>
              <img className='logoDisplay' src={require('../../img/volver.png')} alt='logo' onClick={() => navegar('/film')} />
            </div>
          )
        }
      </div>
    )
  }
}

export default connect((state) => ({
  credentials: state.credentials
}))(Header)
