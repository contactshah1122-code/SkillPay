import React from 'react';
import { Home, Trophy, Target, HelpCircle, User } from 'lucide-react';
import { useApp, PageRoute } from '../../context/AppContext';

export const MobileNav: React.FC = () => {
  const { activePage, setActivePage } = useApp();

  const navItems: { label: string; route: PageRoute; icon: React.ComponentType<{ className?: string }> }[] = [
    { label: 'Home', route: 'home', icon: Home },
    { label: 'Sports', route: 'sports', icon: Trophy },
    { label: 'Daily', route: 'daily', icon: Target },
    { label: 'Quiz', route: 'quiz', icon: HelpCircle },
    { label: 'Profile', route: 'profile', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/90 pb-safe">
      <div className="grid grid-cols-5 items-center h-14">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.route;
          return (
            <button
              key={item.route}
              onClick={() => setActivePage(item.route)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors relative ${
                isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className="text-[10px] font-medium tracking-tight mt-1">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
