//middleware sirve para trabajar en las promesas que vienen en el thunk
//aca se mezcla todo lo que venga en la carpeta y se puedan ocupar en los componentes
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//siempre hay que importar todos los reducer que se crean
import pokeReducer from "./pokeDucks";
import usuarioReducer, { leerUsuarioActivoAccion } from "./usuarioDuck";

const rootReducer = combineReducers({
  //este nombre es el que se va a leer en los componentes, de donde se va a consumir el pokeDucks
  pokemones: pokeReducer,
  usuario: usuarioReducer,
  //usuario: usuarioReducer aca se combinan los nombres de los ducks que se hagan
});
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    //para relacionarle con chrome, firefox no funciona
    composeWithDevTools(applyMiddleware(thunk))
  );
  leerUsuarioActivoAccion()(store.dispatch);

  return store;
}
