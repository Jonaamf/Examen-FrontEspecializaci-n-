import React from 'react';
import { useDispatch } from 'react-redux';
import { setFiltroNombre } from '../../redux/reducer';
import '../personajes/filtros.css'

const Filtros = () => {
  const dispatch = useDispatch();

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
