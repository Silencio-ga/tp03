import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookById, getCoverUrl } from '../api/openlibrary';
import Loading from '../components/Loading';
import Error from '../components/Error';

export default function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                const data = await getBookById(id);
                setBook(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBook();
    }, [id]);

    if (loading) return <Loading />;
    if (error) return <Error error={{ message: error }} />;
    if (!book) return null;

    // Obtener la portada
    const coverUrl = getCoverUrl(book, 'L') || 
        (book.covers && book.covers.length > 0 
            ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg` 
            : '/placeholder-book.svg');

    // Procesar la descripción (Open Library la devuelve como string o como objeto { type, value })
    const descripcion = typeof book.description === 'string'
        ? book.description
        : (book.description?.value || 'No hay una descripción detallada disponible para esta obra en Open Library.');

    // Procesar temas / géneros (limitamos a los primeros 6 para no saturar)
    const generos = book.subjects ? book.subjects.slice(0, 6) : [];

    // Fecha de creación/publicación si existe
    const fechaPublicacion = book.created?.value 
        ? new Date(book.created.value).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
        : (book.first_publish_date || 'No especificada');

    return (
        <div className="py-12 bg-gray-900 min-h-screen text-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                {/* Botón Volver */}
                <Link 
                    to="/items" 
                    className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium mb-8 transition-colors"
                >
                    ← Volver al catálogo
                </Link>

                {/* Tarjeta Contenedora Principal */}
                <div className="bg-gray-800/60 border border-gray-700/80 rounded-xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        {/* Columna Izquierda: Portada e Identificadores */}
                        <div className="flex flex-col items-center">
                            <div className="relative group w-full max-w-60 aspect-2/3 overflow-hidden rounded-lg shadow-2xl border border-gray-700">
                                <img
                                    src={coverUrl}
                                    alt={book.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Ficha rápida de metadatos */}
                            <div className="w-full mt-6 bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 text-xs text-gray-400 space-y-2">
                                <div className="flex justify-between border-b border-gray-800 pb-1">
                                    <span className="font-semibold text-gray-300">ID de Obra:</span>
                                    <span className="font-mono text-amber-400">{id}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-1">
                                    <span className="font-semibold text-gray-300">Registro:</span>
                                    <span>{fechaPublicacion}</span>
                                </div>
                                {book.revision && (
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-300">Revisión:</span>
                                        <span>v{book.revision}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Columna Derecha: Título, Descripción y Detalles */}
                        <div className="md:col-span-2 flex flex-col justify-between">
                            <div>
                                {/* Encabezado */}
                                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-400 mb-3 leading-tight">
                                    {book.title}
                                </h1>

                                {/* Subtítulo si existe */}
                                {book.subtitle && (
                                    <h2 className="text-lg text-amber-200/80 font-serif italic mb-4">
                                        {book.subtitle}
                                    </h2>
                                )}

                                {/* Etiquetas de Géneros / Temas */}
                                {generos.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {generos.map((genero, index) => (
                                            <span 
                                                key={index} 
                                                className="px-2.5 py-1 bg-amber-950/40 text-amber-300 border border-amber-800/50 text-xs rounded-full"
                                            >
                                                {genero}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Sinopsis / Descripción */}
                                <div className="mt-4">
                                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                        Sinopsis & Resumen
                                    </h3>
                                    <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line bg-gray-900/30 p-4 rounded-lg border border-gray-800/60 max-h-80 overflow-y-auto">
                                        {descripcion}
                                    </p>
                                </div>
                            </div>

                            {/* Enlaces de interés / Recurso externo */}
                            {book.links && book.links.length > 0 && (
                                <div className="mt-6 pt-4 border-t border-gray-700/60">
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                        Enlaces externos
                                    </h4>
                                    <div className="flex flex-wrap gap-3">
                                        {book.links.map((link, idx) => (
                                            <a
                                                key={idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-amber-400 hover:text-amber-300 underline"
                                            >
                                                {link.title || 'Más información'}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}