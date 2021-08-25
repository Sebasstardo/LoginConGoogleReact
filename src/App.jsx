import React from "react";

import Pokemones from "./components/Pokemones";
import Login from "./components/Login";
import Perfil from "./components/Perfil";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Navbar from "./components/Navbar";

import {auth} from './firebase'

function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false)

  


      React.useEffect(() => {

         const fetchUser = ()=>{
        auth.onAuthStateChanged(user => {
            // console.log(user)
            if(user){
                setFirebaseUser(user)
            }else{
                setFirebaseUser(null)
            }
        })
      }
        fetchUser()
    }, [])

    const RutaPrivada = ({component, path, ...rest}) =>{

      //si no existe el usuario, se mandao al index
      if(localStorage.getItem('usuario')){
        const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))
        if(usuarioStorage.uid === firebaseUser.uid){

          return <Route component={component} path={path} {...rest} />

        } else{
        return <Redirect to="/login" {...rest}></Redirect>

        }
      } else{
        return <Redirect to="/login" {...rest}></Redirect>
      }

    }
  return firebaseUser !== false ?(

    <Router>
      
    <div className="container mt-5">
      <Navbar></Navbar>

      <Switch>
        <RutaPrivada component={Pokemones} path ="/" exact/>
        <RutaPrivada component={Perfil} path ="/perfil" exact/>

        <Route component={Login} path ="/login" />
      </Switch>
    </div>
    </Router>
  ) : (<div>Cargando...</div>)

  
}

export default App;
