import React, { useState, useEffect } from 'react';
import TarjetaPersonaje from '../componentes/personajes/tarjeta-personaje.componente';

interface Character {
    id: number;
    name: string;
    image: string;
}

const PaginaFavoritos = () => {
    const [favoritos, setFavoritos] = useState<Character[]>([]);

    useEffect(() => {
        const favoritosActuales = JSON.parse(localStorage.getItem('favoritos') || '[]');
        setFavoritos(favoritosActuales);
    }, []);

    return (
        <div className="container">
            <div className="actions">
                <h3>Personajes Favoritos</h3>
                <div className="grilla-personajes">
                    {favoritos.map((character: Character) => (
                        <TarjetaPersonaje key={character.id} character={character} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PaginaFavoritos;
