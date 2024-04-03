import React from 'react';
import { useDispatch } from 'react-redux';
import { setFiltroNombre } from '../../redux/reducer';
import '../personajes/filtros.css';

/**
 * Componente funcional que representa un conjunto de filtros para buscar personajes.
 * Permite al usuario filtrar los personajes por su nombre.
 * 
 * Uso:
 * ```jsx
 * <Filtros />
 * ```
 * 
 * @returns {JSX.Element} Componente de filtros de búsqueda de personajes.
 */
const Filtros = () => {
  const dispatch = useDispatch();

  /**
   * Maneja el cambio en el campo de entrada de texto y actualiza el filtro de nombre en el estado global.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event - Evento de cambio generado por el campo de entrada.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valor = event.target.value;
    dispatch(setFiltroNombre(valor));
  };

  return (
    <div className="filtros">
      <label htmlFor="nombre">Filtrar por nombre:</label>
      <input
        type="text"
        placeholder="Rick, Morty, Beth, Alien, ...etc"
        name="nombre"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Filtros;
