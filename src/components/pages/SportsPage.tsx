import React, { useState } from 'react';
import {
  Trophy,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SportType, ChallengeStatus } from '../../types';

export const SportsPage: React.FC = () => {
  const {
    events,
    challenges,
    selectedSport,
    setSelectedSport,
    enterChallenge,
    currentUser,
    setActivePage
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming_live' | 'completed'>('all');
  const [selectedChallengeForModal, setSelectedChallengeForModal] = useState<string | null>(null);

  const sportsList: { id: SportType | 'all'; name: string; icon: string }[] = [
    { id: 'all', name: 'All Disciplines', icon: '🏆' },
    { id: 'cricket', name: 'Cricket (PSL & ODIs)', icon: '🏏' },
    { id: 'football', name: 'Football (PPFL & AFC)', icon: '⚽' },
    { id: 'tennis', name: 'Tennis (Davis Cup)', icon: '🎾' },
    { id: 'basketball', name: 'Basketball (National)', icon: '🏀' },
  ];

  const filteredEvents = events.filter((ev) => {
    if (selectedSport !== 'all' && ev.sport !== selectedSport) return false;
    if (statusFilter === 'upcoming_live' && ev.status !== 'upcoming' && ev.status !== 'live') return false;
    if (statusFilter === 'completed' && ev.status !== 'completed') return false;
    return true;
  });

  const getSportChallenges = (eventId: string) => {
    return challenges.filter((c) => c.eventId === eventId);
  };

  const activeModalChallenge = challenges.find((c) => c.id === selectedChallengeForModal);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider">
          <span>Pakistani Sports Arena</span>
          <span aria-hidden="true">&middot;</span>
          <span>Tactical Skill Forecasts</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          Sports Competitions &amp; Events
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
          Examine schedules, live match positions, tactical skill challenges, and verified results. All predictions strictly use non-monetary promotional virtual points.
        </p>
      </div>

      {/* Filter Segmented Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Sports Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {sportsList.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSport(s.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                selectedSport === s.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <span>{s.icon}</span>
              <span>{s.name}</span>
            </button>
          ))}
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setStatusFilter('upcoming_live')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              statusFilter === 'upcoming_live'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Live &amp; Upcoming
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              statusFilter === 'completed'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 text-slate-400">
            <Trophy className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <h3 className="text-base font-semibold text-white">No Events Found</h3>
            <p className="text-xs text-slate-500 mt-1">
              No matches match the selected sport and status filter.
            </p>
          </div>
        ) : (
          filteredEvents.map((event) => {
            const linkedChallenges = getSportChallenges(event.id);
            const isLive = event.status === 'live';
            const isCompleted = event.status === 'completed';

            return (
              <div
                key={event.id}
                className="rounded-3xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden hover:border-slate-700/80 transition"
              >
                {/* Event Top Bar */}
                <div className="p-4 sm:p-5 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">
                      {event.sport === 'cricket' ? '🏏' : event.sport === 'football' ? '⚽' : event.sport === 'tennis' ? '🎾' : '🏀'}
                    </span>
                    <span className="font-semibold text-emerald-400 uppercase font-mono tracking-wider">
                      {event.series}
                    </span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{event.venue}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isLive && (
                      <span className="flex items-center gap-1.5 bg-rose-950 text-rose-300 border border-rose-600/40 px-2.5 py-1 rounded-full text-[11px] font-bold animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        LIVE IN PLAY
                      </span>
                    )}
                    {isCompleted && (
                      <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-slate-700">
                        FINAL SCORE
                      </span>
                    )}
                    {!isLive && !isCompleted && (
                      <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full text-[11px] font-semibold">
                        UPCOMING
                      </span>
                    )}
                  </div>
                </div>

                {/* Scorecard Area */}
                <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    {/* Team A */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{event.teamA.flagOrLogo}</span>
                        <div>
                          <div className="font-bold text-white text-base sm:text-lg">{event.teamA.name}</div>
                          <div className="text-[11px] text-slate-500 uppercase font-mono">{event.teamA.shortName}</div>
                        </div>
                      </div>
                      {event.teamA.score ? (
                        <span className="font-mono font-bold text-lg text-emerald-400 tabular-nums">
                          {event.teamA.score}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500 font-mono">Yet to bat / play</span>
                      )}
                    </div>

                    {/* Team B */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{event.teamB.flagOrLogo}</span>
                        <div>
                          <div className="font-bold text-slate-200 text-base sm:text-lg">{event.teamB.name}</div>
                          <div className="text-[11px] text-slate-500 uppercase font-mono">{event.teamB.shortName}</div>
                        </div>
                      </div>
                      {event.teamB.score ? (
                        <span className="font-mono font-bold text-lg text-slate-300 tabular-nums">
                          {event.teamB.score}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500 font-mono">Yet to bat / play</span>
                      )}
                    </div>

                    {/* Result or Scheduled Date */}
                    <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300 flex items-center justify-between">
                      <span>{event.resultSummary || 'Scheduled fixture'}</span>
                      <span className="text-slate-500 flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </span>
                    </div>
                  </div>

                  {/* Linked Skill Challenges */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        <span>Skill Challenges ({linkedChallenges.length})</span>
                      </span>
                      <span className="text-slate-500 text-[11px]">Virtual Points</span>
                    </div>

                    {linkedChallenges.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">
                        No skill challenges active for this fixture yet.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {linkedChallenges.map((ch) => {
                          const hasEntered = Boolean(ch.userPrediction);
                          return (
                            <div
                              key={ch.id}
                              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between text-xs"
                            >
                              <div className="space-y-0.5 max-w-[240px]">
                                <div className="font-semibold text-white truncate">{ch.title}</div>
                                <div className="text-[11px] text-slate-400">
                                  Entry: {ch.entryPoints} PTS &middot; Win: +{ch.rewardPoints} PTS
                                </div>
                              </div>

                              <button
                                onClick={() => setSelectedChallengeForModal(ch.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                                  hasEntered
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                                }`}
                              >
                                {hasEntered ? 'Predicted' : 'Forecast'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Prediction Modal */}
      {activeModalChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase font-mono">
                  {activeModalChallenge.sport} Tactical Challenge
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {activeModalChallenge.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedChallengeForModal(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeModalChallenge.description}
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200">
              <span className="text-emerald-400 font-semibold">Question: </span>
              {activeModalChallenge.question}
            </div>

            <div className="space-y-2">
              <div className="text-xs text-slate-400 font-medium flex justify-between">
                <span>Select Your Tactical Forecast</span>
                <span>Your Balance: {currentUser.points.toLocaleString()} PTS</span>
              </div>

              {activeModalChallenge.options.map((opt) => {
                const isSelected = activeModalChallenge.userPrediction === opt.id;
                return (
                  <button
                    key={opt.id}
                    disabled={Boolean(activeModalChallenge.userPrediction)}
                    onClick={() => {
                      enterChallenge(activeModalChallenge.id, opt.id);
                    }}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200'
                    }`}
                  >
                    <span>{opt.text}</span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {opt.votesPercent}% Community Pick
                    </span>
                  </button>
                );
              })}
            </div>

            {activeModalChallenge.userPrediction ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>You have submitted your prediction! Results will be officially verified and settled.</span>
              </div>
            ) : (
              <div className="text-center text-[11px] text-slate-500">
                Participation costs {activeModalChallenge.entryPoints} virtual points. Reward is +{activeModalChallenge.rewardPoints} PTS. Non-monetary points only.
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedChallengeForModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
