/*
SearchBar.jsx - Campo de búsqueda de libros.
---------------------------------------------
Propósito: Permitir al usuario buscar libros por título o autor,
            disparando una función del padre (onSearch) al presionar "Buscar".
*/

import { useState } from "react";

export default function SearchBar({ onSearch, placeholder = 'Busca un libro...' }) {

    const [consulta, setConsulta] = useState('');

    // --- Manejadores de eventos --- //

    const gestionFormEnvio = (event) => {
        event.preventDefault();
        ejecutarBusqueda();
    };

    const gestionInputChange = (event) => {
        actualizarConsulta(event.target.value);
    };

    // --- Funciones con responsabilidad única --- //

    const actualizarConsulta = (nuevaConsulta) => {
        setConsulta(nuevaConsulta);
    }

    const ejecutarBusqueda = () => {
        const consultaLimpia = consulta.trim();
        if (consultaLimpia) {
            onSearch(consultaLimpia);
        }
    };

    // --- renderizado --- //

    return (
        <form onSubmit={gestionFormEnvio} className="flex gap-2">
            <label htmlFor="search-query" className="sr-only">
                Buscar libros
            </label>
            <input
                id="search-query"
                type="text"
                value={consulta}
                onChange={gestionInputChange}
                placeholder="Busca un libro..."
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-amber-700 transition-colors"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
                Buscar
            </button>
        </form>
    );
}