import React from 'react';
import { ShieldAlert, CheckCircle2, FileCheck } from 'lucide-react';

export const TermsOfServicePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-16 text-slate-300 text-xs sm:text-sm leading-relaxed">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider">
          <span>Platform Agreement</span>
          <span aria-hidden="true">&middot;</span>
          <span>Terms of Participation</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Effective Date: September 2026 &middot; SkillPlay PK
        </p>
      </div>

      {/* Zero Gambling Warning Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/30 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-white text-sm">
            Strict Prohibition of Gambling, Real-Money Stakes, and Financial Wagering
          </div>
          <p className="text-rose-200/90 leading-relaxed">
            SkillPlay PK is NOT a gambling, betting, or wagering service. We strictly prohibit real-money entries, odds trading, financial deposits, cash-out mechanics, or exchange of virtual items for real-world currency.
          </p>
        </div>
      </div>

      <div className="space-y-6 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">1. Nature of the Platform</h2>
          <p>
            SkillPlay PK provides an educational, skill-based digital community for Pakistani sports fans. Participation involves sports trivia tests, tactical match forecasting, and daily knowledge quests. Outcomes are governed exclusively by knowledge, analytical skill, and familiarity with sporting rules.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">2. Virtual Points — Zero Monetary Value</h2>
          <p>
            By accessing SkillPlay PK, every user acknowledges and agrees that:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Virtual points are digital amusement counters with ZERO commercial, cash, or exchange value.</li>
            <li>Virtual points cannot be converted into Pakistani Rupees (PKR), US Dollars (USD), cryptocurrency, or physical prizes.</li>
            <li>Points cannot be transferred between accounts for real money, sold, or bartered.</li>
            <li>Any attempt to create an external market for SkillPlay PK accounts or points will result in immediate permanent account termination.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">3. Eligibility and Account Conduct</h2>
          <p>
            Users must comply with the following community rules:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Users agree to provide truthful registration information.</li>
            <li>The use of automated scripts, web scrapers, bots, or unauthorized third-party software to solve trivia questions is strictly prohibited.</li>
            <li>Multiple duplicate accounts created by one person to manipulate leaderboard standings will be banned.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">4. Sports Data &amp; Match Verification</h2>
          <p>
            Match scores, team rosters, and tactical outcomes are collated from verified official sports authorities (PCB, PFF, PTF, FIBA). In the event of abandoned fixtures or match cancellations, affected skill challenges are declared null and entered virtual points are restored to user ledgers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">5. Governing Law &amp; Digital Ethics</h2>
          <p>
            These Terms are governed by Pakistani law and general digital community ethics. SkillPlay PK is engineered as a recreational skill platform designed to celebrate sports culture without gambling harms.
          </p>
        </section>
      </div>
    </div>
  );
};
