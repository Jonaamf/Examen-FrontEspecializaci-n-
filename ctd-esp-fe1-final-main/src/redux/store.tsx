import { configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'; 
import reducer from "./reducer";
import rootSaga from '../sagas/index'; 

// Crea el middleware de Redux Saga
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
   reducer: {
      
       reducer: reducer
   },
   // Agrega el middleware de Redux Saga al middleware predeterminado
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

// Ejecuta la saga principal
sagaMiddleware.run(rootSaga);

// Tipamos el hook useSelector y useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


