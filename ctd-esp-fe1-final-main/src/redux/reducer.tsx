import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterRickMorty } from '../componentes/personajes/grilla-personajes.componente';

// Constante que define la acción FETCH_CHARACTERS
export const FETCH_CHARACTERS = 'FETCH_CHARACTERS' as const;

// Define la forma del estado inicial
interface MiReducerState {
  characters: CharacterRickMorty[]; // Array de personajes
  filtroNombre: string; // Filtro por nombre
  favoritos: CharacterRickMorty[]; // Array de personajes favoritos
}

// Estado inicial del reducer
const initialState: MiReducerState = {
  characters: [], // Sin personajes inicialmente
  filtroNombre: '', // Filtro de nombre vacío inicialmente
  favoritos: [], // Sin personajes favoritos inicialmente
};

// Crea el slice del reducer con las acciones definidas
const miReducerSlice = createSlice({
  name: 'miReducer', // Nombre del slice
  initialState, // Estado inicial
  reducers: {
    // Action para establecer los personajes
    setCharacters(state, action: PayloadAction<CharacterRickMorty[]>) {
      state.characters = action.payload;
    },
    // Action para establecer el filtro por nombre
    setFiltroNombre(state, action: PayloadAction<string>) {
      state.filtroNombre = action.payload;
    },
    // Action para agregar un personaje a favoritos
    agregarFavorito(state, action: PayloadAction<CharacterRickMorty>) {
      state.favoritos.push(action.payload);
    },
    // Action para quitar un personaje de favoritos
    quitarFavorito(state, action: PayloadAction<number>) {
      state.favoritos = state.favoritos.filter((fav) => fav.id !== action.payload);
    },
    // Action para quitar todos los personajes de favoritos
    quitarTodosLosFavoritos(state) {
      state.favoritos = [];
    },
  },
});

// Define el reducer para la acción FETCH_CHARACTERS (no utilizado en este slice)
export const fetchCharactersReducer = (state: MiReducerState, action: PayloadAction<CharacterRickMorty[]>) => {
  state.characters = action.payload;
};

// Exporta los actions y el reducer
export const { setFiltroNombre, agregarFavorito, quitarFavorito, quitarTodosLosFavoritos, setCharacters } = miReducerSlice.actions;
export default miReducerSlice.reducer;



