/*
FavoritesContext.jsx - Contexto de favoritos de la aplicación.
---------------------------------------------------------------
Propósito: Gestionar la lista de libros favoritos, sincronizar con localStorage,
            y proporcionar acciones optimizadas para agregar/quitar/toggle.

Funcionalidades:
    - favoritos: string[] - lista de IDs de obras (ej: ["OL27448W", "OL12345W"])
    - agregarFavorito(id: string) => void - buscar por ID y lo añade en una lista de favoritos
    - quitarFavorito(id: string) => void - buscar por ID y lo quita de la lista
    - toggleFavorito(id: string) => void - alterna: añade si no está, quita si está
*/

import { createContext, useState, useEffect, useContext } from 'react';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {

    //===(setup incial del estado)===//
    // estado inicial: lee de localStorage de forma segura

    const [favoritos, setFavoritos] = useState(() => {
        try {
            const guardados = localStorage.getItem('favoritos');
            return guardados ? JSON.parse(guardados) : [];
        } catch (error) {
            console.warn('[FavoritesContext] localStorage corrupto, reiniciando:', error);
            return [];
        }
    });

    
    //===(persistencia en localStorage)===//
    
    useEffect(() => {
        try {
            const cached = localStorage.getItem('favoritos');
            const nuevoString = JSON.stringify(favoritos);
            if (cached !== nuevoString) {
                localStorage.setItem('favoritos', nuevoString);
            }
        } catch (error) {
            console.error('[FavoritesContext] Error guardando en localStorage:', error);
        }
    }, [favoritos]);

    
    //===(validación de indefiticadores de libros)===//
    const validarId = (id) => {
        if (typeof id === 'string' && id.trim().length > 0) {
            return true;
        }
        console.warn(`[FavoritesContext] ID debe ser string o ID no puede ser solo espacios en blanco, recibido: ${typeof id}`)
        return false;
        // verifica el tipo de ID 
        // y elimina espacios, tabs, saltos de línea con trim() 
        // y verifica que su tamaño sea mayor a 0
    };

    //===(Agregar favorito)===//

    const agregarFavorito = (id) => {
        if (!validarId(id)) {return;}

        setFavoritos((estadoActual) => {
            // si el ID ya existe, retornar estado actual (sin cambios)
            if (estadoActual.includes(id)) {
                return estadoActual;
            } 
            // Agregar el nuevo ID manteniendo orden de inserción
            return [...estadoActual, id];

        });
    };

    //===(quitar favorito)===//
    
    const quitarFavorito = (id) => {
        if (!validarId(id)) {return;}

        setFavoritos((estadoActual) => {
            // filtrar todos los IDs excepto el a remover
            return estadoActual.filter((itemId) => itemId !== id);
        });
    };


    //===(Toggle: reutiliza agregar/quitar para evitar duplicar lógica)===//

    const toggleFavorito = (id) => {
        if (!validarId(id)) return;

        if (favoritos.includes(id)) {
            quitarFavorito(id);
        } else {
            agregarFavorito(id);
        }
    };

    const valorContext = {
        // estado compartido
        favoritos,

        // actions con nombres descriptivos
        agregarFavorito,
        quitarFavorito,
        toggleFavorito,

        // helpers calculadores para facilitar uso en componentes 
        estaEnFavoritos: (id) => favoritos.includes(id),
        conteoFavoritos: favoritos.length,
    }

    return (
        <FavoritesContext.Provider value={valorContext}>
            {children}
        </FavoritesContext.Provider>
    );
}

/*
    ============
    Custom Hook 
    ============
*/

export function useFavoritos() {
    const Context = useContext(FavoritesContext);

    if (!Context) {
        throw new Error(
            'useFavoritos() solo puede ser usado dentro de un FavoritesProvider. ' +
            'Recorda envolver la raíz de tu app con <FavoritesProvider>.'
        );
    }
    return Context;
}
