import React from 'react';
import './boton-favorito.css';

/**
 * Propiedades del componente BotonFavorito.
 */
interface BotonFavoritoProps {
    esFavorito: boolean; // Indica si el botón representa un favorito activo o no
    onClick: () => void; // Función que se ejecuta cuando se hace clic en el botón
}

/**
 * Componente funcional que representa un botón de favorito con una imagen.
 * @param {BotonFavoritoProps} props - Propiedades del componente.
 * @returns {JSX.Element} Componente del botón de favorito.
 */
const BotonFavorito: React.FC<BotonFavoritoProps> = ({ esFavorito, onClick }) => {
    // Determina la ruta de la imagen del botón según si es favorito o no
    const src = esFavorito ? "/imagenes/star-filled.png" : "/imagenes/star.png";

    return (
        <div className="boton-favorito" onClick={onClick}>
            {/* Imagen del botón de favorito */}
            <img src={src} alt="favorito" />
        </div>
    );
};

export default BotonFavorito;

