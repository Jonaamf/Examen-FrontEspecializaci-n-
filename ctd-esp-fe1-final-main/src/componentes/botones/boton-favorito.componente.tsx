import React from 'react';
import './boton-favorito.css';

interface BotonFavoritoProps {
    esFavorito: boolean;
    onClick: () => void;
}

const BotonFavorito: React.FC<BotonFavoritoProps> = ({ esFavorito, onClick }) => {
    const src = esFavorito ? "/imagenes/star-filled.png" : "/imagenes/star.png";

    return (
        <div className="boton-favorito" onClick={onClick}>
            <img src={src} alt="favorito" />
        </div>
    );
};

export default BotonFavorito;
