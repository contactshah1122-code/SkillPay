import React from 'react';
import { ShieldCheck, Award, Heart, CheckCircle2 } from 'lucide-react';
import { useApp, PageRoute } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActivePage } = useApp();

  const handleNav = (route: PageRoute) => {
    setActivePage(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-12 pb-24 md:pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Anti-Gambling Regulatory & Compliance Badge Bar */}
        <div className="mb-10 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-slate-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                <span>100% Non-Monetary Skill Gaming &amp; Sports Trivia Platform</span>
                <span className="text-[10px] bg-emerald-900/60 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-700/50">
                  Zero Real-Money Risk
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                SkillPlay PK prohibits real-money wagering, stakes, or financial deposits. Virtual points are purely promotional entertainment metrics with ZERO cash or exchange value.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-emerald-400 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>No Deposits</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>No Odds or Slips</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Skill &amp; Knowledge Only</span>
            </div>
          </div>
        </div>

        {/* 4 Column Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-emerald-100 font-bold text-xs">
                🇵🇰
              </span>
              <span className="font-display font-extrabold text-base tracking-tight text-white">
                SkillPlay<span className="text-emerald-500">PK</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Pakistan's dedicated sports intelligence and skill competition arena. Test knowledge on PSL cricket, domestic football, Davis Cup tennis, and national basketball.
            </p>
            <div className="text-slate-500 text-[11px]">
              Made with passion for Pakistani sports fans.
            </div>
          </div>

          {/* Competitions */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-xs tracking-wide uppercase font-mono">
              Competitions
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('sports')} className="hover:text-emerald-400 transition-colors">
                  Cricket PSL &amp; ODIs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('sports')} className="hover:text-emerald-400 transition-colors">
                  Pak Football League
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('sports')} className="hover:text-emerald-400 transition-colors">
                  Davis Cup &amp; Tennis
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('daily')} className="hover:text-emerald-400 transition-colors">
                  Daily Skill Tasks
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('quiz')} className="hover:text-emerald-400 transition-colors">
                  Sports Quizzes &amp; Trivia
                </button>
              </li>
            </ul>
          </div>

          {/* Leaderboard & Stats */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-xs tracking-wide uppercase font-mono">
              Standings &amp; Data
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('leaderboard')} className="hover:text-emerald-400 transition-colors">
                  National Leaderboard
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('results')} className="hover:text-emerald-400 transition-colors">
                  Match Results &amp; Scores
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('history')} className="hover:text-emerald-400 transition-colors">
                  Points History &amp; Ledger
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('profile')} className="hover:text-emerald-400 transition-colors">
                  Competitor Profile
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('notifications')} className="hover:text-emerald-400 transition-colors">
                  Activity Notifications
                </button>
              </li>
            </ul>
          </div>

          {/* Platform & Governance */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-xs tracking-wide uppercase font-mono">
              Governance &amp; Support
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-emerald-400 transition-colors">
                  About SkillPlay PK
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('help')} className="hover:text-emerald-400 transition-colors">
                  Help Center &amp; Support
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('terms')} className="hover:text-emerald-400 transition-colors">
                  Terms of Service (Non-Monetary)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy')} className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="text-emerald-400 font-semibold hover:underline">
                  Admin Console
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; 2026 SkillPlay PK. All rights reserved. Registered sports knowledge community platform in Pakistan.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Strict Anti-Gambling Architecture</span>
            <span>&bull;</span>
            <span className="text-slate-400">PWA Enabled</span>
            <span>&bull;</span>
            <span className="text-slate-400">Zero Monetary Wagers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
