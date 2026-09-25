import React, { useState } from 'react';
import {
  Trophy,
  Crown,
  Medal,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  MapPin,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LeaderboardUser } from '../../types';

export const LeaderboardPage: React.FC = () => {
  const {
    dailyLeaderboard,
    weeklyLeaderboard,
    monthlyLeaderboard,
    currentUser
  } = useApp();

  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [searchQuery, setSearchQuery] = useState('');

  const currentBoard: LeaderboardUser[] =
    timeframe === 'daily'
      ? dailyLeaderboard
      : timeframe === 'weekly'
      ? weeklyLeaderboard
      : monthlyLeaderboard;

  const filteredBoard = currentBoard.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const top3 = currentBoard.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider">
          <span>National Competitor Standings</span>
          <span aria-hidden="true">&middot;</span>
          <span>Skill &amp; Intelligence Rankings</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          Leaderboard &amp; Hall of Fame
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
          Track top sports tacticians across Pakistan. Rankings are calculated strictly from points earned through sports quizzes, accurate predictions, and daily challenges.
        </p>
      </div>

      {/* Segmented Timeframe Switcher & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Timeframe Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
          <button
            onClick={() => setTimeframe('daily')}
            className={`flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              timeframe === 'daily'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Daily Standings
          </button>
          <button
            onClick={() => setTimeframe('weekly')}
            className={`flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              timeframe === 'weekly'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Weekly Champions
          </button>
          <button
            onClick={() => setTimeframe('monthly')}
            className={`flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              timeframe === 'monthly'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Legends
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search competitor or city..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      {top3.length >= 3 && !searchQuery && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {/* Rank 2 (Silver) */}
          <div className="order-2 md:order-1 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col items-center text-center space-y-3 relative shadow-xl">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 font-mono font-bold text-xs">
              #2
            </div>
            <img
              src={top3[1].avatar}
              alt={top3[1].name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-slate-400 object-cover"
            />
            <div>
              <div className="font-bold text-white text-base">{top3[1].name}</div>
              <div className="text-xs text-slate-400 flex items-center justify-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-500" />
                <span>{top3[1].city}</span>
              </div>
            </div>
            <div className="text-sm font-bold text-amber-400 font-mono tabular-nums">
              {top3[1].points.toLocaleString()} PTS
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              {top3[1].challengesCompleted} Challenges &middot; {top3[1].winRate}% Win Rate
            </div>
          </div>

          {/* Rank 1 (Gold Champion) */}
          <div className="order-1 md:order-2 p-6 rounded-3xl bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-900 border-2 border-amber-500/50 flex flex-col items-center text-center space-y-3 relative shadow-2xl scale-100 md:-translate-y-2">
            <div className="absolute -top-3 w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-900">
              <Crown className="w-4 h-4" />
            </div>
            <img
              src={top3[0].avatar}
              alt={top3[0].name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-2xl bg-slate-800 border-2 border-amber-400 object-cover mt-2"
            />
            <div>
              <div className="font-extrabold text-white text-lg">{top3[0].name}</div>
              <div className="text-xs text-amber-300 flex items-center justify-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>{top3[0].city}</span>
              </div>
            </div>
            <div className="text-base font-extrabold text-amber-400 font-mono tabular-nums">
              {top3[0].points.toLocaleString()} PTS
            </div>
            <div className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              {top3[0].badge}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              {top3[0].challengesCompleted} Challenges &middot; {top3[0].winRate}% Accuracy
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="order-3 md:order-3 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col items-center text-center space-y-3 relative shadow-xl">
            <div className="w-8 h-8 rounded-full bg-amber-900/40 border border-amber-700/60 flex items-center justify-center text-amber-500 font-mono font-bold text-xs">
              #3
            </div>
            <img
              src={top3[2].avatar}
              alt={top3[2].name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-amber-700 object-cover"
            />
            <div>
              <div className="font-bold text-white text-base">{top3[2].name}</div>
              <div className="text-xs text-slate-400 flex items-center justify-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-500" />
                <span>{top3[2].city}</span>
              </div>
            </div>
            <div className="text-sm font-bold text-amber-400 font-mono tabular-nums">
              {top3[2].points.toLocaleString()} PTS
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              {top3[2].challengesCompleted} Challenges &middot; {top3[2].winRate}% Win Rate
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300 uppercase font-mono tracking-wider">
            All Competitors ({filteredBoard.length})
          </span>
          <span className="text-slate-500">
            Points have ZERO monetary value
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {filteredBoard.map((user) => {
            const isMe = user.id === currentUser.id;
            return (
              <div
                key={user.id}
                className={`p-4 flex items-center justify-between gap-4 text-xs transition ${
                  isMe
                    ? 'bg-emerald-950/40 border-l-4 border-l-emerald-500'
                    : 'hover:bg-slate-800/40'
                }`}
              >
                {/* Left: Rank & User */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="w-7 text-center font-mono font-bold text-slate-400 text-sm">
                    {user.rank}
                  </div>

                  <img
                    src={user.avatar}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 object-cover shrink-0"
                  />

                  <div className="min-w-0">
                    <div className="font-bold text-white text-sm truncate flex items-center gap-2">
                      <span>{user.name}</span>
                      {isMe && (
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded font-mono">
                          YOU
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
                      <span>@{user.username}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span>{user.city}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Stats & Points */}
                <div className="flex items-center gap-4 sm:gap-6 shrink-0 text-right">
                  <div className="hidden sm:block text-slate-400 font-mono text-[11px]">
                    <div>{user.challengesCompleted} Challenges</div>
                    <div className="text-slate-500">{user.winRate}% Precision</div>
                  </div>

                  <div>
                    <div className="font-mono font-extrabold text-amber-400 text-sm sm:text-base tabular-nums">
                      {user.points.toLocaleString()} PTS
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {user.badge}
                    </div>
                  </div>

                  <div className="w-5 text-center">
                    {user.change === 'up' && <TrendingUp className="w-4 h-4 text-emerald-400" />}
                    {user.change === 'down' && <TrendingDown className="w-4 h-4 text-rose-400" />}
                    {user.change === 'same' && <Minus className="w-4 h-4 text-slate-600" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
