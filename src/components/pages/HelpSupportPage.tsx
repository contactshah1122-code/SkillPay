import React, { useState } from 'react';
import {
  HelpCircle,
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  Send,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SupportTicket } from '../../types';

export const HelpSupportPage: React.FC = () => {
  const { supportTickets, createSupportTicket, currentUser } = useApp();

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<SupportTicket['category']>('rules');
  const [message, setMessage] = useState('');
  const [faqSearch, setFaqSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How does the non-monetary points system function?',
      a: 'Points on SkillPlay PK are strictly digital engagement tokens. You earn points by completing sports quizzes, checking in daily, and correctly forecasting match tactical metrics. Points cannot be redeemed for cash or currency.'
    },
    {
      q: 'When are match skill challenges settled?',
      a: 'Challenges are officially verified within 30 minutes following the conclusion of the sporting fixture by our sports arbitration team.'
    },
    {
      q: 'How is daily and weekly leaderboard ranking determined?',
      a: 'Rankings are ordered by total accumulated virtual points within the specified timeframe. In the event of a tie, the competitor with the higher cumulative quiz accuracy percentage is awarded higher rank.'
    },
    {
      q: 'What should I do if a quiz timer expires before I submit?',
      a: 'If the timer hits 0s, the unanswered question is recorded as incorrect. You can re-take the quiz from the Quiz library at any time.'
    },
    {
      q: 'Are deposits or payments accepted for VIP privileges?',
      a: 'No. There are no VIP purchases, pay-to-win upgrades, or payment gateways. Every Pakistani sports fan starts on equal footing.'
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    createSupportTicket(subject, category, message);
    setSubject('');
    setMessage('');
  };

  const userTickets = supportTickets.filter((t) => t.userId === currentUser.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider">
          <span>Assistance &amp; Inquiries</span>
          <span aria-hidden="true">&middot;</span>
          <span>Community Help</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          Help Center &amp; Support
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
          Find instant answers to competition rules, submit inquiries to our moderation team, and review ticket resolutions.
        </p>
      </div>

      {/* Two Column Layout: FAQ on Left, Ticket submission on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Cols: FAQs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              <span>Knowledge Base &amp; FAQs</span>
            </h2>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search frequently asked questions..."
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-white hover:text-emerald-400 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-slate-500 text-base shrink-0 font-mono">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 5 Cols: Submit a Ticket */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white">Submit Support Ticket</h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have a question about rules, score reconciliation, or account management? Send a query to our Pakistani community arbiters.
            </p>

            <form onSubmit={handleSubmitTicket} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Inquiry Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="rules">Rules &amp; Challenge Scoring</option>
                  <option value="quiz">Quiz Question Feedback</option>
                  <option value="points">Virtual Points Inquiry</option>
                  <option value="account">Account &amp; Profile</option>
                  <option value="fair_play">Fair Play &amp; Community</option>
                  <option value="bug_report">Technical Bug Report</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Summary of inquiry"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Detailed Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide match details or question reference..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md shadow-emerald-950"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* User's Submitted Tickets */}
      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-400" />
          <span>My Support Tickets &amp; Admin Responses ({userTickets.length})</span>
        </h2>

        <div className="space-y-3">
          {userTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{ticket.subject}</span>
                  <span className="text-slate-500 font-mono text-[10px]">
                    #{ticket.id}
                  </span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${
                    ticket.status === 'resolved'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  {ticket.status}
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                {ticket.message}
              </p>

              {ticket.reply && (
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 space-y-1">
                  <div className="font-semibold text-emerald-400 flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Official Moderator Response:</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">{ticket.reply}</p>
                </div>
              )}

              <div className="text-[11px] text-slate-500 font-mono">
                Submitted on {new Date(ticket.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
