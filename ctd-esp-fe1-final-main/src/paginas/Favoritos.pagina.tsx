import React, { useState, useEffect } from 'react';
import TarjetaPersonaje from '../componentes/personajes/tarjeta-personaje.componente';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { quitarTodosLosFavoritos } from '../redux/reducer'; // Actualiza la importación
import '../paginas/Detalle.css'

const PaginaFavoritos = () => {
    const favoritos = useSelector((state: RootState) => state.reducer.favoritos);
    const dispatch = useDispatch();

    const limpiarFavoritos = () => {
        dispatch(quitarTodosLosFavoritos()); // Llama a la acción quitarTodosLosFavoritos sin argumentos
        localStorage.removeItem('favoritos'); // También limpia la lista de favoritos del almacenamiento local
    };
    

    return (
        <div className="container">
            <div className="actions">
                <h3>Personajes Favoritos</h3>
                <button onClick={limpiarFavoritos}>Limpiar Favoritos</button>
                <div className="grilla-personajes">
                    {favoritos.map((character) => (
                        <TarjetaPersonaje key={character.id} character={character} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PaginaFavoritos;
