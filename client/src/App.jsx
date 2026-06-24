import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import Profile from './components/Profile';
import LinkList from './components/LinkList';
import Footer from './components/Footer';
import Login from './components/Login';
import Admin from './components/Admin';
import { isAuthenticated } from './auth';

function PublicPage() {
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileRes, linksRes] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/links'),
        ]);
        const profileData = await profileRes.json();
        const linksData = await linksRes.json();
        setProfile(profileData);
        setLinks(linksData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-5 h-5 rounded-full border border-white/20 border-t-white/60 animate-spin"
        />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-[#0f0f0f] relative overflow-hidden"
      >
        <FlickeringGrid
          className="fixed inset-0 z-0"
          squareSize={4}
          gridGap={6}
          color="rgb(255, 255, 255)"
          maxOpacity={0.04}
          flickerChance={0.05}
        />
        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 min-h-screen">
          <div className="flex flex-col items-center gap-8 w-full max-w-sm">
            {profile && <Profile name={profile.name} bio={profile.bio} />}
            {links.length > 0 && <LinkList links={links} />}
            <Footer />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
