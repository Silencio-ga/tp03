/*
ThemeContext.jsx - Contexto del tema de la aplicación.
------------------------------------------------------
Propósito: Gestionar el modo oscuro/claro de la aplicación.
            Persiste la preferencia en localStorage y la aplica
            sobre el documento (<html> y <body>) mediante clases
            de Tailwind, evitando depender de un archivo CSS propio.

Valores posibles del modo:
    - 'dark'  → tema oscuro (por defecto)
    - 'light' → tema claro
*/


import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';

export const ThemeContext = createContext();

//===(constantes)==//

const CLAVE_ALMACENAMIENTO = 'tema';   // clave en localStorage
const MODO_OSCURO = 'dark';
const MODO_CLARO = 'light';
const MODO_POR_DEFECTO = MODO_OSCURO;

const CLASE_OSCURO = 'dark';            // clase para <html>
const FONDO_OSCURO = 'bg-gray-900';     // utilidad Tailwind para <body>
const FONDO_CLARO = 'bg-gray-100';

const MODOS_VALIDOS = [MODO_OSCURO, MODO_CLARO];

//===(funciones auxiliares puras)==//

/*
Lee el modo guardado en localStorage.
Si el dato es inválido o el almacenamiento falla, devuelve el modo por defecto.
*/
const leerModoGuardado = () => {
    try {
        const modoGuardado = localStorage.getItem(CLAVE_ALMACENAMIENTO);
        return MODOS_VALIDOS.includes(modoGuardado) ? modoGuardado : MODO_POR_DEFECTO;
    } catch (error) {
        console.warn('[ThemeContext] No se pudo leer localStorage, se usa el modo por defecto:', error);
        return MODO_POR_DEFECTO;
    }
};

/*
Aplica el tema al documento:
    - <html>  → clase "dark" (activa el variant dark: de Tailwind v4)
    - <body>  → utility de fondo, para que nunca se vea el blanco del navegador
*/
const aplicarTemaEnDocumento = (modo) => {
    const esOscuro = modo === MODO_OSCURO;
    const html = document.documentElement;
    const body = document.body;

    html.classList.toggle(CLASE_OSCURO, esOscuro);
    body.classList.toggle(FONDO_OSCURO, esOscuro);
    body.classList.toggle(FONDO_CLARO, !esOscuro);
};

/*
Guarda el modo en localStorage para conservarlo entre recargas.
*/
const guardarModoEnAlmacenamiento = (modo) => {
    try {
        localStorage.setItem(CLAVE_ALMACENAMIENTO, modo);
    } catch (error) {
        console.error('[ThemeContext] No se pudo guardar el tema en localStorage:', error);
    }
};

//===(provider)==//

export function ThemeProvider({ children }) {
    //===(estado inicial: lee de localStorage de forma segura)==//
    const [modo, setModo] = useState(leerModoGuardado);

    //===(aplicación visual: useLayoutEffect evita el parpadeo al montar)==//
    useLayoutEffect(() => {
        aplicarTemaEnDocumento(modo);
    }, [modo]);

    //===(persistencia)==//
    useEffect(() => {
        guardarModoEnAlmacenamiento(modo);
    }, [modo]);

    //===(acciones)==//

    // Alterna entre oscuro y claro
    const alternarModo = () => {
        setModo((modoActual) => (modoActual === MODO_OSCURO ? MODO_CLARO : MODO_OSCURO));
    };

    //===(valor del contexto, memoizado para no re-renderizar en cada cambio)==//
    const valorContext = useMemo(
        () => ({
            modo,
            esOscuro: modo === MODO_OSCURO,
            setModo,
            alternarModo,
        }),
        [modo]
    );

    return (
        <ThemeContext.Provider value={valorContext}>
            {children}
        </ThemeContext.Provider>
    );
}

//===(custom hook)==//

export function useTheme() {
    const contexto = useContext(ThemeContext);

    if (!contexto) {
        throw new Error(
            'useTheme() solo puede ser usado dentro de un ThemeProvider. ' +
            'Recorda envolver la raíz de tu app con <ThemeProvider>.'
        );
    }
    return contexto;
}
