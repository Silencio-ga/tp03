import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <section className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
            <div className="text-center max-w-md mx-auto">
                <h1 className="text-8xl font-serif font-bold text-amber-400 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-200 mb-3">
                    Página no encontrada
                </h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    La ruta solicitada no existe o ha sido movida.
                    Prueba volver al catálogo o al inicio.
                </p>
                <Link
                    to="/items"
                    className="inline-block px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                    Volver al Catálogo
                </Link>
            </div>
        </section>
    );
}