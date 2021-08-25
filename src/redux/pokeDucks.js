//unir varios procedimientos

import axios from "axios";

//CONSTANTES
//aca se consume a la api que se llamo y se manda al App.jsx

const dataInicial = {
  //para guardar y listar a los pokemones que vienen en la api
  count: 0,
  next: null,
  previous: null,
  results: [],
};

//obtener pokemones
//type
const GET_POKEMONES_EXITO = "GET_POKEMONES_EXITO";
const NEXT_POKEMONES_EXITO = "NEXT_POKEMONES_EXITO";
const INFO_POKEMONES_EXITO = "INFO_POKEMONES_EXITO";

//REDUCER
//acepta la api (lista de pokemones) y la manda a una constante

//state=estado inicial y action = las acciones
//siempre parte con el data inicial de arriba en el estado(state)
export default function pokeReducer(state = dataInicial, action) {
  //si el action.type va cambiando y se quieren generar acciones
  switch (action.type) {
    case GET_POKEMONES_EXITO:
      return { ...state, ...action.payload };
    case NEXT_POKEMONES_EXITO:
      return {
        ...state,
        ...action.payload,
        // array: action.payload.array,
        // offset: action.payload.offset,
      };

    case INFO_POKEMONES_EXITO:
      return { ...state, unPokemon: action.payload };
    //en el caso de que no se mande un ningun type o no lo pueda leer, se quede con el state inicial
    default:
      return state;
  }
}

//ACCION
/*Aca se va a consumir la api, esa es la accion*/
//El primer arrow function rescibe los parametros que necesitemos enviar a la funcion
//El segundo arrow function necesita dispach(va activar el REDUCER) y el state(se obtiene la info que se este almacenando en el dataInicial)
//no es necesario ocupar el getState
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
  // console.log("get state", getState().pokemones);
  // const offset = getState().pokemones.offset;
  // getState();

  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`
    );
    dispatch({
      type: GET_POKEMONES_EXITO,
      //aqui donde se obtiene la lista de pokemones y viaja al action
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

//funcion para correr los pokemones de 20 en 20
export const siguientePokeAction = () => async (dispatch, getState) => {
  // const offset = getState().pokemones.offset;

  // //este numero corresponde al numero que se le asigno en la funcion de Pokemones.jsx(20) y es dinamico

  // const siguiente = offset + numero;

  //pokemones viene del store
  const next = getState().pokemones.next;

  try {
    const res = await axios.get(
      next
      // `https://pokeapi.co/api/v2/pokemon?offset=${next}&limit=20`
    );
    console.log(res.data);
    dispatch({
      type: NEXT_POKEMONES_EXITO,
      payload: res.data,

      // {
      //   // data lo proporciona axios
      //   array: res.data.results,
      //   offset: siguiente,
      // },
    });
  } catch (error) {
    console.log(error);
  }
};

export const anteriorPokemonAccion = () => async (dispatch, getState) => {
  const { previous } = getState().pokemones;

  try {
    const res = await axios.get(previous);
    console.log(res.data);
    dispatch({
      type: NEXT_POKEMONES_EXITO,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const PokeDetalleAccion =
  (url = "https://pokeapi.co/api/v2/pokemon/1/") =>
  async (dispatch) => {
    try {
      const res = await axios.get(url);
      // console.log(res.data);
      dispatch({
        type: INFO_POKEMONES_EXITO,
        payload: {
          nombre: res.data.name,
          ancho: res.data.weight,
          alto: res.data.height,
          foto: res.data.sprites.front_default,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

/*TENEMOS ACCIONES -> LAS ACCIONES SE PROCESAN EN EL REDUCER Y ESTE RETORNA UNA ACCION QUE VA A MODIFICAR AL ARRAY INICIAL  */
