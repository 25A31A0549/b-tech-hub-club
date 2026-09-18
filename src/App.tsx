import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HubProvider } from './context/HubContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';

// Pages
import { Home } from './pages/Home';
import { Clubs } from './pages/Clubs';
import { ClubDetails } from './pages/ClubDetails';
import { Events } from './pages/Events';
import { JoinClub } from './pages/JoinClub';
import { Dashboard } from './pages/Dashboard';
import { Contact } from './pages/Contact';

// Scroll to top helper on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// 404 Not Found Page Component
const NotFound: React.FC = () => (
  <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
      404
    </div>
    <h1 className="text-3xl font-extrabold text-slate-900">Page Not Found</h1>
    <p className="text-sm text-slate-600">
      The page you requested could not be located. It might have been moved or does not exist.
    </p>
    <a
      href="#/"
      className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
    >
      Return to Home
    </a>
  </div>
);

export const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <HubProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
          {/* Top Navigation Bar */}
          <Navbar onOpenChat={() => setIsChatOpen(true)} />

          {/* Main Content View */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clubs" element={<Clubs />} />
              <Route path="/clubs/:id" element={<ClubDetails />} />
              <Route path="/events" element={<Events />} />
              <Route path="/join" element={<JoinClub />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Reusable AI Assistant Chatbot */}
          <Chatbot
            isOpen={isChatOpen}
            onToggle={() => setIsChatOpen(!isChatOpen)}
          />

          {/* Footer */}
          <Footer />
        </div>
      </HashRouter>
    </HubProvider>
  );
};

export default App;
