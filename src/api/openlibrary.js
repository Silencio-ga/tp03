import axios from "axios";

const BASE_URL = "https://openlibrary.org";

/* 
====================
    buscar libros 
====================
*/ 

export const searchBooks = async (query) => {
    try {
        const Response = await axios.get(`${BASE_URL}/search.json`, {
            params: {q: query}
        });
        return Response.data.docs; // retornamos solo los datos necesarios
    } catch (error) {
        throw new Error(`Error al buscar libros: ${error.message}`);
    }
};

/*
==========================================
    obtener detalle de libro por su id
==========================================
*/

export const getBookById = async (id) => {
    try {
        const Response = await axios.get(`${BASE_URL}/works/${id}.json`);
        return Response.data;
    } catch (error) {
        throw new Error(`Error al obtener detalle: ${error.message}`);
    }
}

/*
=============================
    buscar portadas
=============================
*/
//
// Genera la URL de la portada de un libro usando el primer identificador disponible.
// Prioridad: cover_i → isbn → oclc → lccn
// -------------------------------------
// Tamaños: 
//      - S = Small (pequeña)
//      - M = Medium (mediana, default)
//      - L = Large (grande)
// -------------------------------------

export const getCoverUrl = (book, size = 'M') => {
    if (!book) return null;
    
    // cover_i: ID numérico de la portada en Open Library (más confiable)
    if (book.cover_i) {
        return `https://covers.openlibrary.org/b/id/${book.cover_i}-${size}.jpg`;
    }

    // ISBN (International Standard Book Number): identificador único del libro
    const isbn = Array.isArray(book.isbn) ? book.isbn[0] : book.isbn;
    if (isbn) {
        return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;
    }

    // OCLC (Online Computer Library Center): número de control bibliotecario global
    const oclc = Array.isArray(book.oclc) ? book.oclc[0] : book.oclc;
    if (oclc) {
        return `https://covers.openlibrary.org/b/oclc/${oclc}-${size}.jpg`;
    }

    // LCCN (Library of Congress Control Number): número de control de la Biblioteca del Congreso de EE.UU
    const lccn = Array.isArray(book.lccn) ? book.lccn[0] : book.lccn;
    if (lccn) {
        return `https://covers.openlibrary.org/b/lccn/${lccn}-${size}.jpg`;
    }
    return null
};
