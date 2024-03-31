import { call, put, takeEvery } from 'redux-saga/effects';
import { setCharacters, FETCH_CHARACTERS } from '../redux/reducer'; // Importa tus acciones y tipos de acción

// Define tu saga para manejar la obtención de personajes
function* fetchCharacters(): Generator<any, void, any> {
  try {
    const response = yield call(fetch, 'https://rickandmortyapi.com/api/character');
    const data = yield response.json();
    yield put(setCharacters(data.results)); // Dispatch de la acción para actualizar los personajes en el store
  } catch (error) {
    console.error('Error al obtener los personajes:', error);
  }
}

// Define la función para observar la acción FETCH_CHARACTERS
export function* watchFetchCharacters(): Generator<any, void, any> {
  yield takeEvery(FETCH_CHARACTERS, fetchCharacters);
}
