export type SportType = 'cricket' | 'football' | 'tennis' | 'basketball';

export type ChallengeStatus = 'upcoming' | 'live' | 'completed' | 'cancelled';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  points: number;
  rank: number;
  streakDays: number;
  lastCheckInDate?: string;
  favoriteTeam: string;
  favoriteSport: SportType;
  city: string;
  challengesCompleted: number;
  quizzesCompleted: number;
  accuracyRate: number; // percentage e.g. 78
  badges: string[];
  joinedDate: string;
}

export interface SportEvent {
  id: string;
  sport: SportType;
  title: string;
  series: string; // e.g. "PSL 2026", "Pakistan Super League", "FIFA Qualifiers"
  teamA: {
    name: string;
    shortName: string;
    flagOrLogo: string;
    score?: string;
  };
  teamB: {
    name: string;
    shortName: string;
    flagOrLogo: string;
    score?: string;
  };
  venue: string;
  startTime: string; // ISO date string
  status: ChallengeStatus;
  resultSummary?: string;
  highlights?: string[];
}

export interface SkillChallenge {
  id: string;
  eventId: string;
  sport: SportType;
  title: string;
  description: string;
  entryPoints: number; // Non-monetary virtual points to enter
  rewardPoints: number; // Non-monetary points rewarded for top skill
  totalParticipants: number;
  endTime: string;
  status: ChallengeStatus;
  question: string;
  options: {
    id: string;
    text: string;
    votesPercent: number;
  }[];
  correctOptionId?: string;
  userPrediction?: string; // optionId if entered
  isFeatured?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  sport: SportType;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rewardPoints: number; // e.g. 100 non-monetary virtual points
  timePerQuestionSeconds: number;
  questions: QuizQuestion[];
  playsCount: number;
  image?: string;
}

export interface DailyChallengeItem {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  rewardPoints: number;
  isClaimed: boolean;
  sport: SportType | 'all';
  type: 'quiz' | 'prediction' | 'streak' | 'accuracy';
}

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  username: string;
  avatar: string;
  points: number;
  challengesCompleted: number;
  winRate: number;
  badge: string;
  city: string;
  change: 'up' | 'down' | 'same';
}

export interface PointTransaction {
  id: string;
  userId: string;
  title: string;
  category: 'quiz_reward' | 'prediction_entry' | 'prediction_win' | 'daily_checkin' | 'achievement_bonus' | 'admin_grant';
  points: number; // positive or negative
  timestamp: string;
  referenceId?: string;
  notes: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'system' | 'reward' | 'challenge' | 'announcement';
  timestamp: string;
  isRead: boolean;
  linkAction?: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  email: string;
  subject: string;
  category: 'points' | 'quiz' | 'rules' | 'account' | 'fair_play' | 'bug_report';
  message: string;
  status: 'open' | 'in_progress' | 'resolved';
  timestamp: string;
  reply?: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'success' | 'warning';
  active: boolean;
  createdAt: string;
}
