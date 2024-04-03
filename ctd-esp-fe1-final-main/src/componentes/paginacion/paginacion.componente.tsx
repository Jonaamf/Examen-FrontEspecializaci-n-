import React from 'react';
import '../paginacion/paginacion.css'

/**
 * Propiedades del componente Paginacion.
 */
interface PaginacionProps {
    paginaAnterior: () => void; // Función para ir a la página anterior
    paginaSiguiente: () => void; // Función para ir a la página siguiente
    habilitarAnterior: boolean; // Indica si el botón de página anterior está habilitado
    habilitarSiguiente: boolean; // Indica si el botón de página siguiente está habilitado
}

/**
 * Componente funcional que representa un componente de paginación con botones para ir a la página anterior y siguiente.
 * @param {PaginacionProps} props - Propiedades del componente.
 * @returns {JSX.Element} Componente de paginación.
 */
const Paginacion: React.FC<PaginacionProps> = ({ paginaAnterior, paginaSiguiente, habilitarAnterior, habilitarSiguiente }) => {
    return (
        <div className="paginacion">
            {/* Botón para ir a la página anterior */}
            <button onClick={paginaAnterior} disabled={!habilitarAnterior}>Anterior</button>
            {/* Botón para ir a la página siguiente */}
            <button onClick={paginaSiguiente} disabled={!habilitarSiguiente}>Siguiente</button>
        </div>
    );
};

export default Paginacion;


