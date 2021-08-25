import React from 'react'

//useDispatch es para consumir la accion
//useSelector sirve para leer el array del pokeducks

import{useDispatch, useSelector} from 'react-redux'
import{ anteriorPokemonAccion, obtenerPokemonesAccion, siguientePokeAction, PokeDetalleAccion } from '../redux/pokeDucks'
import Detalle from './Detalle'

const Pokemones = () => {

    const dispatch = useDispatch()
    const pokemones = useSelector(store => store.pokemones.results)
    // console.log(pokemones)

    const next = useSelector(store=> store.pokemones.next)
    const previous = useSelector(store=> store.pokemones.previous)


    return (
        <div className="row mt-5">
            <div className="col-md-6 text-center">

            Lista de pokemones


            <ul className="list-group mt-4">
                {
                    pokemones.map(item =>(
                        <li className="list-group-item text-uppercase"  key={item.name}>
                            {item.name}
                            <button 
                            onClick={()=>dispatch(PokeDetalleAccion(item.url))}
                            className="btn btn-dark btn-sm float-end">Info</button>
                        
                        </li>
                    ))
                }
            </ul>

            <div className ="d-flex justify-content-evenly mt-3 mb-3">

            {
                pokemones.length === 0 &&
            <button onClick={()=> dispatch(obtenerPokemonesAccion())}
                    className="btn btn-dark"
                    >Obtener Pokemon</button>

            }
            {
                next &&
            <button onClick={()=>dispatch(siguientePokeAction())}
            className="btn btn-dark">Siguiente</button>

            }
            {
                previous &&
                    //  {/* cada vez que se presione tienes llamar a esa accion del pokeDucks, que es la lista de los pokemones */}
            <button onClick={()=>dispatch(anteriorPokemonAccion())}
            className="btn btn-dark">Anterior</button>
            }
            </div>

     


            </div>

            <div className="col-md-6">
                <h3>Detalle Pokemon</h3>
               <Detalle></Detalle>
            </div>
        </div>
    )
}

export default Pokemones
