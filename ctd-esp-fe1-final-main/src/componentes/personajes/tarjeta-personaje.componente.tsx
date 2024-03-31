import React from 'react';
import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';

interface Character {
    id: number;
    name: string;
    image: string;
    // Otras propiedades del personaje que necesites mostrar
}

interface TarjetaPersonajeProps {
    character: Character;
}

const TarjetaPersonaje: React.FC<TarjetaPersonajeProps> = ({ character }) => {
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

