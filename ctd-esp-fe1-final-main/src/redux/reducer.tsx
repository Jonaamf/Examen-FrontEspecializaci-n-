import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterRickMorty } from '../componentes/personajes/grilla-personajes.componente';

// Define FETCH_CHARACTERS como una constante exportada
export const FETCH_CHARACTERS = 'FETCH_CHARACTERS' as const;

// Define el estado inicial
interface MiReducerState {
  characters: CharacterRickMorty[];
  filtroNombre: string;
  favoritos: CharacterRickMorty[];
}

const initialState: MiReducerState = {
  characters: [],
  filtroNombre: '',
  favoritos: [],
};

// Crea el slice del reducer
const miReducerSlice = createSlice({
  name: 'miReducer',
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<CharacterRickMorty[]>) {
      state.characters = action.payload;
    },
    setFiltroNombre(state, action: PayloadAction<string>) {
      state.filtroNombre = action.payload;
    },
    agregarFavorito(state, action: PayloadAction<CharacterRickMorty>) {
      state.favoritos.push(action.payload);
    },
    quitarFavorito(state, action: PayloadAction<number>) {
      state.favoritos = state.favoritos.filter((fav) => fav.id !== action.payload);
    },
    quitarTodosLosFavoritos(state) {
      state.favoritos = [];
    },
  },
});

// Define el reducer para la acción FETCH_CHARACTERS
export const fetchCharactersReducer = (state: MiReducerState, action: PayloadAction<CharacterRickMorty[]>) => {
  state.characters = action.payload;
};

// Exporta los actions y el reducer
export const { setFiltroNombre, agregarFavorito, quitarFavorito, quitarTodosLosFavoritos, setCharacters } = miReducerSlice.actions;
export default miReducerSlice.reducer;


