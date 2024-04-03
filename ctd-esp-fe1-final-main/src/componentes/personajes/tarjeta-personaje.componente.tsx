import React from 'react';
import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';

/**
 * Interfaz que describe la estructura de un personaje.
 */
interface Character {
    id: number;
    name: string;
    image: string;
    // Otras propiedades del personaje que necesites mostrar
}

/**
 * Propiedades del componente TarjetaPersonaje.
 */
interface TarjetaPersonajeProps {
    character: Character; // El personaje a mostrar en la tarjeta
}

/**
 * Componente funcional que representa una tarjeta de personaje con imagen y botón de favorito.
 * @param {TarjetaPersonajeProps} props - Propiedades del componente.
 * @returns {JSX.Element} Tarjeta de personaje.
 */
const TarjetaPersonaje: React.FC<TarjetaPersonajeProps> = ({ character }) => {
    /**
     * Maneja el clic en el botón de favorito.
     */
    const handleFavoritoClick = () => {
        // Lógica para manejar el clic del botón favorito
    };

    return (
        <div className="tarjeta-personaje">
            <img src={character.image} alt={character.name} />
            <div className="tarjeta-personaje-body">
                <span>{character.name}</span>
                {/* Pasamos la función onClick al componente BotonFavorito */}
                <BotonFavorito esFavorito={false} onClick={handleFavoritoClick} />
            </div>
        </div>
    );
}

export default TarjetaPersonaje;
