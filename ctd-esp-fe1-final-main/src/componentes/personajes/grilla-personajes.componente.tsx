import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './grilla-personajes.css';
import BotonFavorito from '../botones/boton-favorito.componente';
import { RootState } from '../../redux/store';
import Paginacion from '../paginacion/paginacion.componente';
import { setFiltroNombre, agregarFavorito, quitarFavorito } from '../../redux/reducer';

/*
 * Interfaz que describe la estructura de un personaje en la API de Rick y Morty.
 */
export interface CharacterRickMorty {
    id: number;
    name: string;
    image: string;
    origin: string;
    gender: string;
    episode: [];
}

/*
 * Componente funcional que muestra una grilla de personajes con funcionalidad de filtrado y paginación.
 * 
 * @returns {JSX.Element} Componente de grilla de personajes.
 */
const GrillaPersonajes: React.FC = () => {
    const dispatch = useDispatch();
    const filtroNombre = useSelector((state: RootState) => state.reducer.filtroNombre);
    const favoritos = useSelector((state: RootState) => state.reducer.favoritos);
    const [characters, setCharacters] = useState<CharacterRickMorty[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    /*
     * Hook efecto que se ejecuta cuando cambian currentPage o filtroNombre.
     * Realiza una llamada a la API para obtener los personajes según los filtros aplicados.
     */
    useEffect(() => {
        fetchCharacters();
    }, [currentPage, filtroNombre]);

    /*
     * Función asincrónica que realiza una llamada a la API para obtener los personajes según los filtros aplicados.
     */
    const fetchCharacters = async () => {
        try {
            const baseUrl = 'https://rickandmortyapi.com/api/character';
            const urlWithParams = filtroNombre
                ? `${baseUrl}?name=${encodeURIComponent(filtroNombre)}&page=${currentPage}`
                : `${baseUrl}?page=${currentPage}`;
            const response = await fetch(urlWithParams);
            const data = await response.json();
            setCharacters(data.results || []);
            setTotalPages(data.info.pages);
        } catch (error) {
            console.error('Error al obtener los personajes:', error);
        }
    };

    /**
     * Agrega un personaje a la lista de favoritos.
     * @param {CharacterRickMorty} character - Personaje a agregar a favoritos.
     */
    const agregarAFavoritos = (character: CharacterRickMorty) => {
        dispatch(agregarFavorito(character));
    };

    /**
     * Quita un personaje de la lista de favoritos.
     * @param {CharacterRickMorty} character - Personaje a quitar de favoritos.
     */
    const quitarDeFavoritos = (character: CharacterRickMorty) => {
        dispatch(quitarFavorito(character.id));
    };

    /**
     * Verifica si un personaje está en la lista de favoritos.
     * @param {CharacterRickMorty} character - Personaje a verificar.
     * @returns {boolean} true si el personaje está en la lista de favoritos, false de lo contrario.
     */
    const esFavorito = (character: CharacterRickMorty) => {
        return favoritos.some((fav: CharacterRickMorty) => fav.id === character.id);
    };

    /**
     * Maneja el cambio en el campo de entrada de texto para el filtro por nombre.
     * @param {React.ChangeEvent<HTMLInputElement>} event - Evento de cambio generado por el campo de entrada.
     */
    const handleFiltroNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filtro = event.target.value;
        dispatch(setFiltroNombre(filtro));
        setCurrentPage(1); // Reinicia la página actual a 1 cada vez que se cambia el filtro
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
                habilitarSiguiente={currentPage < totalPages}
            />
        </div>
    );
};

export default GrillaPersonajes;
