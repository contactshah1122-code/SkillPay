import React, { useState } from 'react';
import { X, Shield, User, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [favTeam, setFavTeam] = useState('Lahore Qalandars');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    loginUser(email, name || undefined);
  };

  const quickDemoLogin = (type: 'user' | 'admin') => {
    if (type === 'admin') {
      loginUser('admin@skillplay.pk', 'Official Admin');
    } else {
      loginUser('hamza.sports@skillplay.pk', 'Hamza Khan');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 mb-3">
            🇵🇰
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {isSignUp ? 'Join SkillPlay PK' : 'Welcome to SkillPlay PK'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Pakistan's Premier Non-Monetary Sports Intelligence &amp; Skill Gaming Arena
          </p>
        </div>

        {/* Zero Gambling Reminder Pill */}
        <div className="mb-6 p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300 flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Pure sports skill &amp; trivia. Zero real-money deposits, stakes, or odds.</span>
        </div>

        {/* Quick Demo Login Buttons */}
        <div className="mb-6 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => quickDemoLogin('user')}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <User className="w-3.5 h-3.5 text-emerald-400" />
            <span>Player Demo</span>
          </button>
          <button
            type="button"
            onClick={() => quickDemoLogin('admin')}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 text-xs font-semibold border border-emerald-700/50 transition"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Admin Demo</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-900 px-3 text-[11px] text-slate-500 uppercase font-mono tracking-wider absolute">
            Or Sign In Manually
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isSignUp && (
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Bilal Ahmed"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          )}

          <div>
            <label className="block text-slate-300 mb-1 font-medium">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.pk"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 mb-1 font-medium">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Favorite PSL / National Team</label>
              <select
                value={favTeam}
                onChange={(e) => setFavTeam(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
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
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold text-white flex items-center justify-center gap-2 transition active:scale-[0.99] shadow-lg shadow-emerald-950"
          >
            <span>{isSignUp ? 'Create Free Account & Claim 500 PTS' : 'Sign In to SkillPlay PK'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-slate-400">
          {isSignUp ? 'Already registered?' : 'Need a SkillPlay PK account?'}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-emerald-400 font-semibold hover:underline"
          >
            {isSignUp ? 'Log In' : 'Sign Up Free (Receive +500 PTS)'}
          </button>
        </div>
      </div>
    </div>
  );
};
