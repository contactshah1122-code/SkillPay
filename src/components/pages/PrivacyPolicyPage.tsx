import React from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-16 text-slate-300 text-xs sm:text-sm leading-relaxed">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider">
          <span>Legal Compliance</span>
          <span aria-hidden="true">&middot;</span>
          <span>Data Protection</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Effective Date: September 2026 &middot; SkillPlay PK
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <span>
          SkillPlay PK does not collect bank accounts, debit/credit card numbers, CNIC financial credentials, or payment information because real money transactions are strictly prohibited on this platform.
        </span>
      </div>

      <div className="space-y-6 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">1. Information We Collect</h2>
          <p>
            SkillPlay PK collects limited personal information strictly required to facilitate the skill-gaming and trivia platform:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Account Information: Name, chosen username, and email address.</li>
            <li>Sports Preferences: Favorite Pakistani cricket franchise, national teams, and city.</li>
            <li>Platform Gameplay Telemetry: Quiz scores, answered questions, streak counts, and non-monetary virtual points balance.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">2. Purpose of Data Processing</h2>
          <p>
            Your information is processed exclusively to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Maintain your user profile, leaderboard standing, and badge progression.</li>
            <li>Calculate national daily, weekly, and monthly sports trivia leaderboards.</li>
            <li>Prevent automated botting and enforce fair play community guidelines.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">3. Zero Real-Money / Banking Data</h2>
          <p>
            Because SkillPlay PK operates solely on non-monetary virtual points and does NOT accept deposits or stakes:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>We never request, store, or process credit card, debit card, JazzCash, EasyPaisa, or bank account details.</li>
            <li>No payment gateway or financial merchant SDKs are connected to our servers.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">4. Data Security &amp; Storage</h2>
          <p>
            All account authentication information is stored securely in encrypted environments. We do not sell, rent, or trade your personal information with third-party advertisers or external gambling brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">5. Account Deletion &amp; Inquiries</h2>
          <p>
            Competitors may request full account and points ledger erasure at any time by lodging a support ticket through our Help &amp; Support portal.
          </p>
        </section>
      </div>
    </div>
  );
};
