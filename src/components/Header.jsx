/*
Header.jsx - Barra de navegación del sitio.
--------------------------------------------
Propósito: Proporcionar navegación entre rutas principales (Catálogo, Favoritos)
            y un toggle para cambiar entre modo oscuro/claro.
*/

/* Header.jsx - Barra de navegación del sitio con integración de ThemeContext */
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
    // Consumimos la acción 'alternarModo' y el helper 'esOscuro' del contexto
    const { esOscuro, alternarModo } = useTheme();

    // Configuración de rutas principales (R1)
    const rutas = [
        { path: '/items', label: 'Catálogo' },
        { path: '/favoritos', label: 'Favoritos' },
    ];

    return (
        <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* LOGO / NOMBRE (Navega al catálogo) */}
                    <div className="flex items-center">
                        <Link to="/home" className="text-xl font-bold text-amber-400 hover:opacity-90 transition-opacity">
                            stoa codex
                        </Link>
                    </div>

                    {/* NAVEGACIÓN PRINCIPAL (R1) */}
                    <nav className="hidden md:flex space-x-8">
                        {rutas.map((ruta) => (
                            <NavLink
                                key={ruta.path}
                                to={ruta.path}
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-amber-900/30 text-amber-400'
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`
                                }
                            >
                                {ruta.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* BOTÓN TOGGLE DE TEMA (R3) */}
                    <button
                        onClick={alternarModo}
                        className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 transition-colors text-sm font-medium cursor-pointer"
                        aria-label="Cambiar tema visual"
                    >
                        {esOscuro ? '☀️ Claro' : '🌙 Oscuro'}
                    </button>

                </div>
            </div>
        </header>
    );
}