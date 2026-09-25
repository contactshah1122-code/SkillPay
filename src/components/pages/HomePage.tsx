import React from 'react';
import {
  Trophy,
  Flame,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Award,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Play
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import heroStadiumImg from '../../assets/images/hero_cricket_stadium_1790335329094.jpg';
import footballImg from '../../assets/images/football_action_shot_1790335343156.jpg';
import tennisImg from '../../assets/images/tennis_court_championship_1790335355368.jpg';
import trophyImg from '../../assets/images/trophy_champion_crest_1790335366147.jpg';

export const HomePage: React.FC = () => {
  const {
    currentUser,
    setActivePage,
    setSelectedSport,
    challenges,
    events,
    dailyLeaderboard,
    claimDailyCheckin,
    enterChallenge
  } = useApp();

  const featuredChallenge = challenges.find(c => c.isFeatured && (c.status === 'live' || c.status === 'upcoming')) || challenges[0];
  const todayChallenges = challenges.filter(c => c.status === 'upcoming' || c.status === 'live').slice(0, 3);
  const recentCompletedEvent = events.find(e => e.status === 'completed') || events[0];

  const sportsCards = [
    {
      id: 'cricket',
      name: 'Cricket',
      label: 'PSL & International',
      eventsCount: 3,
      image: heroStadiumImg,
      icon: '🏏'
    },
    {
      id: 'football',
      name: 'Football',
      label: 'PPFL & Asian Qualifiers',
      eventsCount: 2,
      image: footballImg,
      icon: '⚽'
    },
    {
      id: 'tennis',
      name: 'Tennis',
      label: 'Davis Cup & Challenger',
      eventsCount: 2,
      image: tennisImg,
      icon: '🎾'
    },
    {
      id: 'basketball',
      name: 'Basketball',
      label: 'National Championship',
      eventsCount: 2,
      image: trophyImg,
      icon: '🏀'
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Non-monetary compliance banner */}
      <div className="bg-emerald-950/40 border-y border-emerald-500/20 py-2.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            <strong>Official Skill Gaming Platform</strong>: Non-monetary virtual points only. No deposits, no betting slips, zero gambling.
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl min-h-[460px] flex items-center">
          {/* Background Image with Contrast Scrim */}
          <img
            src={heroStadiumImg}
            alt="Pakistani Cricket Stadium Floodlights"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-2xl p-6 sm:p-12 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <span>Pakistan Super League &amp; National Sports</span>
              <span aria-hidden="true">&middot;</span>
              <span>Pure Skill &amp; Trivia</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Test Your Sports Intellect. <span className="text-emerald-400">Dominate The Leaderboard.</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Compete in daily Pakistani cricket trivia, tactical sports prediction challenges, and climb national leaderboards using non-monetary virtual skill points.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActivePage('quiz')}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold text-white text-sm flex items-center gap-2 transition active:scale-[0.98] shadow-lg shadow-emerald-950 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Play Live Sports Quiz</span>
              </button>
              <button
                onClick={() => setActivePage('sports')}
                className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 font-semibold text-slate-200 text-sm flex items-center gap-2 transition active:scale-[0.98] cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Explore Sports Challenges</span>
              </button>
              <button
                onClick={claimDailyCheckin}
                className="px-4 py-3 rounded-xl bg-amber-950/40 hover:bg-amber-900/50 border border-amber-600/30 text-amber-300 text-sm font-semibold flex items-center gap-1.5 transition active:scale-[0.98] cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Claim Daily Streak</span>
              </button>
            </div>

            {/* User Quick Stats Bar */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div>
                <span className="text-slate-500">Your Virtual Balance: </span>
                <span className="font-bold text-amber-400 font-mono tabular-nums text-sm">
                  {currentUser.points.toLocaleString()} PTS
                </span>
              </div>
              <span aria-hidden="true">&middot;</span>
              <div>
                <span className="text-slate-500">National Standing: </span>
                <span className="font-semibold text-white">Rank #{currentUser.rank}</span>
              </div>
              <span aria-hidden="true">&middot;</span>
              <div>
                <span className="text-slate-500">Streak: </span>
                <span className="font-semibold text-amber-400">{currentUser.streakDays} Days</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Challenge Spotlight */}
      {featuredChallenge && (
        <section className="px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
                Marquee Competition
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Featured Skill Challenge
              </h2>
            </div>
            <button
              onClick={() => setActivePage('sports')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View All Challenges</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-emerald-400 font-semibold uppercase">{featuredChallenge.sport}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{featuredChallenge.totalParticipants} Pakistani Competitors Entered</span>
                  <span aria-hidden="true">&middot;</span>
                  <span className="text-amber-400 font-semibold">Reward: +{featuredChallenge.rewardPoints} PTS</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {featuredChallenge.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {featuredChallenge.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                  <strong>Question: </strong>{featuredChallenge.question}
                </div>
              </div>

              {/* Prediction Options */}
              <div className="w-full lg:w-96 space-y-2.5">
                <div className="text-xs font-medium text-slate-400 flex items-center justify-between">
                  <span>Forecast Option</span>
                  <span>Entry: {featuredChallenge.entryPoints} PTS</span>
                </div>

                {featuredChallenge.options.map((option) => {
                  const isSelected = featuredChallenge.userPrediction === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => enterChallenge(featuredChallenge.id, option.id)}
                      disabled={Boolean(featuredChallenge.userPrediction)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200'
                      }`}
                    >
                      <span className="truncate pr-2">{option.text}</span>
                      <span className="text-[11px] font-mono text-slate-400 shrink-0">
                        {option.votesPercent}%
                      </span>
                    </button>
                  );
                })}

                {featuredChallenge.userPrediction ? (
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 justify-center pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Your prediction is recorded. Results settle post-match.</span>
                  </div>
                ) : (
                  <div className="text-[10px] text-slate-500 text-center">
                    Uses non-monetary virtual points only. Zero cash risk.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sports Categories Grid */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="mb-4">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
            Browse By Discipline
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Sports Competitions
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {sportsCards.map((card) => (
            <button
              key={card.id}
              onClick={() => {
                setSelectedSport(card.id as any);
                setActivePage('sports');
              }}
              className="group text-left p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-md relative overflow-hidden cursor-pointer"
            >
              <div className="h-28 rounded-xl overflow-hidden mb-3 relative bg-slate-800">
                <img
                  src={card.image}
                  alt={card.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <span className="absolute bottom-2 left-2 text-xl">{card.icon}</span>
              </div>
              <div className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                {card.name}
              </div>
              <div className="text-xs text-slate-400 truncate mt-0.5">{card.label}</div>
              <div className="mt-2 text-[11px] text-emerald-400 font-mono">
                {card.eventsCount} Active Events
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Two Column Grid: Today's Skill Challenges & Live Leaderboard */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Today's Challenges */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
                Active Tactical Challenges
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Today's Skill Challenges
              </h2>
            </div>
            <button
              onClick={() => setActivePage('sports')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              <span>See All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {todayChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-semibold uppercase">{challenge.sport}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="text-slate-400">{challenge.totalParticipants} Participants</span>
                  </div>
                  <span className="text-amber-400 font-mono font-bold">+{challenge.rewardPoints} PTS</span>
                </div>

                <h3 className="text-sm font-semibold text-white leading-snug">
                  {challenge.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {challenge.description}
                </p>

                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Entry: {challenge.entryPoints} virtual points
                  </span>
                  <button
                    onClick={() => {
                      setActivePage('sports');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition cursor-pointer"
                  >
                    {challenge.userPrediction ? 'View Submitted Prediction' : 'Enter Challenge'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Current Daily Leaderboard */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
                National Standings
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Daily Leaderboard
              </h2>
            </div>
            <button
              onClick={() => setActivePage('leaderboard')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Full Board</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            {dailyLeaderboard.slice(0, 5).map((user) => (
              <div
                key={user.id}
                className={`p-2.5 rounded-xl flex items-center justify-between text-xs transition ${
                  user.id === currentUser.id
                    ? 'bg-emerald-950/50 border border-emerald-500/40 text-white font-semibold'
                    : 'bg-slate-950/50 border border-slate-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-5 text-center font-mono font-bold ${
                    user.rank === 1 ? 'text-amber-400' : user.rank === 2 ? 'text-slate-300' : user.rank === 3 ? 'text-amber-600' : 'text-slate-500'
                  }`}>
                    {user.rank}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-lg bg-slate-800"
                  />
                  <div>
                    <div className="font-semibold truncate max-w-[110px]">{user.name}</div>
                    <div className="text-[10px] text-slate-500">{user.city}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-amber-400 tabular-nums">
                    {user.points.toLocaleString()} PTS
                  </div>
                  <div className="text-[10px] text-slate-500">{user.winRate}% win rate</div>
                </div>
              </div>
            ))}

            <button
              onClick={() => setActivePage('leaderboard')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold transition text-center mt-2 cursor-pointer"
            >
              View Weekly &amp; Monthly Champions
            </button>
          </div>
        </div>
      </section>

      {/* Recent Match Results Showcase */}
      {recentCompletedEvent && (
        <section className="px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
                  Verified Outcome
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Recent Match Results &amp; Verified Scorecard
                </h2>
              </div>
              <button
                onClick={() => setActivePage('results')}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
              >
                <span>All Results</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span>{recentCompletedEvent.series}</span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{recentCompletedEvent.venue}</span>
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <span>{recentCompletedEvent.teamA.flagOrLogo}</span>
                      <span>{recentCompletedEvent.teamA.name}</span>
                    </span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      {recentCompletedEvent.teamA.score}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-300 text-sm flex items-center gap-2">
                      <span>{recentCompletedEvent.teamB.flagOrLogo}</span>
                      <span>{recentCompletedEvent.teamB.name}</span>
                    </span>
                    <span className="font-mono font-bold text-slate-400 text-sm">
                      {recentCompletedEvent.teamB.score}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-xs text-emerald-400 font-medium">
                  {recentCompletedEvent.resultSummary}
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                  Tactical Match Highlights
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {recentCompletedEvent.highlights?.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Banner */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Ready to Test Your Pakistani Sports Knowledge?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Join thousands of passionate sports fans across Pakistan. Play quizzes, make non-monetary skill predictions, and earn your place among the tactical elite.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActivePage('quiz')}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition active:scale-[0.98] shadow-lg shadow-emerald-950 cursor-pointer"
            >
              Start Free Quiz
            </button>
            <button
              onClick={() => setActivePage('daily')}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition cursor-pointer"
            >
              Daily Quests
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
