import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';
import Paginacion from '../paginacion/paginacion.componente';
import BotonFavorito from '../botones/boton-favorito.componente';
import { RootState } from '../../redux/store';
import { setFiltroNombre, setCharacters, agregarFavorito, quitarFavorito, quitarTodosLosFavoritos, FETCH_CHARACTERS } from '../../redux/reducer';

export interface CharacterRickMorty {
    id: number;
    name: string;
    image: string;
}

const GrillaPersonajes: React.FC = () => {
    const [paginaActual, setPaginaActual] = useState<number>(1);
    const dispatch = useDispatch();
    const characters = useSelector((state: RootState) => state.reducer.characters);
    const filtroNombre = useSelector((state: RootState) => state.reducer.filtroNombre);
    const favoritos = useSelector((state: RootState) => state.reducer.favoritos);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${paginaActual}`);
                const data = await response.json();
                dispatch(setCharacters(data.results));
            } catch (error) {
                console.error('Error al obtener los personajes:', error);
            }
        };

        fetchCharacters();
    }, [paginaActual, dispatch]);

    // Agregar la acción FETCH_CHARACTERS aquí
    useEffect(() => {
        dispatch({ type: FETCH_CHARACTERS });
    }, [dispatch]);

    const agregarAFavoritos = (character: CharacterRickMorty) => {
        dispatch(agregarFavorito(character));
    };

    const quitarDeFavoritos = (character: CharacterRickMorty) => {
        dispatch(quitarFavorito(character.id));
    };

    const limpiarFavoritos = () => {
        dispatch(quitarTodosLosFavoritos()); // Llamar a la acción quitarTodosLosFavoritos para eliminar todos los favoritos
        localStorage.removeItem('favoritos'); // También limpiar la lista de favoritos del almacenamiento local
    };

    const esFavorito = (character: CharacterRickMorty) => {
        return favoritos.some((fav: CharacterRickMorty) => fav.id === character.id);
    };

    const handleFiltroNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filtro = event.target.value;
        dispatch(setFiltroNombre(filtro));
    };

    const charactersFiltrados = characters ? characters.filter((character: CharacterRickMorty) =>
        character.name.toLowerCase().includes(filtroNombre.toLowerCase())
    ) : [];

    return (
        <div>
            <div className="filtros">
                <label htmlFor="nombre">Filtrar por nombre:</label>
                <input
                    type="text"
                    placeholder="Rick, Morty, Beth, Alien, ...etc"
                    name="nombre"
                    value={filtroNombre}
                    onChange={handleFiltroNombreChange}
                />
            </div>
            <div className="grilla-personajes">
                {charactersFiltrados.length > 0 ? (
                    charactersFiltrados.map((character: CharacterRickMorty) => (
                        <div key={character.id} className="tarjeta-personaje">
                            <img src={character.image} alt={character.name} />
                            <div className="tarjeta-personaje-body">
                                <span>{character.name}</span>
                                <BotonFavorito
                                    esFavorito={esFavorito(character)}
                                    onClick={() => {
                                        if (esFavorito(character)) {
                                            quitarDeFavoritos(character);
                                        } else {
                                            agregarAFavoritos(character);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron personajes.</p>
                )}
            </div>
            <Paginacion
                paginaAnterior={() => setPaginaActual(paginaActual - 1)}
                paginaSiguiente={() => setPaginaActual(paginaActual + 1)}
                habilitarAnterior={paginaActual > 1}
                habilitarSiguiente={true} // Esto puede ajustarse dependiendo de si hay más personajes disponibles
            />
            <button onClick={limpiarFavoritos}>Limpiar Favoritos</button>
        </div>
    );
};

export default GrillaPersonajes;
