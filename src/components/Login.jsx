import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ingresoUsuarioAccion} from '../redux/usuarioDuck'
import {withRouter} from 'react-router-dom'

const Login = (props) => {
    
   
    const dispatch = useDispatch()
    const loading = useSelector(store=> store.usuario.loading)
    const activo = useSelector(store=> store.usuario.activo)
    // console.log(activo)

    React.useEffect(()=>{

        // console.log(activo)
        //indica que el activo esta en verdadero
        if(activo){
            props.history.push('/')
        }
    },[activo, props.history])


    // console.log(loading)
    return (
        <div className="mt-5 text-center">
           <h3>Ingreso con Google</h3>
            <hr />
            <button 
            className="btn btn-dark"
            onClick={()=> dispatch(ingresoUsuarioAccion())}
            disabled = {loading}
            >Acceder</button>
        </div>
    )
}

export default withRouter(Login ) 
