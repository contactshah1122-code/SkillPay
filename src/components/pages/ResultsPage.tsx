import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  MapPin,
  Clock,
  Trophy,
  Filter,
  BarChart3,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SportType } from '../../types';

export const ResultsPage: React.FC = () => {
  const { events, challenges } = useApp();
  const [sportFilter, setSportFilter] = useState<SportType | 'all'>('all');

  const completedEvents = events.filter((e) => e.status === 'completed');
  const completedChallenges = challenges.filter((c) => c.status === 'completed');

  const filteredEvents = completedEvents.filter(
    (e) => sportFilter === 'all' || e.sport === sportFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider">
          <span>Official Verification Archive</span>
          <span aria-hidden="true">&middot;</span>
          <span>Settled Competitions</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          Match Results &amp; Challenge Settlements
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
          Review verified fixture scores, certified tactical challenge outcomes, and participant accuracy data across Pakistani cricket, domestic football, Davis Cup tennis, and basketball.
        </p>
      </div>

      {/* Sport Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['all', 'cricket', 'football', 'tennis', 'basketball'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSportFilter(s)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition cursor-pointer ${
              sportFilter === s
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            {s === 'all' ? 'All Disciplines' : s}
          </button>
        ))}
      </div>

      {/* Verified Match Results */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span>Verified Match Scorecards</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-semibold font-mono uppercase">
                  {event.series}
                </span>
                <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-mono">
                  VERIFIED
                </span>
              </div>

              <div className="space-y-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{event.teamA.flagOrLogo}</span>
                    <span className="font-bold text-white text-base">{event.teamA.name}</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-400 text-base">
                    {event.teamA.score}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{event.teamB.flagOrLogo}</span>
                    <span className="font-bold text-slate-300 text-base">{event.teamB.name}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-400 text-base">
                    {event.teamB.score}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                <div className="font-semibold text-emerald-400">Match Summary:</div>
                <p>{event.resultSummary}</p>
              </div>

              {event.highlights && (
                <div className="space-y-1 text-xs">
                  <span className="text-slate-400 font-medium text-[11px] uppercase font-mono">
                    Key Tactical Points:
                  </span>
                  <ul className="space-y-1">
                    {event.highlights.map((h, i) => (
                      <li key={i} className="text-slate-300 flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">&bull;</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{event.venue}</span>
                </span>
                <span>{new Date(event.startTime).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settled Skill Challenge Predictions */}
      <div className="space-y-6 pt-4">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" />
          <span>Settled Tactical Challenges Archive</span>
        </h2>

        <div className="space-y-4">
          {completedChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-semibold uppercase font-mono">
                    {challenge.sport}
                  </span>
                  <span aria-hidden="true">&middot;</span>
                  <span className="text-slate-400">
                    {challenge.totalParticipants} Participants
                  </span>
                </div>
                <span className="text-amber-400 font-mono font-bold">
                  Reward Distributed: +{challenge.rewardPoints} PTS
                </span>
              </div>

              <h3 className="text-base font-bold text-white">
                {challenge.title}
              </h3>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <strong>Question: </strong>{challenge.question}
              </div>

              {/* Options Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {challenge.options.map((opt) => {
                  const isWinner = challenge.correctOptionId === opt.id;
                  return (
                    <div
                      key={opt.id}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                        isWinner
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-500/40'
                          : 'bg-slate-950/50 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        {isWinner && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                        <span className="truncate">{opt.text}</span>
                      </div>
                      <span className="font-mono text-[11px] shrink-0">
                        {opt.votesPercent}%
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="text-[11px] text-slate-500 text-right">
                Officially verified by SkillPlay PK arbiter panel. Virtual points settled.
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
