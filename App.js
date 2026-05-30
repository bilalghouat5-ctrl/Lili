import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { LanguageProvider } from './context/LanguageContext';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import FloatingSearchBar from './components/FloatingSearchBar';
import NotificationCenter from './components/NotificationCenter';
import AIAssistant from './components/AIAssistant';
import OfflineBanner from './components/OfflineBanner';

const Home = lazy(() => import('./pages/Home'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));
const Auth = lazy(() => import('./pages/Auth'));
const HostDashboard = lazy(() => import('./pages/HostDashboard'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const MessagesPage = lazy(() => import('./pages/MessagesPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const ExplorePage = lazy(() => import('./pages/ExplorePage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <NotificationProvider>
            <BrowserRouter>
              <div className="app-container">
                <OfflineBanner />
                <Navbar />
                <FloatingSearchBar />
                <NotificationCenter />
                <Suspense fallback={<SplashScreen />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/property/:id" element={<PropertyDetails />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/dashboard" element={<HostDashboard />} />
                    <Route path="/booking/:id" element={<BookingPage />} />
                    <Route path="/messages" element={<MessagesPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                  </Routes>
                </Suspense>
                <BottomNav />
                <AIAssistant />
              </div>
            </BrowserRouter>
          </NotificationProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
