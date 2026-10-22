/*
Error.jsx - Manejo de errores de la API.
------------------------------------------
Propósito: Mostrar un mensaje estilizado cuando falla una petición.
*/

export default function Error({ error }) {
    return (
        <div 
        className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-gray-300 text-center">
            <p>Error al cargar: {error.message}</p>
        </div>
    );
}
