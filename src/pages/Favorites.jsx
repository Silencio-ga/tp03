/*
Favorites.jsx - Página de libros favoritos.
----------------------------------------------------------
Propósito: Mostrar la lista de libros favoritos del usuario.
        Usa el hook useFavoriteBooks para obtener datos normalizados.
        Separa la lógica de la presentación.
*/

import { useFavoritos } from '../context/FavoritesContext';
import { useFavoriteBooks } from '../hooks/useFavoriteBooks';
import Loading from '../components/Loading';
import Error from '../components/Error';
import FavoriteCard from '../components/FavoriteCard';

export default function Favorites() {
    // Estado global: IDs de favoritos y conteo
    const { favoritos, conteoFavoritos, toggleFavorito } = useFavoritos();

    // Estado local: datos obtenidos usando el hook
    const { books, loading, error } = useFavoriteBooks(favoritos);

    // Si hay carga pendiente, mostramos spinner
    if (loading) return <Loading />;

    // Si hay error, mostramos mensaje estilizado
    if (error) return <Error error={{ message: error.message }} />;

    // Si no hay libros en favoritos, mostramos mensaje de bienvenida
    if (books.length === 0) {
        return (
            <section className="py-12 bg-gray-900 min-h-screen text-white px-4 max-w-7xl mx-auto">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-amber-400 mb-2">Mis favoritos</h1>
                    <p className="text-gray-300">
                        {conteoFavoritos} libro(s) guardado(s) en tu colección
                    </p>
                </header>

                <p className="text-center py-12 text-gray-400">
                    Todavía no guardaste ningún libro. Visitá el catálogo y marcá tus favoritos.
                </p>
            </section>
        );
    }

    // Renderizado principal: lista de tarjetas
    return (
        <section className="py-12 bg-gray-900 min-h-screen text-white px-4 max-w-7xl mx-auto">

            {/* Encabezado */}
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-amber-400 mb-2">Mis favoritos</h1>
                <p className="text-gray-300">
                    {conteoFavoritos} libro(s) guardado(s) en tu colección
                </p>
            </header>

            {/* Contenido principal con grid responsivo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-900/50">

                {/* Cada libro favorito como tarjeta */}
                {books.map((book) => (
                    <FavoriteCard
                        key={book.id}
                        book={book}
                        onRemove={toggleFavorito}
                    />
                ))}
                
            </div>
        </section>
    );
}