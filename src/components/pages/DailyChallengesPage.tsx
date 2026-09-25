import React from 'react';
import {
  Flame,
  CheckCircle2,
  Calendar,
  Award,
  Sparkles,
  Zap,
  Target,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DailyChallengesPage: React.FC = () => {
  const {
    currentUser,
    dailyChallenges,
    claimDailyChallenge,
    claimDailyCheckin,
    setActivePage
  } = useApp();

  const streakDays = [
    { day: 1, reward: 50, label: 'Day 1' },
    { day: 2, reward: 60, label: 'Day 2' },
    { day: 3, reward: 75, label: 'Day 3' },
    { day: 4, reward: 90, label: 'Day 4' },
    { day: 5, reward: 120, label: 'Day 5' },
    { day: 6, reward: 150, label: 'Day 6' },
    { day: 7, reward: 250, label: 'Day 7 Champion' },
  ];

  const currentStreakMod = ((currentUser.streakDays - 1) % 7) + 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider">
          <span>Continuous Skill Progression</span>
          <span aria-hidden="true">&middot;</span>
          <span>Zero Real-Money Risk</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          Daily Skill Challenges &amp; Streak
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
          Log in daily, complete sports trivia quizzes, participate in tactical predictions, and claim non-monetary virtual points to boost your national leaderboard ranking.
        </p>
      </div>

      {/* 7-Day Streak Calendar Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Flame className="w-6 h-6 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>{currentUser.streakDays} Day Loyalty Streak</span>
                <span className="text-xs bg-amber-950/80 text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-600/40">
                  Active
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Check in every 24 hours to earn escalating promotional skill points.
              </p>
            </div>
          </div>

          <button
            onClick={claimDailyCheckin}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950 transition active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>Claim Today's Streak Points</span>
          </button>
        </div>

        {/* 7-Day Visual Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {streakDays.map((item) => {
            const isCompleted = item.day <= currentStreakMod;
            const isToday = item.day === currentStreakMod;

            return (
              <div
                key={item.day}
                className={`p-3.5 rounded-2xl border text-center transition ${
                  isToday
                    ? 'bg-amber-950/50 border-amber-500 text-white ring-1 ring-amber-500/40'
                    : isCompleted
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="text-[11px] font-semibold text-slate-400 uppercase font-mono">
                  {item.label}
                </div>
                <div className="my-2 flex justify-center">
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <Award className="w-6 h-6 text-slate-600" />
                  )}
                </div>
                <div className="font-mono font-bold text-xs text-amber-300">
                  +{item.reward} PTS
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  {isToday ? 'Today' : isCompleted ? 'Claimed' : 'Upcoming'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Quests List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
              Today's Targets
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Active Skill Quests
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Resets daily at 00:00 PKT
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dailyChallenges.map((task) => {
            const isComplete = task.currentCount >= task.targetCount;
            const percent = Math.min(100, Math.round((task.currentCount / task.targetCount) * 100));

            return (
              <div
                key={task.id}
                className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-4 shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{task.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{task.description}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-xs text-amber-400">
                      +{task.rewardPoints} PTS
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>Progress: {task.currentCount} / {task.targetCount}</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Action button */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-500">
                    {task.isClaimed ? 'Reward credited to ledger' : isComplete ? 'Goal achieved!' : 'In progress'}
                  </span>

                  {task.isClaimed ? (
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Claimed</span>
                    </span>
                  ) : isComplete ? (
                    <button
                      onClick={() => claimDailyChallenge(task.id)}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition cursor-pointer shadow-md shadow-emerald-950"
                    >
                      Claim +{task.rewardPoints} PTS
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (task.type === 'quiz') setActivePage('quiz');
                        else setActivePage('sports');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer flex items-center gap-1"
                    >
                      <span>Play Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
