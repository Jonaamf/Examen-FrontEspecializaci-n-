// sagas/index.ts
import { all } from 'redux-saga/effects';
import { watchFetchCharacters } from '../sagas/characterSaga'; // Ajusta la ruta y el nombre del archivo según tu estructura

// Exporta tu función rootSaga que combina todas las sagas
export default function* rootSaga() {
  yield all([
    watchFetchCharacters(),
    // Agrega otras sagas aquí si las tienes
  ]);
}
