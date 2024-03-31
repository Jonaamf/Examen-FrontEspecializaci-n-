import React from 'react';
import '../paginacion/paginacion.css'

interface PaginacionProps {
    paginaAnterior: () => void;
    paginaSiguiente: () => void;
    habilitarAnterior: boolean;
    habilitarSiguiente: boolean;
}

const Paginacion: React.FC<PaginacionProps> = ({ paginaAnterior, paginaSiguiente, habilitarAnterior, habilitarSiguiente }) => {
    return (
        <div className="paginacion">
            <button onClick={paginaAnterior} disabled={!habilitarAnterior}>Anterior</button>
            <button onClick={paginaSiguiente} disabled={!habilitarSiguiente}>Siguiente</button>
        </div>
    );
};

export default Paginacion;

