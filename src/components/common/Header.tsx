import React, { useState, useRef, useEffect } from 'react';
import {
  Coins,
  ChevronDown,
  Bell,
  Shield,
  User,
  LogOut,
  Flame,
  Award,
  History,
  HelpCircle,
  Info
} from 'lucide-react';
import { useApp, PageRoute } from '../../context/AppContext';
import { PWAInstallButton } from './PWAInstallButton';

export const Header: React.FC = () => {
  const {
    activePage,
    setActivePage,
    currentUser,
    switchRole,
    setIsAuthModalOpen,
    logoutUser,
    notifications
  } = useApp();

  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Sports', route: 'sports' },
    { label: 'Challenges', route: 'daily' },
    { label: 'Quiz', route: 'quiz' },
    { label: 'Leaderboard', route: 'leaderboard' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActivePage('home')}
          className="font-display font-extrabold text-xl tracking-tight text-white hover:text-emerald-400 transition-colors flex items-center gap-2 text-left"
        >
          <span className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-emerald-100 font-bold text-sm shadow-sm shadow-emerald-500/20">
            🇵🇰
          </span>
          <span className="tracking-tight">SkillPlay<span className="text-emerald-500">PK</span></span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <button
              key={link.route}
              onClick={() => setActivePage(link.route)}
              className={`transition-colors whitespace-nowrap py-1 relative ${
                activePage === link.route
                  ? 'text-emerald-400 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-500'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}

          {/* More Dropdown for additional pages */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="flex items-center gap-1 text-slate-300 hover:text-white py-1 transition-colors whitespace-nowrap"
            >
              <span>Explore</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMoreOpen && (
              <div className="absolute left-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1.5 z-50 text-xs">
                <button
                  onClick={() => { setActivePage('results'); setIsMoreOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-800 text-slate-200 hover:text-emerald-400 flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-emerald-500" />
                  <span>Match Results & Scores</span>
                </button>
                <button
                  onClick={() => { setActivePage('history'); setIsMoreOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-800 text-slate-200 hover:text-emerald-400 flex items-center gap-2"
                >
                  <History className="w-4 h-4 text-amber-500" />
                  <span>Points History</span>
                </button>
                <button
                  onClick={() => { setActivePage('about'); setIsMoreOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-800 text-slate-200 hover:text-emerald-400 flex items-center gap-2"
                >
                  <Info className="w-4 h-4 text-blue-400" />
                  <span>About SkillPlay PK</span>
                </button>
                <button
                  onClick={() => { setActivePage('help'); setIsMoreOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-800 text-slate-200 hover:text-emerald-400 flex items-center gap-2"
                >
                  <HelpCircle className="w-4 h-4 text-purple-400" />
                  <span>Help &amp; Support</span>
                </button>
                <div className="my-1 border-t border-slate-800" />
                <button
                  onClick={() => { setActivePage('admin'); setIsMoreOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-800 text-emerald-400 font-semibold flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Admin Console</span>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* PWA Install Button */}
          <PWAInstallButton compact />

          {/* Virtual Points Counter */}
          <button
            onClick={() => setActivePage('history')}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800/90 border border-slate-800 px-2.5 py-1.5 rounded-lg transition-colors group cursor-pointer"
            title="Non-monetary virtual skill points (Zero cash value)"
          >
            <Coins className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-bold text-amber-300 font-mono tabular-nums">
              {currentUser.points.toLocaleString()}
            </span>
            <span className="hidden lg:inline text-[11px] text-slate-400">PTS</span>
          </button>

          {/* Streak indicator */}
          <button
            onClick={() => setActivePage('daily')}
            className="hidden sm:flex items-center gap-1 bg-amber-950/40 border border-amber-600/30 px-2 py-1.5 rounded-lg text-amber-400 text-xs font-semibold"
            title={`${currentUser.streakDays} Day Check-in Streak`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-mono tabular-nums">{currentUser.streakDays}d</span>
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={() => setActivePage('notifications')}
            className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-900 transition-colors"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 object-cover"
              />
              <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 text-xs">
                <div className="px-3 py-2 border-b border-slate-800 mb-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white truncate max-w-[140px]">{currentUser.name}</span>
                    <span className="text-[10px] text-emerald-400 font-mono uppercase bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      {currentUser.role}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">@{currentUser.username}</div>
                  <div className="text-[11px] text-amber-400 font-mono mt-1 flex items-center gap-1">
                    <Coins className="w-3 h-3" />
                    <span>{currentUser.points.toLocaleString()} Skill Tokens</span>
                  </div>
                </div>

                <button
                  onClick={() => { setActivePage('profile'); setIsProfileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>My Profile &amp; Stats</span>
                </button>

                <button
                  onClick={() => { setActivePage('history'); setIsProfileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg flex items-center gap-2"
                >
                  <History className="w-3.5 h-3.5 text-slate-400" />
                  <span>Points Ledger</span>
                </button>

                {/* Role Switcher for instant testing */}
                <div className="my-1 border-t border-slate-800 pt-1">
                  <div className="px-3 py-1 text-[10px] uppercase font-semibold text-slate-500">
                    Switch Test Persona
                  </div>
                  <button
                    onClick={() => {
                      switchRole(currentUser.role === 'admin' ? 'user' : 'admin');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-800 text-emerald-400 rounded-lg flex items-center gap-2"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Switch to {currentUser.role === 'admin' ? 'Player Mode' : 'Admin Mode'}</span>
                  </button>
                </div>

                <div className="my-1 border-t border-slate-800" />
                <button
                  onClick={() => {
                    logoutUser();
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-rose-950/40 text-rose-400 rounded-lg flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out / Guest Mode</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
