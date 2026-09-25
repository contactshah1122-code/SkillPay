import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  SportEvent,
  SkillChallenge,
  Quiz,
  DailyChallengeItem,
  LeaderboardUser,
  PointTransaction,
  AppNotification,
  SupportTicket,
  Announcement,
  SportType
} from '../types';
import {
  INITIAL_USER,
  INITIAL_ADMIN,
  INITIAL_EVENTS,
  INITIAL_CHALLENGES,
  INITIAL_QUIZZES,
  INITIAL_DAILY_CHALLENGES,
  INITIAL_LEADERBOARD_DAILY,
  INITIAL_LEADERBOARD_WEEKLY,
  INITIAL_LEADERBOARD_MONTHLY,
  INITIAL_TRANSACTIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ANNOUNCEMENTS
} from '../data/initialData';

export type PageRoute =
  | 'home'
  | 'sports'
  | 'daily'
  | 'quiz'
  | 'leaderboard'
  | 'results'
  | 'profile'
  | 'history'
  | 'notifications'
  | 'about'
  | 'help'
  | 'privacy'
  | 'terms'
  | 'admin';

interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Navigation
  activePage: PageRoute;
  setActivePage: (page: PageRoute) => void;
  selectedSport: SportType | 'all';
  setSelectedSport: (sport: SportType | 'all') => void;

  // User & Auth
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  switchRole: (role: 'user' | 'admin') => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;

  // Data
  events: SportEvent[];
  challenges: SkillChallenge[];
  quizzes: Quiz[];
  dailyChallenges: DailyChallengeItem[];
  dailyLeaderboard: LeaderboardUser[];
  weeklyLeaderboard: LeaderboardUser[];
  monthlyLeaderboard: LeaderboardUser[];
  transactions: PointTransaction[];
  notifications: AppNotification[];
  announcements: Announcement[];
  supportTickets: SupportTicket[];

  // Actions
  enterChallenge: (challengeId: string, optionId: string) => { success: boolean; message: string };
  claimDailyChallenge: (challengeId: string) => void;
  claimDailyCheckin: () => void;
  recordQuizCompletion: (quizId: string, score: number, totalQuestions: number, pointsEarned: number) => void;
  createSupportTicket: (subject: string, category: SupportTicket['category'], message: string) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  triggerConfetti: () => void;
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;

  // Admin Actions
  adminCreateChallenge: (newChallenge: Omit<SkillChallenge, 'id' | 'totalParticipants'>) => void;
  adminCreateQuiz: (newQuiz: Omit<Quiz, 'id' | 'playsCount'>) => void;
  adminResolveChallenge: (challengeId: string, winningOptionId: string) => void;
  adminGrantPoints: (userId: string, points: number, reason: string) => void;
  adminCreateAnnouncement: (title: string, message: string, severity: Announcement['severity']) => void;
  adminReplyTicket: (ticketId: string, reply: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePage] = useState<PageRoute>('home');
  const [selectedSport, setSelectedSport] = useState<SportType | 'all'>('all');

  // Load saved state or default
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('skillplay_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [events, setEvents] = useState<SportEvent[]>(() => {
    const saved = localStorage.getItem('skillplay_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [challenges, setChallenges] = useState<SkillChallenge[]>(() => {
    const saved = localStorage.getItem('skillplay_challenges');
    return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
  });

  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const saved = localStorage.getItem('skillplay_quizzes');
    return saved ? JSON.parse(saved) : INITIAL_QUIZZES;
  });

  const [dailyChallenges, setDailyChallenges] = useState<DailyChallengeItem[]>(() => {
    const saved = localStorage.getItem('skillplay_daily');
    return saved ? JSON.parse(saved) : INITIAL_DAILY_CHALLENGES;
  });

  const [transactions, setTransactions] = useState<PointTransaction[]>(() => {
    const saved = localStorage.getItem('skillplay_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('skillplay_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('skillplay_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('skillplay_tickets');
    return saved ? JSON.parse(saved) : [
      {
        id: 'tkt_01',
        userId: 'usr_pak_01',
        userName: 'Hamza Khan',
        email: 'hamza.sports@skillplay.pk',
        subject: 'Inquiry regarding PSL Quiz scoring rules',
        category: 'rules',
        message: 'How is the tie-breaker calculated if two participants finish the daily leaderboard with identical point totals?',
        status: 'resolved',
        timestamp: '2026-09-24T12:00:00Z',
        reply: 'Tie-breakers are resolved first by fastest submission timestamp and then by higher cumulative accuracy percentage. Best of luck on the leaderboard!'
      }
    ];
  });

  const [dailyLeaderboard] = useState<LeaderboardUser[]>(INITIAL_LEADERBOARD_DAILY);
  const [weeklyLeaderboard] = useState<LeaderboardUser[]>(INITIAL_LEADERBOARD_WEEKLY);
  const [monthlyLeaderboard] = useState<LeaderboardUser[]>(INITIAL_LEADERBOARD_MONTHLY);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent storage sync
  useEffect(() => {
    localStorage.setItem('skillplay_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('skillplay_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('skillplay_challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('skillplay_quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem('skillplay_daily', JSON.stringify(dailyChallenges));
  }, [dailyChallenges]);

  useEffect(() => {
    localStorage.setItem('skillplay_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('skillplay_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('skillplay_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('skillplay_tickets', JSON.stringify(supportTickets));
  }, [supportTickets]);

  const showToast = (title: string, message?: string, type: ToastMessage['type'] = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#10b981', '#f59e0b', '#065f46', '#ffffff']
      });
    } catch {
      // safe fallback
    }
  };

  const switchRole = (role: 'user' | 'admin') => {
    if (role === 'admin') {
      setCurrentUser(INITIAL_ADMIN);
      showToast('Switched to Administrator Mode', 'Full control over challenges, quizzes, users & results.', 'info');
    } else {
      setCurrentUser(INITIAL_USER);
      showToast('Switched to Standard Competitor Mode', 'Participating with virtual points.', 'info');
    }
  };

  const loginUser = (email: string, name?: string) => {
    const isAdmin = email.toLowerCase().includes('admin');
    const newUser: UserProfile = isAdmin
      ? INITIAL_ADMIN
      : {
          ...INITIAL_USER,
          email,
          name: name || email.split('@')[0],
          username: (name || email.split('@')[0]).toLowerCase().replace(/[^a-z0-9]/g, '_')
        };
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${newUser.name}!`, 'Logged into SkillPlay PK non-monetary platform.', 'success');
  };

  const logoutUser = () => {
    setCurrentUser({
      ...INITIAL_USER,
      id: 'guest_' + Date.now(),
      name: 'Sports Fan',
      username: 'fan_guest',
      email: 'guest@skillplay.pk',
      points: 100,
      challengesCompleted: 0,
      quizzesCompleted: 0
    });
    showToast('Logged Out', 'You are now browsing as Guest with 100 starter points.', 'info');
  };

  const enterChallenge = (challengeId: string, optionId: string): { success: boolean; message: string } => {
    const ch = challenges.find(c => c.id === challengeId);
    if (!ch) return { success: false, message: 'Challenge not found.' };

    if (ch.status !== 'upcoming' && ch.status !== 'live') {
      return { success: false, message: 'This skill challenge is closed for predictions.' };
    }

    if (ch.userPrediction) {
      return { success: false, message: 'You have already submitted a prediction for this challenge.' };
    }

    if (currentUser.points < ch.entryPoints) {
      showToast('Insufficient Virtual Points', `You need ${ch.entryPoints} points to enter. Complete a quick sports quiz to earn more!`, 'error');
      return { success: false, message: 'Insufficient points.' };
    }

    // Deduct entry points
    setCurrentUser(prev => ({
      ...prev,
      points: prev.points - ch.entryPoints,
      challengesCompleted: prev.challengesCompleted + 1
    }));

    // Update challenge prediction & participant count
    setChallenges(prev =>
      prev.map(c =>
        c.id === challengeId
          ? {
              ...c,
              totalParticipants: c.totalParticipants + 1,
              userPrediction: optionId
            }
          : c
      )
    );

    // Add transaction
    const newTx: PointTransaction = {
      id: 'tx_' + Date.now(),
      userId: currentUser.id,
      title: `Skill Prediction: ${ch.title}`,
      category: 'prediction_entry',
      points: -ch.entryPoints,
      timestamp: new Date().toISOString(),
      referenceId: challengeId,
      notes: `Entered with option ID: ${optionId}. Non-monetary virtual points allocated.`
    };
    setTransactions(prev => [newTx, ...prev]);

    // Progress daily challenge if applicable
    setDailyChallenges(prev =>
      prev.map(dc => {
        if (dc.type === 'prediction' && dc.currentCount < dc.targetCount) {
          return { ...dc, currentCount: dc.currentCount + 1 };
        }
        return dc;
      })
    );

    showToast('Prediction Recorded!', `Allocated ${ch.entryPoints} virtual points. Outcome will be settled post-match.`, 'success');
    return { success: true, message: 'Prediction successfully submitted.' };
  };

  const claimDailyChallenge = (challengeId: string) => {
    const dc = dailyChallenges.find(d => d.id === challengeId);
    if (!dc || dc.isClaimed || dc.currentCount < dc.targetCount) return;

    setCurrentUser(prev => ({
      ...prev,
      points: prev.points + dc.rewardPoints
    }));

    setDailyChallenges(prev =>
      prev.map(d => (d.id === challengeId ? { ...d, isClaimed: true } : d))
    );

    const newTx: PointTransaction = {
      id: 'tx_' + Date.now(),
      userId: currentUser.id,
      title: `Claimed Daily Challenge: ${dc.title}`,
      category: 'daily_checkin',
      points: dc.rewardPoints,
      timestamp: new Date().toISOString(),
      referenceId: challengeId,
      notes: 'Completed daily goal criteria.'
    };
    setTransactions(prev => [newTx, ...prev]);

    triggerConfetti();
    showToast(`+${dc.rewardPoints} Points Claimed!`, dc.title, 'success');
  };

  const claimDailyCheckin = () => {
    const today = new Date().toISOString().split('T')[0];
    if (currentUser.lastCheckInDate === today) {
      showToast('Already Checked In Today', 'Come back tomorrow to continue your streak!', 'info');
      return;
    }

    const streakReward = 50 + (currentUser.streakDays + 1) * 10;
    setCurrentUser(prev => ({
      ...prev,
      points: prev.points + streakReward,
      streakDays: prev.streakDays + 1,
      lastCheckInDate: today
    }));

    const newTx: PointTransaction = {
      id: 'tx_' + Date.now(),
      userId: currentUser.id,
      title: `Daily Check-in Day ${currentUser.streakDays + 1}`,
      category: 'daily_checkin',
      points: streakReward,
      timestamp: new Date().toISOString(),
      notes: 'Daily consecutive visit loyalty bonus.'
    };
    setTransactions(prev => [newTx, ...prev]);

    triggerConfetti();
    showToast(`+${streakReward} Streak Bonus Claimed!`, `Day ${currentUser.streakDays + 1} streak active!`, 'success');
  };

  const recordQuizCompletion = (quizId: string, score: number, totalQuestions: number, pointsEarned: number) => {
    const accuracy = Math.round((score / totalQuestions) * 100);

    setCurrentUser(prev => ({
      ...prev,
      points: prev.points + pointsEarned,
      quizzesCompleted: prev.quizzesCompleted + 1,
      accuracyRate: Math.round((prev.accuracyRate + accuracy) / 2)
    }));

    setQuizzes(prev =>
      prev.map(q => (q.id === quizId ? { ...q, playsCount: q.playsCount + 1 } : q))
    );

    const quiz = quizzes.find(q => q.id === quizId);
    const newTx: PointTransaction = {
      id: 'tx_' + Date.now(),
      userId: currentUser.id,
      title: `Quiz Completion: ${quiz?.title || 'Sports Trivia'}`,
      category: 'quiz_reward',
      points: pointsEarned,
      timestamp: new Date().toISOString(),
      referenceId: quizId,
      notes: `Scored ${score}/${totalQuestions} (${accuracy}% precision).`
    };
    setTransactions(prev => [newTx, ...prev]);

    // Check daily challenge progress
    setDailyChallenges(prev =>
      prev.map(dc => {
        if (dc.type === 'quiz' && dc.currentCount < dc.targetCount) {
          return { ...dc, currentCount: dc.currentCount + 1 };
        }
        return dc;
      })
    );

    triggerConfetti();
    showToast(`Quiz Complete! +${pointsEarned} Points`, `Scored ${score}/${totalQuestions} questions correctly!`, 'success');
  };

  const createSupportTicket = (subject: string, category: SupportTicket['category'], message: string) => {
    const newTicket: SupportTicket = {
      id: 'tkt_' + Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      email: currentUser.email,
      subject,
      category,
      message,
      status: 'open',
      timestamp: new Date().toISOString()
    };
    setSupportTickets(prev => [newTicket, ...prev]);
    showToast('Support Ticket Submitted', 'Our Pakistani sports community team will respond shortly.', 'success');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('Notifications Cleared', 'All messages marked as read.', 'info');
  };

  // ADMIN ACTIONS
  const adminCreateChallenge = (newChallenge: Omit<SkillChallenge, 'id' | 'totalParticipants'>) => {
    const challenge: SkillChallenge = {
      ...newChallenge,
      id: 'ch_' + Date.now(),
      totalParticipants: 0
    };
    setChallenges(prev => [challenge, ...prev]);
    showToast('Challenge Created', `"${challenge.title}" published to participants.`, 'success');
  };

  const adminCreateQuiz = (newQuiz: Omit<Quiz, 'id' | 'playsCount'>) => {
    const quiz: Quiz = {
      ...newQuiz,
      id: 'qz_' + Date.now(),
      playsCount: 0
    };
    setQuizzes(prev => [quiz, ...prev]);
    showToast('Quiz Published', `"${quiz.title}" is now playable.`, 'success');
  };

  const adminResolveChallenge = (challengeId: string, winningOptionId: string) => {
    const ch = challenges.find(c => c.id === challengeId);
    if (!ch) return;

    setChallenges(prev =>
      prev.map(c =>
        c.id === challengeId
          ? {
              ...c,
              status: 'completed',
              correctOptionId: winningOptionId
            }
          : c
      )
    );

    // If current user had selected the winning option, award points
    if (ch.userPrediction === winningOptionId) {
      setCurrentUser(prev => ({
        ...prev,
        points: prev.points + ch.rewardPoints
      }));

      const newTx: PointTransaction = {
        id: 'tx_' + Date.now(),
        userId: currentUser.id,
        title: `Victory Settlement: ${ch.title}`,
        category: 'prediction_win',
        points: ch.rewardPoints,
        timestamp: new Date().toISOString(),
        referenceId: challengeId,
        notes: 'Admin officially verified outcome. Virtual points credited.'
      };
      setTransactions(prev => [newTx, ...prev]);

      const newNotif: AppNotification = {
        id: 'notif_' + Date.now(),
        userId: currentUser.id,
        title: 'Challenge Won!',
        message: `Your prediction on "${ch.title}" was verified accurate! +${ch.rewardPoints} points credited.`,
        type: 'reward',
        timestamp: new Date().toISOString(),
        isRead: false
      };
      setNotifications(prev => [newNotif, ...prev]);
      triggerConfetti();
    }

    showToast('Challenge Resolved', `Outcome published. Winning option: ${winningOptionId}. Points distributed to accurate participants.`, 'success');
  };

  const adminGrantPoints = (userId: string, points: number, reason: string) => {
    if (userId === currentUser.id) {
      setCurrentUser(prev => ({ ...prev, points: prev.points + points }));
    }
    const newTx: PointTransaction = {
      id: 'tx_' + Date.now(),
      userId,
      title: `Administrator Grant: ${reason}`,
      category: 'admin_grant',
      points,
      timestamp: new Date().toISOString(),
      notes: reason
    };
    setTransactions(prev => [newTx, ...prev]);
    showToast(`Granted ${points} Points`, `Granted to user ${userId} for: ${reason}`, 'success');
  };

  const adminCreateAnnouncement = (title: string, message: string, severity: Announcement['severity']) => {
    const newAnn: Announcement = {
      id: 'ann_' + Date.now(),
      title,
      message,
      severity,
      active: true,
      createdAt: new Date().toISOString()
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    showToast('Announcement Published', title, 'success');
  };

  const adminReplyTicket = (ticketId: string, reply: string) => {
    setSupportTickets(prev =>
      prev.map(t =>
        t.id === ticketId ? { ...t, status: 'resolved', reply } : t
      )
    );
    showToast('Ticket Resolved', 'Resolution sent to participant.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedSport,
        setSelectedSport,
        currentUser,
        setCurrentUser,
        switchRole,
        isAuthModalOpen,
        setIsAuthModalOpen,
        loginUser,
        logoutUser,
        events,
        challenges,
        quizzes,
        dailyChallenges,
        dailyLeaderboard,
        weeklyLeaderboard,
        monthlyLeaderboard,
        transactions,
        notifications,
        announcements,
        supportTickets,
        enterChallenge,
        claimDailyChallenge,
        claimDailyCheckin,
        recordQuizCompletion,
        createSupportTicket,
        markNotificationRead,
        clearAllNotifications,
        triggerConfetti,
        toasts,
        showToast,
        dismissToast,
        adminCreateChallenge,
        adminCreateQuiz,
        adminResolveChallenge,
        adminGrantPoints,
        adminCreateAnnouncement,
        adminReplyTicket
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
