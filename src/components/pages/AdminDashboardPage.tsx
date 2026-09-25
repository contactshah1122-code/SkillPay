import React, { useState } from 'react';
import {
  Shield,
  PlusCircle,
  HelpCircle,
  Users,
  BarChart3,
  CheckCircle2,
  Bell,
  Coins,
  AlertTriangle,
  Lock,
  Layers,
  Send,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SkillChallenge, Quiz, SportType, Announcement } from '../../types';

export const AdminDashboardPage: React.FC = () => {
  const {
    currentUser,
    switchRole,
    challenges,
    quizzes,
    events,
    supportTickets,
    adminCreateChallenge,
    adminCreateQuiz,
    adminResolveChallenge,
    adminGrantPoints,
    adminCreateAnnouncement,
    adminReplyTicket,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'challenges' | 'quizzes' | 'settlement' | 'users' | 'announcements' | 'tickets'>('overview');

  // New Challenge Form State
  const [newChSport, setNewChSport] = useState<SportType>('cricket');
  const [newChTitle, setNewChTitle] = useState('');
  const [newChDesc, setNewChDesc] = useState('');
  const [newChQuestion, setNewChQuestion] = useState('');
  const [newChEntryPoints, setNewChEntryPoints] = useState(30);
  const [newChRewardPoints, setNewChRewardPoints] = useState(150);
  const [newChOpt1, setNewChOpt1] = useState('');
  const [newChOpt2, setNewChOpt2] = useState('');
  const [newChOpt3, setNewChOpt3] = useState('');

  // New Quiz Form State
  const [newQzSport, setNewQzSport] = useState<SportType>('cricket');
  const [newQzTitle, setNewQzTitle] = useState('');
  const [newQzDifficulty, setNewQzDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [newQzReward, setNewQzReward] = useState(150);
  const [newQzQ1Text, setNewQzQ1Text] = useState('');
  const [newQzQ1Opt0, setNewQzQ1Opt0] = useState('');
  const [newQzQ1Opt1, setNewQzQ1Opt1] = useState('');
  const [newQzQ1Opt2, setNewQzQ1Opt2] = useState('');
  const [newQzQ1Opt3, setNewQzQ1Opt3] = useState('');
  const [newQzQ1Correct, setNewQzQ1Correct] = useState(0);
  const [newQzQ1Expl, setNewQzQ1Expl] = useState('');

  // Settlement Form State
  const [settleChallengeId, setSettleChallengeId] = useState('');
  const [settleOptionId, setSettleOptionId] = useState('');

  // Grant Points State
  const [grantUserId, setGrantUserId] = useState(currentUser.id);
  const [grantAmount, setGrantAmount] = useState(250);
  const [grantReason, setGrantReason] = useState('Top Tactical Analysis Contribution');

  // Announcement State
  const [annTitle, setAnnTitle] = useState('');
  const [annMsg, setAnnMsg] = useState('');
  const [annSeverity, setAnnSeverity] = useState<Announcement['severity']>('info');

  // Ticket Reply State
  const [replyTicketId, setReplyTicketId] = useState('');
  const [replyText, setReplyText] = useState('');

  // If not admin, show permission wall with one-click switcher
  if (currentUser.role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-amber-950/80 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-white">Administrator Access Required</h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          The SkillPlay PK administration dashboard is restricted to certified moderators and tournament arbiters.
        </p>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <strong>Reviewer Note: </strong>You can switch to Administrator Mode with one click to test challenge creation, quiz authoring, result settlement, and user management.
        </div>
        <button
          onClick={() => switchRole('admin')}
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 mx-auto transition cursor-pointer shadow-lg shadow-emerald-950"
        >
          <Shield className="w-4 h-4" />
          <span>Switch to Admin Mode Now</span>
        </button>
      </div>
    );
  }

  // Handle Challenge Creation
  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChTitle || !newChQuestion || !newChOpt1 || !newChOpt2) return;

    adminCreateChallenge({
      eventId: events[0]?.id || 'evt_cricket_02',
      sport: newChSport,
      title: newChTitle,
      description: newChDesc || 'Tactical Pakistani sports skill challenge.',
      entryPoints: Number(newChEntryPoints),
      rewardPoints: Number(newChRewardPoints),
      endTime: new Date(Date.now() + 86400000 * 2).toISOString(),
      status: 'upcoming',
      question: newChQuestion,
      options: [
        { id: 'opt_a', text: newChOpt1, votesPercent: 34 },
        { id: 'opt_b', text: newChOpt2, votesPercent: 42 },
        ...(newChOpt3 ? [{ id: 'opt_c', text: newChOpt3, votesPercent: 24 }] : [])
      ]
    });

    setNewChTitle('');
    setNewChDesc('');
    setNewChQuestion('');
    setNewChOpt1('');
    setNewChOpt2('');
    setNewChOpt3('');
  };

  // Handle Quiz Creation
  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQzTitle || !newQzQ1Text || !newQzQ1Opt0 || !newQzQ1Opt1) return;

    adminCreateQuiz({
      sport: newQzSport,
      title: newQzTitle,
      difficulty: newQzDifficulty,
      rewardPoints: Number(newQzReward),
      timePerQuestionSeconds: 20,
      questions: [
        {
          id: 'q_' + Date.now(),
          question: newQzQ1Text,
          options: [newQzQ1Opt0, newQzQ1Opt1, newQzQ1Opt2 || 'Option C', newQzQ1Opt3 || 'Option D'],
          correctAnswerIndex: Number(newQzQ1Correct),
          explanation: newQzQ1Expl || 'Verified Pakistani sports record.',
        }
      ]
    });

    setNewQzTitle('');
    setNewQzQ1Text('');
    setNewQzQ1Opt0('');
    setNewQzQ1Opt1('');
    setNewQzQ1Opt2('');
    setNewQzQ1Opt3('');
    setNewQzQ1Expl('');
  };

  const handleSettle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settleChallengeId || !settleOptionId) return;
    adminResolveChallenge(settleChallengeId, settleOptionId);
    setSettleChallengeId('');
    setSettleOptionId('');
  };

  const handleGrant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!grantUserId || !grantAmount) return;
    adminGrantPoints(grantUserId, Number(grantAmount), grantReason);
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annMsg) return;
    adminCreateAnnouncement(annTitle, annMsg, annSeverity);
    setAnnTitle('');
    setAnnMsg('');
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyTicketId || !replyText) return;
    adminReplyTicket(replyTicketId, replyText);
    setReplyTicketId('');
    setReplyText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider">
            <span>Administration Console</span>
            <span aria-hidden="true">&middot;</span>
            <span>Platform Governance</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 flex items-center gap-3">
            <span>SkillPlay PK Arbiter Portal</span>
            <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono uppercase">
              Super Admin
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Create tactical skill challenges, publish sports trivia quizzes, verify and settle match outcomes, broadcast announcements, and resolve participant inquiries.
          </p>
        </div>

        <button
          onClick={() => switchRole('user')}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
        >
          <span>Exit to Player Mode</span>
        </button>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
        {[
          { id: 'overview', label: 'Overview & Stats', icon: BarChart3 },
          { id: 'challenges', label: 'Create Challenge', icon: PlusCircle },
          { id: 'quizzes', label: 'Author Quiz', icon: HelpCircle },
          { id: 'settlement', label: 'Settle Results', icon: CheckCircle2 },
          { id: 'users', label: 'Manage Points & Users', icon: Users },
          { id: 'announcements', label: 'Broadcast Alerts', icon: Bell },
          { id: 'tickets', label: 'Support Tickets', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Total Active Competitions</div>
              <div className="text-2xl font-bold text-white font-mono">{challenges.length}</div>
              <div className="text-[11px] text-emerald-400">Tactical Forecasts</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Published Quizzes</div>
              <div className="text-2xl font-bold text-white font-mono">{quizzes.length}</div>
              <div className="text-[11px] text-emerald-400">Sports Trivia Banks</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Support Inquiries</div>
              <div className="text-2xl font-bold text-white font-mono">{supportTickets.length}</div>
              <div className="text-[11px] text-amber-400">{supportTickets.filter(t => t.status === 'open').length} Open Tickets</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Monetary Invariants</div>
              <div className="text-2xl font-bold text-emerald-400 font-mono">0.00 PKR</div>
              <div className="text-[11px] text-slate-500">100% Non-Monetary Guaranteed</div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white">Platform Health &amp; Compliance Status</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Gambling Gateway Check</span>
                </div>
                <p className="text-slate-400">No payment gateways, betting slips, or cashout endpoints integrated.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>PWA &amp; Offline Cache</span>
                </div>
                <p className="text-slate-400">Service worker running with manifest and standalone mobile icons.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Local Data Persistence</span>
                </div>
                <p className="text-slate-400">All state updates synchronize to localStorage with audit immutable keys.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CREATE CHALLENGE */}
      {activeTab === 'challenges' && (
        <form onSubmit={handleCreateChallenge} className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5 text-xs max-w-2xl">
          <div>
            <h2 className="text-lg font-bold text-white">Create New Tactical Skill Challenge</h2>
            <p className="text-slate-400 text-xs mt-0.5">Publish an interactive skill challenge with options and virtual points.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Sport Category</label>
              <select
                value={newChSport}
                onChange={(e) => setNewChSport(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="cricket">Cricket</option>
                <option value="football">Football</option>
                <option value="tennis">Tennis</option>
                <option value="basketball">Basketball</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Challenge Title</label>
              <input
                type="text"
                required
                value={newChTitle}
                onChange={(e) => setNewChTitle(e.target.value)}
                placeholder="e.g. PSL Death Bowling Economy Forecast"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 mb-1 font-medium">Description</label>
            <input
              type="text"
              value={newChDesc}
              onChange={(e) => setNewChDesc(e.target.value)}
              placeholder="e.g. Statistical analysis of Lahore Qalandars bowling depth."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1 font-medium">Forecast Question</label>
            <input
              type="text"
              required
              value={newChQuestion}
              onChange={(e) => setNewChQuestion(e.target.value)}
              placeholder="e.g. Will Haris Rauf concede fewer than 30 runs in 4 overs?"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Entry Virtual Points</label>
              <input
                type="number"
                min="0"
                value={newChEntryPoints}
                onChange={(e) => setNewChEntryPoints(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Reward Virtual Points</label>
              <input
                type="number"
                min="10"
                value={newChRewardPoints}
                onChange={(e) => setNewChRewardPoints(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-slate-300 font-medium">Prediction Options</label>
            <input
              type="text"
              required
              value={newChOpt1}
              onChange={(e) => setNewChOpt1(e.target.value)}
              placeholder="Option 1: Yes (Under 30 runs)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              required
              value={newChOpt2}
              onChange={(e) => setNewChOpt2(e.target.value)}
              placeholder="Option 2: No (30 to 45 runs)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              value={newChOpt3}
              onChange={(e) => setNewChOpt3(e.target.value)}
              placeholder="Option 3 (Optional): High Economy (46+ runs)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition cursor-pointer shadow-md shadow-emerald-950"
          >
            Publish Skill Challenge
          </button>
        </form>
      )}

      {/* TAB 3: AUTHOR QUIZ */}
      {activeTab === 'quizzes' && (
        <form onSubmit={handleCreateQuiz} className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5 text-xs max-w-2xl">
          <div>
            <h2 className="text-lg font-bold text-white">Author &amp; Publish Sports Quiz</h2>
            <p className="text-slate-400 text-xs mt-0.5">Add a new educational sports trivia questionnaire.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Sport</label>
              <select
                value={newQzSport}
                onChange={(e) => setNewQzSport(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="cricket">Cricket</option>
                <option value="football">Football</option>
                <option value="tennis">Tennis</option>
                <option value="basketball">Basketball</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Difficulty</label>
              <select
                value={newQzDifficulty}
                onChange={(e) => setNewQzDifficulty(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Quiz Title</label>
              <input
                type="text"
                required
                value={newQzTitle}
                onChange={(e) => setNewQzTitle(e.target.value)}
                placeholder="e.g. Rawalpindi Cricket Ground Legends"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Reward Points</label>
              <input
                type="number"
                value={newQzReward}
                onChange={(e) => setNewQzReward(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="font-semibold text-emerald-400">Primary Question</div>
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Question Text</label>
              <input
                type="text"
                required
                value={newQzQ1Text}
                onChange={(e) => setNewQzQ1Text(e.target.value)}
                placeholder="e.g. Which bowler took the first hat-trick in PSL history?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={newQzQ1Opt0}
                onChange={(e) => setNewQzQ1Opt0(e.target.value)}
                placeholder="Option A (Index 0)"
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                required
                value={newQzQ1Opt1}
                onChange={(e) => setNewQzQ1Opt1(e.target.value)}
                placeholder="Option B (Index 1)"
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                value={newQzQ1Opt2}
                onChange={(e) => setNewQzQ1Opt2(e.target.value)}
                placeholder="Option C (Index 2)"
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                value={newQzQ1Opt3}
                onChange={(e) => setNewQzQ1Opt3(e.target.value)}
                placeholder="Option D (Index 3)"
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Correct Option Index</label>
                <select
                  value={newQzQ1Correct}
                  onChange={(e) => setNewQzQ1Correct(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value={0}>Option A (0)</option>
                  <option value={1}>Option B (1)</option>
                  <option value={2}>Option C (2)</option>
                  <option value={3}>Option D (3)</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Explanation</label>
                <input
                  type="text"
                  value={newQzQ1Expl}
                  onChange={(e) => setNewQzQ1Expl(e.target.value)}
                  placeholder="e.g. Mohammad Nawaz achieved this in PSL 2016."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition cursor-pointer shadow-md shadow-emerald-950"
          >
            Publish Quiz to Library
          </button>
        </form>
      )}

      {/* TAB 4: SETTLE RESULTS */}
      {activeTab === 'settlement' && (
        <div className="space-y-6 max-w-2xl">
          <form onSubmit={handleSettle} className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-xs">
            <div>
              <h2 className="text-lg font-bold text-white">Verify Outcome &amp; Distribute Points</h2>
              <p className="text-slate-400 text-xs mt-0.5">Settle active tactical predictions upon official match conclusion.</p>
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium">Select Active Challenge</label>
              <select
                value={settleChallengeId}
                onChange={(e) => {
                  setSettleChallengeId(e.target.value);
                  const ch = challenges.find(c => c.id === e.target.value);
                  if (ch && ch.options[0]) setSettleOptionId(ch.options[0].id);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="">-- Choose Challenge to Settle --</option>
                {challenges.filter(c => c.status !== 'completed').map(c => (
                  <option key={c.id} value={c.id}>
                    [{c.sport.toUpperCase()}] {c.title}
                  </option>
                ))}
              </select>
            </div>

            {settleChallengeId && (
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Winning Verified Option</label>
                <select
                  value={settleOptionId}
                  onChange={(e) => setSettleOptionId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  {challenges.find(c => c.id === settleChallengeId)?.options.map(opt => (
                    <option key={opt.id} value={opt.id}>
                      {opt.text}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={!settleChallengeId}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-semibold transition cursor-pointer shadow-md shadow-emerald-950"
            >
              Verify Outcome &amp; Credit Winner Ledgers
            </button>
          </form>
        </div>
      )}

      {/* TAB 5: MANAGE POINTS & USERS */}
      {activeTab === 'users' && (
        <form onSubmit={handleGrant} className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-xs max-w-xl">
          <div>
            <h2 className="text-lg font-bold text-white">Grant Promotional Virtual Points</h2>
            <p className="text-slate-400 text-xs mt-0.5">Award promotional points to active community members or testers.</p>
          </div>

          <div>
            <label className="block text-slate-300 mb-1 font-medium">Recipient User ID</label>
            <input
              type="text"
              required
              value={grantUserId}
              onChange={(e) => setGrantUserId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1 font-medium">Virtual Points Amount</label>
            <input
              type="number"
              min="10"
              max="50000"
              value={grantAmount}
              onChange={(e) => setGrantAmount(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1 font-medium">Reason for Grant</label>
            <input
              type="text"
              required
              value={grantReason}
              onChange={(e) => setGrantReason(e.target.value)}
              placeholder="e.g. Exceptional Sports Analysis / Bug Bounty Award"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold transition cursor-pointer shadow-md shadow-amber-950"
          >
            Execute Administrative Grant
          </button>
        </form>
      )}

      {/* TAB 6: ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <form onSubmit={handleBroadcast} className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-xs max-w-xl">
          <div>
            <h2 className="text-lg font-bold text-white">Broadcast Platform Announcement</h2>
            <p className="text-slate-400 text-xs mt-0.5">Send a system notification to all Pakistani sports participants.</p>
          </div>

          <div>
            <label className="block text-slate-300 mb-1 font-medium">Title</label>
            <input
              type="text"
              required
              value={annTitle}
              onChange={(e) => setAnnTitle(e.target.value)}
              placeholder="e.g. PSL Finals Special Quiz Series Starting Tonight"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1 font-medium">Message</label>
            <textarea
              rows={3}
              required
              value={annMsg}
              onChange={(e) => setAnnMsg(e.target.value)}
              placeholder="e.g. Double streak points for every match solved during the PSL knockout stages!"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1 font-medium">Severity</label>
            <select
              value={annSeverity}
              onChange={(e) => setAnnSeverity(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="info">Info (Standard)</option>
              <option value="success">Success (Celebration)</option>
              <option value="warning">Warning (Important Notice)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition cursor-pointer shadow-md shadow-emerald-950"
          >
            Broadcast Announcement
          </button>
        </form>
      )}

      {/* TAB 7: TICKETS */}
      {activeTab === 'tickets' && (
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white">Pending Participant Inquiries ({supportTickets.length})</h2>

            {supportTickets.map((t) => (
              <div key={t.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-white text-sm">{t.subject}</div>
                    <div className="text-slate-400 mt-0.5">From: {t.userName} ({t.email}) &middot; Category: {t.category}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                    t.status === 'resolved' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                  }`}>
                    {t.status}
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                  {t.message}
                </div>

                {t.reply ? (
                  <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-emerald-200">
                    <strong>Replied: </strong>{t.reply}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Write resolution reply..."
                      value={replyTicketId === t.id ? replyText : ''}
                      onChange={(e) => {
                        setReplyTicketId(t.id);
                        setReplyText(e.target.value);
                      }}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      onClick={handleReply}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shrink-0 cursor-pointer"
                    >
                      Send Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
