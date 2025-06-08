import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import StudentLifePage from './pages/StudentLifePage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import NewsPage from './pages/NewsPage';
import EventsPage from './pages/EventsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import FacultyPage from './pages/FacultyPage';
import DownloadsPage from './pages/DownloadsPage';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/student-life" element={<StudentLifePage />} />
            <Route path="/faculty" element={<FacultyPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;

