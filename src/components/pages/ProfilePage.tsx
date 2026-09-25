import React, { useState } from 'react';
import {
  User,
  Shield,
  Coins,
  Flame,
  Award,
  Trophy,
  MapPin,
  Calendar,
  CheckCircle2,
  Edit2,
  Save,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfilePage: React.FC = () => {
  const { currentUser, setCurrentUser, switchRole, logoutUser, setActivePage, showToast } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [favoriteTeam, setFavoriteTeam] = useState(currentUser.favoriteTeam);
  const [city, setCity] = useState(currentUser.city);
  const [avatarSeed, setAvatarSeed] = useState(currentUser.username);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser((prev) => ({
      ...prev,
      name,
      favoriteTeam,
      city,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(avatarSeed)}`,
    }));
    setIsEditing(false);
    showToast('Profile Updated', 'Your competitor details have been saved.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider">
          <span>Competitor Identification</span>
          <span aria-hidden="true">&middot;</span>
          <span>Personal Sports Record</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          User Profile &amp; Performance
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
          Manage your sports identity, monitor leaderboard rankings, review tactical achievements, and customize preferences.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-3xl bg-slate-800 border-2 border-emerald-500/40 p-1 shadow-lg shadow-emerald-950"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white">{currentUser.name}</h2>
                <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono uppercase">
                  {currentUser.role}
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono">@{currentUser.username}</div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{currentUser.city}</span>
                </span>
                <span aria-hidden="true">&middot;</span>
                <span className="text-emerald-400 font-semibold">{currentUser.favoriteTeam}</span>
                <span aria-hidden="true">&middot;</span>
                <span>Member since {currentUser.joinedDate}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
            <button
              onClick={() => switchRole(currentUser.role === 'admin' ? 'user' : 'admin')}
              className="px-4 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Switch to {currentUser.role === 'admin' ? 'Player' : 'Admin'} Mode</span>
            </button>
          </div>
        </div>

        {/* Edit Form Drawer */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-medium">City in Pakistan</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Favorite Sports Franchise</label>
              <select
                value={favoriteTeam}
                onChange={(e) => setFavoriteTeam(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="Lahore Qalandars">Lahore Qalandars</option>
                <option value="Karachi Kings">Karachi Kings</option>
                <option value="Islamabad United">Islamabad United</option>
                <option value="Peshawar Zalmi">Peshawar Zalmi</option>
                <option value="Multan Sultans">Multan Sultans</option>
                <option value="Quetta Gladiators">Quetta Gladiators</option>
                <option value="Pakistan National Team">Pakistan National Cricket Team</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Avatar Seed</label>
              <input
                type="text"
                value={avatarSeed}
                onChange={(e) => setAvatarSeed(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Numerical Performance Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <Coins className="w-4 h-4 text-amber-400" />
            <span>Virtual Points</span>
          </div>
          <div className="text-2xl font-extrabold text-amber-300 font-mono tabular-nums">
            {currentUser.points.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500">Zero monetary value</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span>National Rank</span>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
            #{currentUser.rank}
          </div>
          <div className="text-[10px] text-emerald-400 font-medium">Top 5% in Pakistan</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Active Streak</span>
          </div>
          <div className="text-2xl font-extrabold text-amber-400 font-mono tabular-nums">
            {currentUser.streakDays} Days
          </div>
          <div className="text-[10px] text-slate-500">Consecutive logins</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <Award className="w-4 h-4 text-blue-400" />
            <span>Trivia Precision</span>
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono tabular-nums">
            {currentUser.accuracyRate}%
          </div>
          <div className="text-[10px] text-slate-500">{currentUser.quizzesCompleted} Quizzes Solved</div>
        </div>
      </div>

      {/* Badges & Accolades */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div>
          <div className="text-xs font-semibold text-emerald-400 uppercase font-mono tracking-wider">
            Recognition System
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Earned Competitor Badges
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Badges unlocked through sports trivia accuracy and streak persistence.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          {currentUser.badges.map((badge, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2 hover:border-emerald-500/40 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto text-lg">
                🏅
              </div>
              <div className="font-bold text-xs text-white">{badge}</div>
              <div className="text-[10px] text-emerald-400 font-mono">UNLOCKED</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Navigation Rows */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setActivePage('history')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition space-y-1 cursor-pointer"
        >
          <div className="font-bold text-sm text-white">Points History</div>
          <div className="text-xs text-slate-400">View credit and debit transactions</div>
        </button>

        <button
          onClick={() => setActivePage('daily')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition space-y-1 cursor-pointer"
        >
          <div className="font-bold text-sm text-white">Daily Quests</div>
          <div className="text-xs text-slate-400">Collect streak and question rewards</div>
        </button>

        <button
          onClick={() => setActivePage('leaderboard')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition space-y-1 cursor-pointer"
        >
          <div className="font-bold text-sm text-white">Leaderboards</div>
          <div className="text-xs text-slate-400">Compare stats against top Pakistani players</div>
        </button>
      </div>
    </div>
  );
};
