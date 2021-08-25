import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cerrarSesionAccion } from '../redux/usuarioDuck'

import {withRouter} from'react-router-dom'

const Navbar = (props) => {


    const dispatch = useDispatch()

    const cerrarSesion = ()=>{
        dispatch(cerrarSesionAccion())
        props.history.push('/login')
    }

    //este activo esta en falso
    const activo = useSelector(store=> store.usuario.activo)


    return (
        <div className="navbar navbar-dark bg-dark w-100">
            <Link className="navbar-brand" to="/">APP Poke</Link>
            <div className="d-flex">
                {
                    activo ? (
                        <>
                        
                        <NavLink className="btn btn-dark me-2" to="/" exact> Inicio</NavLink>
                        <NavLink className="btn btn-dark me-2" to="/perfil" exact> Perfil</NavLink>

                        <button 
                        className="btn btn-dark me-2"
                        onClick={()=>cerrarSesion()}                
                        >Cerrar Sesion</button>
                        </>
                    ) : (

                        <NavLink  className="btn btn-dark me-2" to="Login" exact> Login</NavLink>
                    )
                }

                
            </div>
            
        </div>
    )
}

export default withRouter(Navbar ) 
