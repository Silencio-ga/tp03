import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { searchBooks } from '../api/openlibrary';
import BookCard from '../components/BookCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import SearchBar from '../components/SearchBar';
import { useFavoritos } from '../context/FavoritesContext';

export default function Books() {
    // Capturamos el parámetro de la subruta anidada
    const { genero } = useParams(); 

    // Estados locales para los libros, la carga y la captura de errores
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { favoritos, toggleFavorito } = useFavoritos();

    // useEffect para consultar la API. Reacciona cada vez que cambia el término de género
    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                // si hay genero en la URL busca ese genero, sino busca "stoic" por defecto
                const searchTerm = genero ? genero : 'stoic'; 
                const data = await searchBooks(searchTerm);

                // Normalizamos los IDs quitando o manteniendo la propiedad correcta
                const librosConID = data.map(book => ({ ...book, id: book.key }));
                setBooks(librosConID);
            } catch (err) {
                setError(err.message); // Captura del error HTTP/API
            } finally {
                setLoading(false); // Apagamos el indicador de carga
            }
        };
        loadBooks();
    }, [genero]); 
    // La dependencia [genero] hace que se vuelva a ejecutar al cambiar la subruta

    // Renderizado condicional para carga y error
    if (loading) return <Loading />;
    if (error) return <Error error={{ message: error }} />;

    return (
        <div className="py-12 bg-gray-900 min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-4">

                {/* Título dinámico que cambia según el género seleccionado */}
                <h1 className="text-3xl font-bold text-amber-400 mb-6">
                    {genero ? `Categoría: ${genero.toUpperCase()}` : 'Catálogo de Libros'}
                </h1>

                {/* Enlaces/Filtros rápido para probar la ruta anidada */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <Link 
                        to="/items" 
                        className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                            !genero ? 'bg-amber-600 text-gray-900 font-bold border-amber-600' : 'border-gray-700 text-gray-300 hover:border-amber-400'
                        }`}
                    >
                        Todos
                    </Link>
                    <Link 
                        to="/items/categoria/filosofia" 
                        className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                            genero === 'filosofia' ? 'bg-amber-600 text-gray-900 font-bold border-amber-600' : 'border-gray-700 text-gray-300 hover:border-amber-400'
                        }`}
                    >
                        Filosofía
                    </Link>
                    <Link 
                        to="/items/categoria/historia" 
                        className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                            genero === 'historia' ? 'bg-amber-600 text-gray-900 font-bold border-amber-600' : 'border-gray-700 text-gray-300 hover:border-amber-400'
                        }`}
                    >
                        Historia
                    </Link>
                    <Link 
                        to="/items/categoria/roma" 
                        className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                            genero === 'roma' ? 'bg-amber-600 text-gray-900 font-bold border-amber-600' : 'border-gray-700 text-gray-300 hover:border-amber-400'
                        }`}
                    >
                        Roma
                    </Link>
                </div>

                {/* Componente de búsqueda manual */}
                <SearchBar
                    onSearch={async (query) => {
                        try {
                            setLoading(true);
                            const data = await searchBooks(query);
                            const librosConID = data.map(book => ({ ...book, id: book.key }));
                            setBooks(librosConID);
                        } catch (err) {
                            setError(err.message);
                        } finally {
                            setLoading(false);
                        }
                    }}
                    placeholder="Busca un libro..."
                />
                {/* Renderizado de la lista de tarjetas */}

                {!books.length ? (
                    <div className="text-center py-12 text-gray-400">No hay libros encontrados para este género.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {books.map(book => (
                            <BookCard
                                key={book.id || book.key}
                                book={book}
                                onToggleFavorite={toggleFavorito}
                                isFavorite={favoritos.includes(book.id || book.key)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}