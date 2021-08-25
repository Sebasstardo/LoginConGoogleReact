import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { actualizarUsuarioAccion, editarFotoAccion } from '../redux/usuarioDuck' 

const Perfil = () => {



    const usuario = useSelector(store =>store.usuario.user)
    const loading = useSelector(store => store.usuario.loading)
    console.log(usuario)

    const [nombreUsuario,setNombreUsuario] = React.useState(usuario.displayName)
    const [activarFormulario, setActivarFormulario] = React.useState(false)

    const dispatch = useDispatch()

    const actualizarUsuario = ()=> {

        if(!nombreUsuario.trim()){
            console.log('Nombre Vacio')
            return
        }
        dispatch(actualizarUsuarioAccion(nombreUsuario))
        setActivarFormulario(false)
    }
    const [error, setError] = React.useState(false)
    const seleccionarArchivo = imagen =>{
        // console.log(imagen.target.files[0])

        const imagenCliente =  imagen.target.files[0]
        if( imagenCliente === undefined){
            return
        }
        if(imagenCliente.type === "image/png" ||imagenCliente.type === "image/jpg" ){
            dispatch(editarFotoAccion(imagenCliente))
            setError(false)
        } else{
            setError(true)
        }
    }

    return (
        <div className="mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src={usuario.photoURL} alt=""/>
                    <h5 className="card-title">Nombre de Usuario : {usuario.displayName}</h5>
                    <p className="card-text">Email: {usuario.email}</p>
                    <button 
                    className="btn btn-dark"
                    onClick={()=> setActivarFormulario(true)}
                    >
                        Editar Nombre
                    </button>
                    {
                        error &&
                        <div className="alert alert-warning mt-2">
                            Solo archivos .png o .jpg
                        </div>
                    }
                    <div className="input-group mb-3 mt-2">
                        <input 
                        type="file" 
                        className="form-control" 
                        id="inputGroupFile02"
                        style={{display:'none'}}
                        onChange={e=> seleccionarArchivo(e)}
                        />
                        <label 
                        className="btn btn-dark mt-2" 
                        htmlFor="inputGroupFile02">Actualizar Imagen</label>

                        </div>
                </div>
                {
                    loading &&
                    <div className="card-body">

                    <div className="d-flex justify-content-center my-3">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                    </div>
                }
                {
                    activarFormulario &&
                    <div className="card-body">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="input-group mb-3">
                                <input 
                                type="text" 
                                className="form-control" 
                                value={nombreUsuario}
                                onChange={e=> setNombreUsuario(e.target.value)}
                                aria-describedby="button-addon2"
                                />
                                <button className="btn btn-dark mt-2 disabled" 
                                type="button" 
                                onClick={()=>actualizarUsuario()}
                                >Actualizar</button>
                            </div>
                        </div>
                    </div>
                </div>
                }

            </div>
            
        </div>
    )
}

export default Perfil
