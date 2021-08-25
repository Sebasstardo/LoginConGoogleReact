import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { PokeDetalleAccion } from '../redux/pokeDucks'

const Detalle = () => {

    const dispatch = useDispatch()

    React.useEffect(()=>{

        const fetchData = ()=>{
            dispatch(PokeDetalleAccion())
        }
        fetchData()
    },[dispatch])

    const pokemon = useSelector(store => store.pokemones.unPokemon)
    // console.log(pokemon)

    return pokemon ? (
        <div className="card mt-5">
            <img src={pokemon.foto} className="img-fluid"/>
            <div className="card-title">{pokemon.nombre}</div>
            <p className="card-text">Alto:{pokemon.alto} | Ancho:{pokemon.ancho}  </p>
            
        </div>
    ) : null
}

export default Detalle
