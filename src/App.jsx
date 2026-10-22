import { Route, Routes, Navigate} from 'react-router-dom';
import './App.css'
import Home from "./pages/Home"
import Books from "./pages/Books"
import BookDetail from "./pages/BookDetail"
import Favorites from "./pages/Favorites"
import Header from "./components/Header"
import NotFound from './pages/NotFound';


import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Header />
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />

          {/* Rutas de catálogo y categorías */}
          <Route path="/items" element={<Books />}>
            <Route path="categoria/:genero" element={<Books />} />
          </Route>

          {/* RUTA DINÁMICA DE DETALLE (Fuera de /items) */}
          <Route path="/items/:id" element={<BookDetail />} />

          {/* Ruta de favoritos */}
          <Route path="/favoritos" element={<Favorites />} />

          {/* Ruta no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App

