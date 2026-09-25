import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed, hide
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`flex items-center gap-1.5 font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/30 rounded-lg transition-all active:scale-95 ${
          compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs'
        }`}
        title="Install SkillPlay PK on your home screen"
      >
        <Download className="w-3.5 h-3.5 text-emerald-400" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`flex items-center gap-1.5 font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 rounded-lg transition-all active:scale-95 ${
            compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>iOS App</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                    🇵🇰
                  </div>
                  <h3 className="text-base font-semibold text-white">Install SkillPlay PK</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Add to your iPhone or iPad home screen for instant full-screen skill competitions:
              </p>

              <ol className="space-y-2.5 text-xs text-slate-300 mb-5">
                <li className="flex items-start gap-2 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/50">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-400 text-[11px] font-bold flex items-center justify-center">1</span>
                  <span>Tap the <strong>Share</strong> button in the Safari bottom toolbar.</span>
                </li>
                <li className="flex items-start gap-2 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/50">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-400 text-[11px] font-bold flex items-center justify-center">2</span>
                  <span>Scroll down and tap <strong>Add to Home Screen</strong>.</span>
                </li>
                <li className="flex items-start gap-2 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/50">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-400 text-[11px] font-bold flex items-center justify-center">3</span>
                  <span>Tap <strong>Add</strong> in the top-right corner.</span>
                </li>
              </ol>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback demo install button for desktop/mobile browsers that supports prompt
  return (
    <button
      onClick={() => {
        alert('SkillPlay PK is PWA-ready! To install on desktop, click the install icon in your browser address bar.');
      }}
      className={`hidden md:flex items-center gap-1.5 font-medium text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-all ${
        compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs'
      }`}
    >
      <Download className="w-3.5 h-3.5" />
      <span>Install PWA</span>
    </button>
  );
};
