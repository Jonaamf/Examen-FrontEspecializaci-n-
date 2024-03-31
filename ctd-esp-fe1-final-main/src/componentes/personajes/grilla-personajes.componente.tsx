import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';
import Paginacion from '../paginacion/paginacion.componente';
import BotonFavorito from '../botones/boton-favorito.componente';
import { RootState } from '../../redux/store';
import { setFiltroNombre, setCharacters, agregarFavorito, quitarFavorito } from '../../redux/reducer'; // Importa las acciones necesarias

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
                dispatch(setCharacters(data.results)); // Utiliza dispatch para llamar a la acción setCharacters
            } catch (error) {
                console.error('Error al obtener los personajes:', error);
            }
        };

        fetchCharacters();
    }, [paginaActual, dispatch]);

    useEffect(() => {
        const favoritosActuales = JSON.parse(localStorage.getItem('favoritos') || '[]');
        dispatch(agregarFavorito(favoritosActuales)); // Utiliza dispatch para llamar a la acción setFavoritos
    }, [dispatch]);

    const agregarAFavoritos = (character: CharacterRickMorty) => {
        const nuevosFavoritos = [...favoritos, character];
        dispatch(agregarFavorito(nuevosFavoritos)); // Utiliza dispatch para llamar a la acción setFavoritos
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    };

    const quitarDeFavoritos = (character: CharacterRickMorty) => {
        dispatch(quitarFavorito(character.id)); // Utiliza dispatch para llamar a la acción quitarFavorito
        const nuevosFavoritos = favoritos.filter((fav: CharacterRickMorty) => fav.id !== character.id);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    };
    

    const esFavorito = (character: CharacterRickMorty) => {
        return favoritos.some((fav: CharacterRickMorty) => fav.id === character.id);
    };

    const handleFiltroNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filtro = event.target.value;
        dispatch(setFiltroNombre(filtro)); // Utiliza dispatch para llamar a la acción setFiltroNombre
    };

    const paginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    };

    const paginaSiguiente = () => {
        setPaginaActual(paginaActual + 1);
    };

    // Filtrar los personajes según el filtro de nombre
    const charactersFiltrados = characters.filter((character: CharacterRickMorty) =>
        character.name.toLowerCase().includes(filtroNombre.toLowerCase())
    );

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
                {charactersFiltrados.map((character: CharacterRickMorty) => (
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
                ))}
            </div>
            <Paginacion
                paginaAnterior={paginaAnterior}
                paginaSiguiente={paginaSiguiente}
                habilitarAnterior={paginaActual > 1}
                habilitarSiguiente={true} // Esto puede ajustarse dependiendo de si hay más personajes disponibles
            />
        </div>
    );
};

export default GrillaPersonajes;
