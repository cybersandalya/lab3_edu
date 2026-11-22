import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import NavigationPanel from './components/NavigationPanel/NavigationPanel.jsx';
import Footer from './components/Footer/Footer.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import PartnersPage from './pages/PartnersPage/PartnersPage.jsx';
import LecturersPage from './pages/LecturersPage/LecturersPage.jsx';
import LecturerPage from './pages/LecturerPage/LecturerPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';

export default function App() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  // Ссылки из предыдущей версии сайта переводятся на новые адреса.
  if (pathname === '/' && /^#\/(?![/\\])/.test(hash)) {
    return <Navigate to={hash.slice(1)} replace />;
  }

  return (
    <>
      <NavigationPanel />
      <main className="page">
        <Routes key={pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/lecturers" element={<LecturersPage />} />
          <Route path="/lecturers/:id" element={<LecturerPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
