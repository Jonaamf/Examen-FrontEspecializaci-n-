import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';
import Paginacion from '../paginacion/paginacion.componente';
import BotonFavorito from '../botones/boton-favorito.componente';
import { RootState } from '../../redux/store';
import { setFiltroNombre, agregarFavorito, quitarFavorito, quitarTodosLosFavoritos } from '../../redux/reducer';

export interface CharacterRickMorty {
    id: number;
    name: string;
    image: string;
}

const GrillaPersonajes: React.FC = () => {
    const dispatch = useDispatch();
    const filtroNombre = useSelector((state: RootState) => state.reducer.filtroNombre);
    const favoritos = useSelector((state: RootState) => state.reducer.favoritos);
    const [characters, setCharacters] = useState<CharacterRickMorty[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1); // Agregamos estado para el total de páginas

    useEffect(() => {
        fetchCharacters();
    }, [currentPage, filtroNombre]); // Agregar filtroNombre como dependencia

    const fetchCharacters = async () => {
        try {
            // Si hay un filtro de nombre, lo aplicamos en la llamada a la API
            const baseUrl = 'https://rickandmortyapi.com/api/character';
            const urlWithParams = filtroNombre
                ? `${baseUrl}?name=${encodeURIComponent(filtroNombre)}&page=${currentPage}`
                : `${baseUrl}?page=${currentPage}`;
            const response = await fetch(urlWithParams);
            const data = await response.json();
            setCharacters(data.results);
            setTotalPages(data.info.pages); // Actualizamos el total de páginas
        } catch (error) {
            console.error('Error al obtener los personajes:', error);
        }
    };

    const agregarAFavoritos = (character: CharacterRickMorty) => {
        dispatch(agregarFavorito(character));
    };

    const quitarDeFavoritos = (character: CharacterRickMorty) => {
        dispatch(quitarFavorito(character.id));
    };

    const limpiarFavoritos = () => {
        dispatch(quitarTodosLosFavoritos());
        localStorage.removeItem('favoritos');
    };

    const esFavorito = (character: CharacterRickMorty) => {
        return favoritos.some((fav: CharacterRickMorty) => fav.id === character.id);
    };

    const handleFiltroNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filtro = event.target.value;
        dispatch(setFiltroNombre(filtro));
        // Reiniciar la página actual a 1 cada vez que se cambia el filtro
        setCurrentPage(1);
    };

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
                {characters.length > 0 ? (
                    characters.map((character) => (
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
                paginaAnterior={() => setCurrentPage(currentPage - 1)}
                paginaSiguiente={() => setCurrentPage(currentPage + 1)}
                habilitarAnterior={currentPage > 1}
                habilitarSiguiente={currentPage < totalPages} // Deshabilitar el botón siguiente si no hay más páginas
            />
        </div>
    );
};

export default GrillaPersonajes;









