/* Home.jsx - Página de inicio con estados de Loading y Error integrados */
import { useEffect, useState } from "react";
import { searchBooks } from "../api/openlibrary";
import BookCard from "../components/BookCard";
import Loading from "../components/Loading";
import Error from "../components/Error";
import SearchBar from "../components/SearchBar";
import { useFavoritos } from "../context/FavoritesContext";

export default function Home() {
    // Estados locales para libros, carga y captura de errores
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Consumimos el contexto de favoritos
    const { favoritos, toggleFavorito } = useFavoritos();

    const handleToggleFavorite = (id) => {
        toggleFavorito(id);
    };

    // Carga inicial de libros al montar o al cambiar favoritos
    useEffect(() => {
        const loadInitialBooks = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await searchBooks("filosofia");
                const librosConID = data.map((book) => ({ ...book, id: book.key }));

                setBooks(
                    librosConID.map((book) => ({
                        ...book,
                        isFavorite: favoritos.includes(book.id),
                    }))
                );
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false); // Garantiza que el loader siempre se apague
            }
        };

        loadInitialBooks();
    }, [favoritos]);

    // ==========================================
    // RENDERIZADO CONDICIONAL (Carga y Error)
    // ==========================================

    // Si hay carga pendiente, mostramos spinner
    if (loading) return <Loading />;

    // Si hay error, mostramos mensaje estilizado
    if (error) return <Error error={{ message: error.message || "Error al cargar los libros" }} />;

    // ==========================================
    // RENDERIZADO PRINCIPAL
    // ==========================================
    return (
        <section className="py-12 bg-gray-900 min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* Encabezado / Bienvenida */}
                <header className="bg-gray-800/50 rounded-lg p-6 mb-8 border border-gray-700/50">
                    <h1 className="text-3xl font-serif font-bold text-amber-400 mb-4">
                        Stoa Codex
                    </h1>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Explora la sabiduría antigua a través del conocimiento colectivo.
                    </p>
                </header>

                {/* Buscador con manejo de carga y error */}
                <SearchBar
                    onSearch={async (query) => {
                        try {
                            setLoading(true);
                            setError(null);
                            const data = await searchBooks(query);
                            const librosConID = data.map((book) => ({ ...book, id: book.key }));

                            setBooks(
                                librosConID.map((book) => ({
                                    ...book,
                                    isFavorite: favoritos.includes(book.id),
                                }))
                            );
                        } catch (err) {
                            setError(err);
                        } finally {
                            setLoading(false);
                        }
                    }}
                    placeholder="Busca un libro..."
                />

                {/* Grilla de libros o mensaje de lista vacía */}
                {books.length === 0 ? (
                    <p className="text-center py-12 text-gray-400">
                        No se encontraron libros para tu búsqueda.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {books.map((book) => (
                            <BookCard
                                key={book.id}
                                book={book}
                                onToggleFavorite={handleToggleFavorite}
                                isFavorite={book.isFavorite}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}