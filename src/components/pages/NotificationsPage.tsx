import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Award,
  Zap,
  ShieldAlert,
  ArrowRight,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    clearAllNotifications,
    setActivePage
  } = useApp();

  const [typeFilter, setTypeFilter] = useState<'all' | 'reward' | 'challenge' | 'announcement'>('all');

  const filtered = notifications.filter(
    (n) => typeFilter === 'all' || n.type === typeFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider">
            <span>Communication Center</span>
            <span aria-hidden="true">&middot;</span>
            <span>Real-Time Updates</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Activity Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Stay updated with challenge settlement outcomes, point credits, PSL tournament alerts, and platform announcements.
          </p>
        </div>

        <button
          onClick={clearAllNotifications}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
        >
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-2xl w-fit text-xs">
        <button
          onClick={() => setTypeFilter('all')}
          className={`px-4 py-2 rounded-xl font-medium transition cursor-pointer ${
            typeFilter === 'all'
              ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-950'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          All Updates
        </button>
        <button
          onClick={() => setTypeFilter('reward')}
          className={`px-4 py-2 rounded-xl font-medium transition cursor-pointer ${
            typeFilter === 'reward'
              ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-950'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Points &amp; Rewards
        </button>
        <button
          onClick={() => setTypeFilter('challenge')}
          className={`px-4 py-2 rounded-xl font-medium transition cursor-pointer ${
            typeFilter === 'challenge'
              ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-950'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Matches &amp; Quests
        </button>
        <button
          onClick={() => setTypeFilter('announcement')}
          className={`px-4 py-2 rounded-xl font-medium transition cursor-pointer ${
            typeFilter === 'announcement'
              ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-950'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Platform Notices
        </button>
      </div>

      {/* Notifications List */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 divide-y divide-slate-800/80 overflow-hidden shadow-xl">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            <Bell className="w-8 h-8 text-slate-700 mx-auto mb-2" />
            <div>No notifications found.</div>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => markNotificationRead(item.id)}
              className={`p-5 flex items-start justify-between gap-4 transition cursor-pointer ${
                item.isRead ? 'opacity-70 hover:opacity-100 hover:bg-slate-800/30' : 'bg-emerald-950/20 hover:bg-emerald-950/30'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    item.type === 'reward'
                      ? 'bg-amber-950/80 border border-amber-500/40 text-amber-400'
                      : item.type === 'challenge'
                      ? 'bg-blue-950/80 border border-blue-500/40 text-blue-400'
                      : 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400'
                  }`}
                >
                  {item.type === 'reward' && <Award className="w-5 h-5" />}
                  {item.type === 'challenge' && <Zap className="w-5 h-5" />}
                  {item.type === 'announcement' && <ShieldAlert className="w-5 h-5" />}
                  {item.type === 'system' && <Bell className="w-5 h-5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-sm">{item.title}</h3>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                    {item.message}
                  </p>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>

              {item.linkAction && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationRead(item.id);
                    setActivePage('sports');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1 shrink-0 transition"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
