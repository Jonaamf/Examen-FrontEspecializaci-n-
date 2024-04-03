import React from 'react';
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente";
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { useDispatch } from 'react-redux';
import { setFiltroNombre } from '../redux/reducer';

const PaginaInicio = () => {
    const dispatch = useDispatch();

    const limpiarFiltros = () => {
        dispatch(setFiltroNombre(''));
    };

    return (
        <div className="container">
            <div className="actions">
                <h3>Catálogo de Personajes</h3>
                <button className="danger" onClick={limpiarFiltros}>Limpiar filtros</button>
            </div>
            <Paginacion />
            <GrillaPersonajes />
        </div>
    );
}

export default PaginaInicio;
