/*
FavoriteCard.jsx - Tarjeta de un libro favorito.
----------------------------------------------------------
Propósito: Mostrar información de un libro guardado en favoritos con portada,
            título, temas y año de publicación. Incluye microinteracciones:
            - La portada escala ligeramente al hacer hover
            - La tarjeta eleva su sombra y cambia el color del borde
            - Los enlaces cambian de color con transición suave
*/

import { Link } from 'react-router-dom';

export default function FavoriteCard({ book, onRemove }) {
    return (
        <article
            className="group bg-gray-800/50 border border-gray-700 rounded-lg p-5 flex flex-col justify-between
            transition-all duration-300 hover:border-amber-400/70 hover:shadow-xl hover:shadow-amber-900/20 hover:-translate-y-1"
        >
            {/* Figura: portada y metadatos del libro */}
            <figure>
                {/* Enlace a la página de detalle con microinteracción de escala */}
                <Link
                    to={`/items/${book.idLimpio}`}
                    className="w-full h-60 bg-gray-900/80 rounded-md overflow-hidden
                    flex items-center justify-center p-2 border border-gray-700/50
                    transition-colors duration-300 group-hover:border-amber-500/40"
                >
                    <img
                        src={book.coverUrl}
                        alt={`Portada de ${book.title}`}
                        className="max-h-full max-w-full object-contain
                                transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                </Link>

                {/* Pie de figura: título y temas */}
                <figcaption className="mt-3">
                    <h3 className="text-base font-bold text-gray-200 line-clamp-2">
                        <Link
                            to={`/items/${book.idLimpio}`}
                            className="transition-colors duration-200 hover:text-amber-400"
                        >
                            {book.title}
                        </Link>
                    </h3>

                    {/* Lista de temas con microinteracción de color */}
                    {book.generos.length > 0 && (
                        <ul className="flex flex-wrap gap-1 mt-2 p-0 list-none">
                            {book.generos.map((tema, idx) => (
                                <li
                                    key={idx}
                                    className="text-[10px] bg-amber-950/60 text-amber-300 border border-amber-800/40
                                            px-2 py-0.5 rounded-full transition-colors duration-200
                                            hover:bg-amber-900/60 hover:text-amber-200"
                                >
                                    {tema}
                                </li>
                            ))}
                        </ul>
                    )}
                </figcaption>
            </figure>

            {/* Pie de la tarjeta: identificadores y acciones */}
            <footer className="mt-4 pt-4 border-t border-gray-700/50 space-y-3">
                <p className="flex justify-between text-xs text-gray-400 font-mono">
                    <span className="text-gray-500">{book.idLimpio}</span>
                    {book.createdYear && <span>Año: {book.createdYear}</span>}
                </p>

                {/* Navegación con las acciones disponibles */}
                <nav className="flex items-center justify-between gap-2">
                    <Link
                        to={`/items/${book.idLimpio}`}
                        className="text-xs text-amber-400 font-medium underline underline-offset-2
                                transition-colors duration-200 hover:text-amber-300 hover:no-underline"
                    >
                        Ver detalle →
                    </Link>

                    <button
                        onClick={() => onRemove(book.id)}
                        className="px-3 py-1.5 text-xs rounded bg-amber-600 text-gray-900 font-semibold
                                shadow-sm transition-all duration-200
                                hover:bg-amber-500 hover:shadow-md hover:shadow-amber-700/30
                                active:scale-95"
                    >
                        ❤️ Quitar
                    </button>
                </nav>
            </footer>
        </article>
    );
}