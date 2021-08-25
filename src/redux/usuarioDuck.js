import { firebase, auth, db, storage } from "../firebase";

//DATA INICIAL
const dataInicial = {
  //sirve para deshabilitar botones cuando el usuairo se este logeando
  loading: false,
  //sirve para cuando el usuario este activo o no
  activo: false,
};
//TYPES
const LOAD = "LOAD";
const USUARIO_ERROR = "USUARIO_ERROR";
const USUARIO_EXITO = "USUARIO_EXITO";
const CERRAR_SESION = "CERRAR_SESION";

//REDUCER

export default function usuarioReducer(state = dataInicial, action) {
  switch (action.type) {
    case LOAD:
      return { ...state, loading: true };
    case USUARIO_ERROR:
      return { ...dataInicial };
    case USUARIO_EXITO:
      return { ...state, loading: false, user: action.payload, activo: true };
    case CERRAR_SESION:
      return { ...dataInicial };
    default:
      return { ...state };
  }
}
//ACTION
export const ingresoUsuarioAccion = () => async (dispatch) => {
  //este dispatch se va a ejecutar independiente del trycatch
  dispatch({
    type: LOAD,
  });

  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    //que se acceda con un proveedor, que en este caso va a ser google
    const res = await auth.signInWithPopup(provider);
    // console.log(res.user);

    //info que viene de google
    const usuario = {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
    };
    // console.log(usuario);

    const userDB = await db.collection("usuarios").doc(usuario.email).get();

    console.log(userDB);

    if (userDB.exists) {
      //Cuando existe el usuario en firestore
      dispatch({
        type: USUARIO_EXITO,
        payload: userDB.data(),
      });
      localStorage.setItem("usuario", JSON.stringify(userDB.data()));
    } else {
      //cuando no existe el usuario en firestore
      await db.collection("usuarios").doc(usuario.email).set(usuario);

      dispatch({
        type: USUARIO_EXITO,
        payload: usuario,
      });
      localStorage.setItem("usuario", JSON.stringify(usuario));
    }
  } catch (error) {
    console.log("no existe");
    dispatch({
      type: USUARIO_ERROR,
    });
  }
};

export const leerUsuarioActivoAccion = () => (dispatch) => {
  if (localStorage.getItem("usuario")) {
    dispatch({
      type: USUARIO_EXITO,
      payload: JSON.parse(localStorage.getItem("usuario")),
    });
  }
};

export const cerrarSesionAccion = () => (dispatch) => {
  //cierra todas las sesiones que esten activas
  auth.signOut();
  localStorage.removeItem("usuario");
  dispatch({
    type: CERRAR_SESION,
  });
};

export const actualizarUsuarioAccion =
  (nombreActualizado) => async (dispatch, getState) => {
    dispatch({
      type: LOAD,
    });
    const { user } = getState().usuario;
    try {
      await db.collection("usuarios").doc(user.email).update({
        displayName: nombreActualizado,
      });

      const usuario = {
        ...user,
        displayName: nombreActualizado,
      };

      dispatch({
        type: USUARIO_EXITO,
        payload: usuario,
      });
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } catch (error) {
      console.log(error);
    }
  };

export const editarFotoAccion =
  (imagenEditada) => async (dispatch, getState) => {
    dispatch({
      type: LOAD,
    });
    const { user } = getState().usuario;

    try {
      const imagenRef = await storage
        .ref()
        .child(user.email)
        .child("foto perfil");
      await imagenRef.put(imagenEditada);
      const imagenURL = await imagenRef.getDownloadURL();

      await db.collection("usuarios").doc(user.email).update({
        photoURL: imagenURL,
      });

      const usuario = {
        ...user,
        photoURL: imagenURL,
      };

      dispatch({
        type: USUARIO_EXITO,
        payload: usuario,
      });

      localStorage.setItem("usuario", JSON.stringify(usuario));
    } catch (error) {}
  };
