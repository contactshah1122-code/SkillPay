import React, { useState } from 'react';
import {
  History,
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PointTransaction } from '../../types';

export const PointsHistoryPage: React.FC = () => {
  const { transactions, currentUser } = useApp();
  const [filter, setFilter] = useState<'all' | 'quiz_reward' | 'prediction_entry' | 'prediction_win' | 'daily_checkin'>('all');

  const filtered = transactions.filter((t) => filter === 'all' || t.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider">
          <span>Non-Monetary Audit Ledger</span>
          <span aria-hidden="true">&middot;</span>
          <span>Zero Financial Value</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          Virtual Points History
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
          Comprehensive historical statement of all promotional skill tokens earned through sports quizzes, daily check-ins, and skill prediction entries.
        </p>
      </div>

      {/* Mandatory Non-Cash Legal Disclaimer Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-white text-sm">
            Statutory Non-Monetary Disclaimer &amp; Zero Cash Value Notice
          </div>
          <p className="text-amber-200/90 leading-relaxed">
            All points displayed on this ledger are virtual promotional amusement units. Under no circumstances can SkillPlay PK points be withdrawn, exchanged for PKR or foreign currency, transferred for real money, or used for commercial gambling.
          </p>
        </div>
      </div>

      {/* Balance Summary Header Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs text-slate-400 font-mono uppercase">Current Balance</span>
          <div className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-mono tabular-nums mt-1 flex items-center gap-2">
            <Coins className="w-7 h-7 text-amber-400" />
            <span>{currentUser.points.toLocaleString()} PTS</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Available exclusively for in-app tactical challenges and leaderboard rankings.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-2xl text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-medium transition cursor-pointer ${
              filter === 'all'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Ledger
          </button>
          <button
            onClick={() => setFilter('quiz_reward')}
            className={`px-3 py-1.5 rounded-xl font-medium transition cursor-pointer ${
              filter === 'quiz_reward'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Quizzes
          </button>
          <button
            onClick={() => setFilter('prediction_win')}
            className={`px-3 py-1.5 rounded-xl font-medium transition cursor-pointer ${
              filter === 'prediction_win'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Challenge Wins
          </button>
          <button
            onClick={() => setFilter('prediction_entry')}
            className={`px-3 py-1.5 rounded-xl font-medium transition cursor-pointer ${
              filter === 'prediction_entry'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Entries
          </button>
          <button
            onClick={() => setFilter('daily_checkin')}
            className={`px-3 py-1.5 rounded-xl font-medium transition cursor-pointer ${
              filter === 'daily_checkin'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Daily Bonuses
          </button>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300 font-mono uppercase tracking-wider">
            Ledger Records ({filtered.length})
          </span>
          <span className="text-slate-500 font-mono">
            Audit Immutable
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {filtered.length === 0 ? (
            <div className="p-10 text-center text-xs text-slate-500">
              No transactions found for the selected filter.
            </div>
          ) : (
            filtered.map((tx) => {
              const isPositive = tx.points > 0;
              return (
                <div
                  key={tx.id}
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 text-xs hover:bg-slate-800/30 transition"
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isPositive
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {isPositive ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="font-bold text-white text-sm">{tx.title}</div>
                      <div className="text-slate-400 text-xs">{tx.notes}</div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {new Date(tx.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div
                      className={`font-mono font-bold text-sm sm:text-base tabular-nums ${
                        isPositive ? 'text-emerald-400' : 'text-slate-300'
                      }`}
                    >
                      {isPositive ? `+${tx.points}` : tx.points} PTS
                    </div>
                    <div className="text-[10px] text-slate-500 capitalize">
                      {tx.category.replace('_', ' ')}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
