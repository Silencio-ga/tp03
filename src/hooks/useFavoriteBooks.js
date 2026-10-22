/*
useFavoriteBooks.js - Hook para cargar libros favoritos.
----------------------------------------------------------
Propósito: 
Encapsular la lógica de fetch de los IDs guardados en el contexto
de favoritos, devolviendo datos normalizados (con portada y metadatos).
Separa la lógica de datos de la presentación.
*/

import { useState, useEffect } from 'react';
import { getBookById, getCoverUrl } from '../api/openlibrary';

export function useFavoriteBooks(favoritos) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarLibros = async () => {
            // Si no hay favoritos, limpiamos y terminamos
            if (favoritos.length === 0) {
                setBooks([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // Fetch paralelo de todos los libros favoritos
                const resultados = await Promise.all(
                    favoritos.map(async (idCompleto) => {
                        // Normalizar ID: "/works/OL123W" -> "OL123W"
                        const idLimpio = idCompleto.replace('/works/', '');

                        // Obtener datos detallados del libro desde la API
                        const data = await getBookById(idLimpio);

                        // Calcular URL de portada usando getCoverUrl.
                        // Open Library devuelve covers como array de IDs (data.covers).
                        // Creamos un objeto temporal con cover_i para usar getCoverUrl.
                        const portadaData = { cover_i: data.covers?.[0] };
                        const coverUrl = getCoverUrl(portadaData, 'M') || '/placeholder-book.svg';

                        // Retornar objeto normalizado con portada lista para usar
                        return {
                            id: idCompleto,
                            idLimpio,
                            title: data.title,
                            coverUrl,        // Ya incluye fallback a placeholder si no hay portada
                            generos: data.subjects?.slice(0, 2) || [],
                            createdYear: data.created?.value
                                ? new Date(data.created.value).getFullYear()
                                : null,
                        };
                    })
                );

                setBooks(resultados);
            } catch (err) {
                setError(err);
                console.error('[useFavoriteBooks] Error al cargar favoritos:', err);
            } finally {
                setLoading(false);
            }
        };

        cargarLibros();
    }, [favoritos]);

    return { books, loading, error };
}