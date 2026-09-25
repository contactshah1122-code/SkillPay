/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { MobileNav } from './components/common/MobileNav';
import { Footer } from './components/common/Footer';
import { AuthModal } from './components/common/AuthModal';
import { ToastContainer } from './components/common/ToastContainer';
import { OfflineIndicator } from './components/common/OfflineIndicator';

import { HomePage } from './components/pages/HomePage';
import { SportsPage } from './components/pages/SportsPage';
import { DailyChallengesPage } from './components/pages/DailyChallengesPage';
import { QuizPage } from './components/pages/QuizPage';
import { LeaderboardPage } from './components/pages/LeaderboardPage';
import { ResultsPage } from './components/pages/ResultsPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { PointsHistoryPage } from './components/pages/PointsHistoryPage';
import { NotificationsPage } from './components/pages/NotificationsPage';
import { AboutPage } from './components/pages/AboutPage';
import { HelpSupportPage } from './components/pages/HelpSupportPage';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/pages/TermsOfServicePage';
import { AdminDashboardPage } from './components/pages/AdminDashboardPage';

const AppContent: React.FC = () => {
  const { activePage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
      {/* Top Bar Contract (3 zones) */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'sports' && <SportsPage />}
        {activePage === 'daily' && <DailyChallengesPage />}
        {activePage === 'quiz' && <QuizPage />}
        {activePage === 'leaderboard' && <LeaderboardPage />}
        {activePage === 'results' && <ResultsPage />}
        {activePage === 'profile' && <ProfilePage />}
        {activePage === 'history' && <PointsHistoryPage />}
        {activePage === 'notifications' && <NotificationsPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'help' && <HelpSupportPage />}
        {activePage === 'privacy' && <PrivacyPolicyPage />}
        {activePage === 'terms' && <TermsOfServicePage />}
        {activePage === 'admin' && <AdminDashboardPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Ergonomic Bottom Tab Bar */}
      <MobileNav />

      {/* Overlays & Modals */}
      <AuthModal />
      <ToastContainer />
      <OfflineIndicator />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
