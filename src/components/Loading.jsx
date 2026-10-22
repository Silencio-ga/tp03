/*
Loading.jsx - Indicador de carga minimalista.
-----------------------------------------------
Propósito: Mostrar un spinner mientras se cargan los datos de la API.
*/

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-64 ">
            <div className="w-12 h-12 border-4 border-gray-700 border-t-amber-400 rounded-full animate-spin"></div>
        </div>
    );
}