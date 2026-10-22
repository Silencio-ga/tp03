/*
BookCard.jsx es la tarjeta del libro. 
---------------------------------------
propósito: 
- Muestra la portada, título y autor del libro
- Enlace para navegar a la ruta de detalle (/items/:id)
- Botón para añadir/quitar de favoritos
- Usa getCoverUrl para obtener la URL de portada
*/

import { Link } from "react-router-dom";
import { getCoverUrl } from "../api/openlibrary";

export default function BookCard({ book, onToggleFavorite, isFavorite }) {
    const cover = getCoverUrl(book, 'M');

    // 🎯 Extraemos y limpiamos el ID (por ejemplo: "/works/OL27448W" -> "OL27448W")
    const rawId = book.id || book.key || '';
    const cleanId = rawId.replace('/works/', '');

    return (
        <article className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-amber-400 transition-colors duration-200 flex flex-col justify-between">
            <div>
                <figure className="mb-4">
                    {/* Enlazamos la portada hacia el detalle */}
                    <Link to={`/items/${cleanId}`}>
                        <img
                            src={cover || '/placeholder-book.svg'}
                            alt={book.title}
                            className="w-full h-48 object-cover rounded-t-lg hover:opacity-90 transition-opacity cursor-pointer"
                        />
                    </Link>
                    <figcaption className="mt-2">
                        {/* Enlazamos el título hacia el detalle */}
                        <Link to={`/items/${cleanId}`}>
                            <h3 className="text-sm font-medium text-gray-200 line-clamp-2 hover:text-amber-400 transition-colors cursor-pointer">
                                {book.title}
                            </h3>
                        </Link>
                        {book.authors && book.authors.length > 0 && (
                            <p className="text-xs text-gray-400 line-clamp-1 mt-1">
                                {book.authors[0]}
                            </p>
                        )}
                        {book.author_name && book.author_name.length > 0 && !book.authors && (
                            <p className="text-xs text-gray-400 line-clamp-1 mt-1">
                                {book.author_name[0]}
                            </p>
                        )}
                    </figcaption>
                </figure>
            </div>

            <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-gray-700/50">
                {/* Botón explícito para ver detalle */}
                <Link
                    to={`/items/${cleanId}`}
                    className="text-xs text-amber-400 hover:text-amber-300 font-medium underline"
                >
                    Ver detalle →
                </Link>

                {/* Botón de favoritos */}
                <button
                    onClick={() => onToggleFavorite(rawId)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded transition ${
                        isFavorite
                            ? 'bg-amber-600 text-gray-900 shadow-sm'
                            : 'border border-gray-600 text-gray-300 hover:bg-gray-800'
                    }`}
                >
                    {isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
        </article>
    );
}