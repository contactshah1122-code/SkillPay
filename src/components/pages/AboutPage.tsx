import React from 'react';
import {
  ShieldCheck,
  Award,
  BookOpen,
  Users,
  Target,
  Trophy,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import trophyImg from '../../assets/images/trophy_champion_crest_1790335366147.jpg';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider">
          <span>Mission &amp; Philosophy</span>
          <span aria-hidden="true">&middot;</span>
          <span>Sports Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          About SkillPlay PK
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
          Pakistan's premier skill-competition and sports knowledge platform, engineered to celebrate sports passion without financial wagering.
        </p>
      </div>

      {/* Main Philosophy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Elevating Pakistani Sports Engagement Through Knowledge &amp; Strategy
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            SkillPlay PK was founded on a simple conviction: genuine sports fans value knowledge, strategic foresight, and friendly community rivalry far more than real-money wagering.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            From the electric nights of the Pakistan Super League at Gaddafi Stadium to the Davis Cup grass courts in Islamabad and the domestic football pitches of Rawalpindi, Pakistan possesses an unmatched sports heritage. SkillPlay PK provides an interactive, non-monetary arena where fans test that acumen.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <strong className="text-white">100% Skill-Determined: </strong>
                Outcomes depend on statistical analysis, player understanding, and historical trivia knowledge.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <strong className="text-white">Strictly Non-Monetary: </strong>
                Virtual points have ZERO cash value and cannot be bought, sold, or cashed out.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <strong className="text-white">Community &amp; Pride: </strong>
                Represent your city and favorite Pakistani sports franchise on national leaderboards.
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl relative">
          <img
            src={trophyImg}
            alt="SkillPlay PK Champion Emblem"
            referrerPolicy="no-referrer"
            className="w-full h-80 object-cover"
          />
          <div className="p-6 bg-slate-900 border-t border-slate-800 space-y-2">
            <div className="text-xs font-mono uppercase font-semibold text-emerald-400">
              Integrity &amp; Compliance
            </div>
            <div className="font-bold text-white text-base">
              Pakistani Digital Ethics &amp; Fair Play
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              We operate strictly within ethical standards that protect participants from predatory gambling mechanics, deposits, wagers, or financial losses.
            </p>
          </div>
        </div>
      </div>

      {/* The 4 Core Disciplines */}
      <div className="space-y-6">
        <div>
          <div className="text-xs font-semibold text-emerald-400 uppercase font-mono tracking-wider">
            Comprehensive Sports Coverage
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Our Covered Disciplines
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-2xl">🏏</span>
            <h3 className="font-bold text-white text-sm">Cricket (PCB &amp; PSL)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              In-depth coverage of the Pakistan Super League, bilateral ODI and T20I tours, Quaid-e-Azam Trophy, and ICC World Cups.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-2xl">⚽</span>
            <h3 className="font-bold text-white text-sm">Football (PPFL &amp; AFC)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pakistan Premier Football League fixtures, national team FIFA/AFC World Cup qualifiers, and historic Sialkot match ball trivia.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-2xl">🎾</span>
            <h3 className="font-bold text-white text-sm">Tennis (Davis Cup)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pakistan Davis Cup World Group ties, ATP Challenger events, and Grand Slam doubles milestones.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-2xl">🏀</span>
            <h3 className="font-bold text-white text-sm">Basketball (National)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              National Men's Basketball Championships, departmental tournaments, and rules precision quizzes.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div>
          <div className="text-xs font-semibold text-emerald-400 uppercase font-mono tracking-wider">
            Transparency &amp; Governance
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="font-bold text-white text-sm">
              Is SkillPlay PK a gambling or betting website?
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Absolutely NOT.</strong> SkillPlay PK is 100% free-to-participate and operates on purely educational and recreational principles. We do not accept bank deposits, JazzCash, EasyPaisa, credit cards, or cash. We do not offer odds, payouts, or betting slips.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="font-bold text-white text-sm">
              Can virtual points be converted to Pakistani Rupees (PKR)?
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>No.</strong> SkillPlay PK virtual points hold ZERO monetary value. They are purely internal amusement tokens used to enter tactical challenges and compare rankings on leaderboards.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="font-bold text-white text-sm">
              How do I acquire more virtual points if I run out?
            </div>
            <p className="text-slate-300 leading-relaxed">
              You can earn more points at any time by completing sports trivia quizzes, claiming your daily streak bonus, or solving daily skill quests. Points are never purchased with money.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
