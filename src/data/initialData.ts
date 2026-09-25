import {
  UserProfile,
  SportEvent,
  SkillChallenge,
  Quiz,
  DailyChallengeItem,
  LeaderboardUser,
  PointTransaction,
  AppNotification,
  Announcement
} from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_pak_01',
  name: 'Hamza Khan',
  username: 'hamzakhan_pk',
  email: 'hamza.sports@skillplay.pk',
  avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=HamzaPK',
  role: 'user',
  points: 1850,
  rank: 14,
  streakDays: 5,
  lastCheckInDate: new Date().toISOString().split('T')[0],
  favoriteTeam: 'Lahore Qalandars',
  favoriteSport: 'cricket',
  city: 'Lahore',
  challengesCompleted: 38,
  quizzesCompleted: 24,
  accuracyRate: 82,
  badges: ['Master Strategist', 'PSL Guru', '5-Day Streak', 'Cricket Tactician', 'Speed Demon'],
  joinedDate: 'January 2026',
};

export const INITIAL_ADMIN: UserProfile = {
  id: 'admin_01',
  name: 'Official Admin (SkillPlay)',
  username: 'skillplay_admin',
  email: 'admin@skillplay.pk',
  avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=SkillPlayAdmin',
  role: 'admin',
  points: 15000,
  rank: 1,
  streakDays: 45,
  favoriteTeam: 'Pakistan National Team',
  favoriteSport: 'cricket',
  city: 'Islamabad',
  challengesCompleted: 150,
  quizzesCompleted: 120,
  accuracyRate: 94,
  badges: ['Chief Arbiter', 'Master Scorer', 'Founding Member'],
  joinedDate: 'November 2025',
};

export const INITIAL_EVENTS: SportEvent[] = [
  {
    id: 'evt_cricket_01',
    sport: 'cricket',
    title: 'Lahore Qalandars vs Karachi Kings',
    series: 'Pakistan Super League (PSL) 2026',
    teamA: {
      name: 'Lahore Qalandars',
      shortName: 'LQ',
      flagOrLogo: '🟢',
      score: '184/5 (20.0 ov)',
    },
    teamB: {
      name: 'Karachi Kings',
      shortName: 'KK',
      flagOrLogo: '🔵',
      score: '172/8 (20.0 ov)',
    },
    venue: 'Gaddafi Stadium, Lahore',
    startTime: '2026-09-25T19:00:00Z',
    status: 'completed',
    resultSummary: 'Lahore Qalandars won by 12 runs in a high-octane thriller.',
    highlights: [
      'Shaheen Afridi took 3 wickets in the powerplay',
      'Babar Azam scored a fighting 68 off 44 balls',
      'Haris Rauf bowled a masterclass 19th over conceding only 4 runs'
    ]
  },
  {
    id: 'evt_cricket_02',
    sport: 'cricket',
    title: 'Pakistan vs Australia - 2nd ODI',
    series: 'Bicentennial Cup Super Series',
    teamA: {
      name: 'Pakistan',
      shortName: 'PAK',
      flagOrLogo: '🇵🇰',
      score: '142/2 (24.1 ov)',
    },
    teamB: {
      name: 'Australia',
      shortName: 'AUS',
      flagOrLogo: '🇦🇺',
      score: '286/7 (50.0 ov)',
    },
    venue: 'Rawalpindi Cricket Stadium, Rawalpindi',
    startTime: '2026-09-26T14:30:00Z',
    status: 'live',
    resultSummary: 'Pakistan chasing 287. Target requires 145 runs with 8 wickets in hand.',
    highlights: [
      'Naseem Shah claimed 4/48 with fiery reverse swing',
      'Mohammad Rizwan unbeaten on 52*'
    ]
  },
  {
    id: 'evt_cricket_03',
    sport: 'cricket',
    title: 'Peshawar Zalmi vs Islamabad United',
    series: 'Pakistan Super League (PSL) 2026',
    teamA: {
      name: 'Peshawar Zalmi',
      shortName: 'PZ',
      flagOrLogo: '🟡',
    },
    teamB: {
      name: 'Islamabad United',
      shortName: 'IU',
      flagOrLogo: '🔴',
    },
    venue: 'National Bank Stadium, Karachi',
    startTime: '2026-09-27T19:00:00Z',
    status: 'upcoming',
    resultSummary: 'Upcoming marquee clash: Zalmi batting depth faces United aggressive red-hot bowling unit.',
  },
  {
    id: 'evt_football_01',
    sport: 'football',
    title: 'Pakistan vs Jordan - AFC Asian Cup Qualifier',
    series: 'AFC Asian Cup Group Qualifiers',
    teamA: {
      name: 'Pakistan National Team',
      shortName: 'PAK',
      flagOrLogo: '🇵🇰',
    },
    teamB: {
      name: 'Jordan',
      shortName: 'JOR',
      flagOrLogo: '🇯🇴',
    },
    venue: 'Jinnah Sports Stadium, Islamabad',
    startTime: '2026-09-28T16:00:00Z',
    status: 'upcoming',
    resultSummary: 'Key qualifying showdown on home turf in front of a packed capital crowd.',
  },
  {
    id: 'evt_football_02',
    sport: 'football',
    title: 'KRL FC vs WAPDA FC',
    series: 'Pakistan Premier Football League',
    teamA: {
      name: 'Khan Research Laboratories (KRL)',
      shortName: 'KRL',
      flagOrLogo: '🛡️',
      score: '2',
    },
    teamB: {
      name: 'WAPDA Football Club',
      shortName: 'WAP',
      flagOrLogo: '⚡',
      score: '1',
    },
    venue: 'KRL Ground, Rawalpindi',
    startTime: '2026-09-24T15:00:00Z',
    status: 'completed',
    resultSummary: 'KRL secured late 89th-minute winner through Alamgir Ghazi.',
    highlights: ['First half penalty saved by WAPDA keeper', 'Spectacular 30-yard freekick goal']
  },
  {
    id: 'evt_tennis_01',
    sport: 'tennis',
    title: 'Pakistan vs India - Davis Cup World Group Play-off',
    series: 'Davis Cup World Group II',
    teamA: {
      name: 'Pakistan (Aisam-ul-Haq / Muzammil Murtaza)',
      shortName: 'PAK',
      flagOrLogo: '🇵🇰',
      score: '6-4, 7-6',
    },
    teamB: {
      name: 'India (Bopanna / Balaji)',
      shortName: 'IND',
      flagOrLogo: '🇮🇳',
      score: '4-6, 6-7',
    },
    venue: 'Pakistan Sports Complex Grass Courts, Islamabad',
    startTime: '2026-09-24T11:00:00Z',
    status: 'completed',
    resultSummary: 'Pakistan doubles duo clinched dramatic straight-sets grass triumph.',
  },
  {
    id: 'evt_tennis_02',
    sport: 'tennis',
    title: 'Aisam-ul-Haq / Partner vs Top Seed Duo',
    series: 'Islamabad International ATP Challenger',
    teamA: {
      name: 'Aisam-ul-Haq Qureshi & Team',
      shortName: 'PAK/ENG',
      flagOrLogo: '🎾',
    },
    teamB: {
      name: 'Challenger Seeds',
      shortName: 'EUR',
      flagOrLogo: '🏆',
    },
    venue: 'Islamabad Club Tennis Complex',
    startTime: '2026-09-29T10:00:00Z',
    status: 'upcoming',
    resultSummary: 'Doubles quarter-final skill challenge.',
  },
  {
    id: 'evt_basketball_01',
    sport: 'basketball',
    title: 'Army Basketball vs PAF Airmen',
    series: 'National Men Basketball Championship 2026',
    teamA: {
      name: 'Pakistan Army',
      shortName: 'ARMY',
      flagOrLogo: '🎖️',
      score: '78',
    },
    teamB: {
      name: 'Pakistan Air Force',
      shortName: 'PAF',
      flagOrLogo: '✈️',
      score: '72',
    },
    venue: 'Liaquat Gymnasium, Islamabad',
    startTime: '2026-09-24T18:00:00Z',
    status: 'completed',
    resultSummary: 'Army secured thrilling defensive victory with 14 fast-break steals.',
  },
  {
    id: 'evt_basketball_02',
    sport: 'basketball',
    title: 'Lahore Hawks vs Karachi Titans',
    series: 'All-Pakistan Super Basketball League',
    teamA: {
      name: 'Lahore Hawks',
      shortName: 'LHR',
      flagOrLogo: '🦅',
    },
    teamB: {
      name: 'Karachi Titans',
      shortName: 'KHI',
      flagOrLogo: '🔱',
    },
    venue: 'Nishtar Park Sports Complex, Lahore',
    startTime: '2026-09-30T17:30:00Z',
    status: 'upcoming',
    resultSummary: 'Inter-city rivalry showdown with top perimeter sharpshooters.',
  }
];

export const INITIAL_CHALLENGES: SkillChallenge[] = [
  {
    id: 'ch_01',
    eventId: 'evt_cricket_02',
    sport: 'cricket',
    title: 'Australia Chase Master: Pakistan Batting Skill',
    description: 'Analyze pitch conditions in Rawalpindi and predict the highest individual run-scorer for Pakistan in the 2nd ODI chase.',
    entryPoints: 50,
    rewardPoints: 250,
    totalParticipants: 428,
    endTime: '2026-09-26T17:00:00Z',
    status: 'live',
    isFeatured: true,
    question: 'Who will finish as Pakistan\'s highest individual run scorer in this innings?',
    options: [
      { id: 'opt_1', text: 'Babar Azam (Target: 70+ Runs)', votesPercent: 44 },
      { id: 'opt_2', text: 'Mohammad Rizwan (Current 52*)', votesPercent: 32 },
      { id: 'opt_3', text: 'Saim Ayub (Fast Starter)', votesPercent: 14 },
      { id: 'opt_4', text: 'Lower Order / Other Batters', votesPercent: 10 },
    ],
    userPrediction: 'opt_1'
  },
  {
    id: 'ch_02',
    eventId: 'evt_cricket_03',
    sport: 'cricket',
    title: 'Peshawar vs Islamabad: Powerplay Boundary Metric',
    description: 'Use team tactical stats to forecast the total number of boundaries (4s & 6s) hit during both powerplays combined at National Bank Stadium.',
    entryPoints: 30,
    rewardPoints: 180,
    totalParticipants: 312,
    endTime: '2026-09-27T19:30:00Z',
    status: 'upcoming',
    isFeatured: false,
    question: 'Forecast total combined boundaries in overs 1-6 for both teams:',
    options: [
      { id: 'opt_21', text: 'Under 14 Boundaries', votesPercent: 22 },
      { id: 'opt_22', text: '14 to 18 Boundaries', votesPercent: 51 },
      { id: 'opt_23', text: '19 to 23 Boundaries', votesPercent: 20 },
      { id: 'opt_24', text: '24+ Boundaries (Record Pace)', votesPercent: 7 },
    ]
  },
  {
    id: 'ch_03',
    eventId: 'evt_football_01',
    sport: 'football',
    title: 'Asian Qualifier: Defensive Resilience Challenge',
    description: 'Forecast whether the Pakistan National Football Team will keep a clean sheet in the first 45 minutes against Jordan.',
    entryPoints: 40,
    rewardPoints: 200,
    totalParticipants: 275,
    endTime: '2026-09-28T16:00:00Z',
    status: 'upcoming',
    isFeatured: true,
    question: 'Will Pakistan concede zero goals in the 1st Half at Jinnah Stadium?',
    options: [
      { id: 'opt_31', text: 'Yes - Clean Sheet in 1st Half', votesPercent: 48 },
      { id: 'opt_32', text: 'No - 1 Goal Conceded', votesPercent: 36 },
      { id: 'opt_33', text: 'No - 2 or More Goals Conceded', votesPercent: 16 },
    ]
  },
  {
    id: 'ch_04',
    eventId: 'evt_tennis_02',
    sport: 'tennis',
    title: 'Islamabad ATP Challenger: First Set Ace Count',
    description: 'Calculate service accuracy on grass courts and predict the total aces hit in the opening set.',
    entryPoints: 25,
    rewardPoints: 125,
    totalParticipants: 189,
    endTime: '2026-09-29T10:00:00Z',
    status: 'upcoming',
    question: 'Estimated total aces in Set 1 on Islamabad Club Grass Courts:',
    options: [
      { id: 'opt_41', text: '0 to 4 Aces', votesPercent: 28 },
      { id: 'opt_42', text: '5 to 8 Aces', votesPercent: 54 },
      { id: 'opt_43', text: '9+ Aces', votesPercent: 18 },
    ]
  },
  {
    id: 'ch_05',
    eventId: 'evt_cricket_01',
    sport: 'cricket',
    title: 'Qalandars vs Kings: Death Overs Economy Challenge',
    description: 'Skill challenge completed. Users forecasted Haris Rauf and Shaheen Afridi death bowling economy.',
    entryPoints: 30,
    rewardPoints: 180,
    totalParticipants: 512,
    endTime: '2026-09-25T21:00:00Z',
    status: 'completed',
    question: 'Which team bowling unit will hold an economy below 8.00 in death overs (16-20)?',
    options: [
      { id: 'opt_51', text: 'Lahore Qalandars (Accurate)', votesPercent: 62 },
      { id: 'opt_52', text: 'Karachi Kings', votesPercent: 28 },
      { id: 'opt_53', text: 'Neither (Both conceded 8+ rpo)', votesPercent: 10 },
    ],
    correctOptionId: 'opt_51'
  },
  {
    id: 'ch_06',
    eventId: 'evt_basketball_02',
    sport: 'basketball',
    title: 'Super Basketball League: 3-Point Accuracy Challenge',
    description: 'Estimate shooting team efficiency in the high-stakes clash at Nishtar Park.',
    entryPoints: 35,
    rewardPoints: 175,
    totalParticipants: 160,
    endTime: '2026-09-30T17:30:00Z',
    status: 'upcoming',
    question: 'Which team will make more 3-pointers during regulation play?',
    options: [
      { id: 'opt_61', text: 'Lahore Hawks', votesPercent: 46 },
      { id: 'opt_62', text: 'Karachi Titans', votesPercent: 42 },
      { id: 'opt_63', text: 'Tied 3-Pointers Made', votesPercent: 12 },
    ]
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'qz_cricket_master',
    sport: 'cricket',
    title: 'Pakistani Cricket Legends & Records Trivia',
    difficulty: 'Medium',
    rewardPoints: 150,
    timePerQuestionSeconds: 20,
    playsCount: 1420,
    image: '/src/assets/images/hero_cricket_stadium_1790335329094.jpg',
    questions: [
      {
        id: 'q1',
        question: 'Who captained the Pakistan Cricket Team to victory in the 1992 Cricket World Cup final in Melbourne?',
        options: ['Javed Miandad', 'Imran Khan', 'Wasim Akram', 'Inzamam-ul-Haq'],
        correctAnswerIndex: 1,
        explanation: 'Imran Khan captained Pakistan to their historic 1992 Cricket World Cup triumph at the MCG, defeating England by 22 runs.'
      },
      {
        id: 'q2',
        question: 'Against which opponent did Pakistan win the ICC Champions Trophy final in 2017 by 180 runs?',
        options: ['Australia', 'England', 'India', 'South Africa'],
        correctAnswerIndex: 2,
        explanation: 'Under Sarfaraz Ahmed\'s captaincy, Pakistan defeated India by 180 runs at The Oval, with Fakhar Zaman scoring a century and Mohammad Amir taking crucial top-order wickets.'
      },
      {
        id: 'q3',
        question: 'Who holds the record for the fastest delivery ever officially recorded in international cricket (161.3 km/h)?',
        options: ['Brett Lee', 'Shoaib Akhtar', 'Shaheen Afridi', 'Waqar Younis'],
        correctAnswerIndex: 1,
        explanation: 'The "Rawalpindi Express" Shoaib Akhtar bowled the fastest officially recorded ball at 161.3 km/h (100.2 mph) against England in the 2003 World Cup.'
      },
      {
        id: 'q4',
        question: 'Which franchise has won back-to-back Pakistan Super League (PSL) titles in PSL 7 and PSL 8?',
        options: ['Islamabad United', 'Peshawar Zalmi', 'Lahore Qalandars', 'Multan Sultans'],
        correctAnswerIndex: 2,
        explanation: 'Lahore Qalandars under Shaheen Shah Afridi\'s leadership won consecutive titles in PSL 7 (2022) and PSL 8 (2023).'
      },
      {
        id: 'q5',
        question: 'Who was the player of the tournament in the 2009 ICC World Twenty20 won by Pakistan in England?',
        options: ['Umar Gul', 'Shahid Afridi', 'Tillakaratne Dilshan', 'Younis Khan'],
        correctAnswerIndex: 2,
        explanation: 'Tillakaratne Dilshan was the tournament\'s player of the series, although Shahid Afridi produced match-winning fifties in both the semi-final and the final for Pakistan.'
      }
    ]
  },
  {
    id: 'qz_football_skill',
    sport: 'football',
    title: 'Football History & Pakistan National Team Quiz',
    difficulty: 'Easy',
    rewardPoints: 100,
    timePerQuestionSeconds: 15,
    playsCount: 980,
    image: '/src/assets/images/football_action_shot_1790335343156.jpg',
    questions: [
      {
        id: 'fq1',
        question: 'Which Pakistani city is internationally famous for manufacturing hand-stitched FIFA World Cup footballs?',
        options: ['Faisalabad', 'Sialkot', 'Gujranwala', 'Karachi'],
        correctAnswerIndex: 1,
        explanation: 'Sialkot is the global capital of quality football production, providing official match balls used in FIFA World Cup tournaments.'
      },
      {
        id: 'fq2',
        question: 'Who is the all-time leading star striker and former national captain known as "The Express" in Pakistani football?',
        options: ['Kaleemullah Khan', 'Esa Khan', 'Harun Hamid', 'Hassan Bashir'],
        correctAnswerIndex: 0,
        explanation: 'Kaleemullah Khan is one of Pakistan\'s most prolific footballers, who won international league titles in Kyrgyzstan and played in US soccer.'
      },
      {
        id: 'fq3',
        question: 'In October 2023, against which country did Pakistan win their historic first-ever FIFA World Cup qualifying match at Jinnah Stadium?',
        options: ['Cambodia', 'Yemen', 'Tajikistan', 'Nepal'],
        correctAnswerIndex: 0,
        explanation: 'Pakistan achieved a landmark 1-0 victory against Cambodia in Islamabad with a goal by Harun Hamid to advance to Round 2 of World Cup Qualifiers.'
      },
      {
        id: 'fq4',
        question: 'How many players are on the field for one standard association football team?',
        options: ['9 players', '10 players', '11 players', '12 players'],
        correctAnswerIndex: 2,
        explanation: 'Standard association football matches feature 11 active players per side, including one goalkeeper.'
      }
    ]
  },
  {
    id: 'qz_tennis_grandslam',
    sport: 'tennis',
    title: 'Davis Cup & Grand Slam Tennis Mastery',
    difficulty: 'Hard',
    rewardPoints: 200,
    timePerQuestionSeconds: 25,
    playsCount: 650,
    image: '/src/assets/images/tennis_court_championship_1790335355368.jpg',
    questions: [
      {
        id: 'tq1',
        question: 'Pakistani doubles icon Aisam-ul-Haq Qureshi reached the US Open finals in Men\'s Doubles and Mixed Doubles in which year?',
        options: ['2006', '2010', '2014', '2018'],
        correctAnswerIndex: 1,
        explanation: 'In 2010, Aisam-ul-Haq Qureshi reached both the Men\'s Doubles (with Rohan Bopanna) and Mixed Doubles (with Kveta Peschke) finals at Flushing Meadows.'
      },
      {
        id: 'tq2',
        question: 'Which Grand Slam tennis championship is played on natural grass courts?',
        options: ['Australian Open', 'Roland Garros', 'Wimbledon', 'US Open'],
        correctAnswerIndex: 2,
        explanation: 'Wimbledon at The All England Lawn Tennis Club in London is the only Grand Slam played on traditional grass.'
      },
      {
        id: 'tq3',
        question: 'What is the score called in tennis when both players are tied at 40-40 in a game?',
        options: ['Deuce', 'Advantage', 'Love-All', 'Tiebreak'],
        correctAnswerIndex: 0,
        explanation: 'A tie at 40-40 is called Deuce. A player must win two consecutive points from deuce to claim the game.'
      }
    ]
  },
  {
    id: 'qz_basketball_arena',
    sport: 'basketball',
    title: 'Basketball Rules, Tactics & National Championship',
    difficulty: 'Medium',
    rewardPoints: 120,
    timePerQuestionSeconds: 20,
    playsCount: 520,
    questions: [
      {
        id: 'bq1',
        question: 'How many seconds does an offensive team have to attempt a field goal that hits the rim in standard FIBA basketball rules?',
        options: ['14 seconds', '24 seconds', '30 seconds', '35 seconds'],
        correctAnswerIndex: 1,
        explanation: 'The shot clock in FIBA and Olympic basketball is set to 24 seconds for each offensive possession.'
      },
      {
        id: 'bq2',
        question: 'How many points is a successful free throw worth in basketball?',
        options: ['1 point', '2 points', '3 points', '4 points'],
        correctAnswerIndex: 0,
        explanation: 'Each awarded and made free throw is worth exactly 1 point.'
      },
      {
        id: 'bq3',
        question: 'Which team traditionally dominates the National Men\'s Basketball Championship in Pakistan?',
        options: ['Pakistan Army', 'Karachi University', 'Peshawar Hawks', 'Lahore Club'],
        correctAnswerIndex: 0,
        explanation: 'Pakistan Army basketball squad has historically won multiple National Championships with unmatched physical endurance.'
      }
    ]
  }
];

export const INITIAL_DAILY_CHALLENGES: DailyChallengeItem[] = [
  {
    id: 'dc_1',
    title: 'Daily Cricket Brain Challenge',
    description: 'Score 100% on any cricket skill quiz today',
    targetCount: 1,
    currentCount: 1,
    rewardPoints: 100,
    isClaimed: false,
    sport: 'cricket',
    type: 'quiz'
  },
  {
    id: 'dc_2',
    title: 'Active Predictor',
    description: 'Submit your tactical predictions for 2 upcoming matches',
    targetCount: 2,
    currentCount: 1,
    rewardPoints: 75,
    isClaimed: false,
    sport: 'all',
    type: 'prediction'
  },
  {
    id: 'dc_3',
    title: 'Consecutive Day Loyalty',
    description: 'Check in on SkillPlay PK for 5 consecutive days',
    targetCount: 5,
    currentCount: 5,
    rewardPoints: 150,
    isClaimed: true,
    sport: 'all',
    type: 'streak'
  },
  {
    id: 'dc_4',
    title: 'Tactical Precision',
    description: 'Achieve at least 80% accuracy across 10 skill questions',
    targetCount: 10,
    currentCount: 8,
    rewardPoints: 120,
    isClaimed: false,
    sport: 'all',
    type: 'accuracy'
  }
];

export const INITIAL_LEADERBOARD_DAILY: LeaderboardUser[] = [
  { rank: 1, id: 'u_01', name: 'Zohaib Butt', username: 'zohaib_tactics', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Zohaib', points: 420, challengesCompleted: 4, winRate: 92, badge: 'Daily Champ', city: 'Gujranwala', change: 'up' },
  { rank: 2, id: 'u_02', name: 'Ayesha Siddiqui', username: 'ayesha_cricket', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Ayesha', points: 380, challengesCompleted: 4, winRate: 88, badge: 'Tactical Mind', city: 'Karachi', change: 'up' },
  { rank: 3, id: 'u_03', name: 'Bilal Farooq', username: 'bilalfarooq99', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Bilal', points: 340, challengesCompleted: 3, winRate: 85, badge: 'Sharp Shooter', city: 'Islamabad', change: 'down' },
  { rank: 4, id: 'u_04', name: 'Danyal Malik', username: 'danyal_m', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Danyal', points: 310, challengesCompleted: 3, winRate: 80, badge: 'Rising Star', city: 'Multan', change: 'same' },
  { rank: 5, id: 'usr_pak_01', name: 'Hamza Khan (You)', username: 'hamzakhan_pk', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=HamzaPK', points: 290, challengesCompleted: 2, winRate: 82, badge: 'Master Strategist', city: 'Lahore', change: 'up' },
  { rank: 6, id: 'u_06', name: 'Usman Tariq', username: 'usman_spin', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Usman', points: 260, challengesCompleted: 2, winRate: 75, badge: 'Spin Analyst', city: 'Faisalabad', change: 'down' },
  { rank: 7, id: 'u_07', name: 'Fatima Noor', username: 'fatima_n', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Fatima', points: 240, challengesCompleted: 2, winRate: 78, badge: 'Sports Scholar', city: 'Peshawar', change: 'same' },
];

export const INITIAL_LEADERBOARD_WEEKLY: LeaderboardUser[] = [
  { rank: 1, id: 'u_02', name: 'Ayesha Siddiqui', username: 'ayesha_cricket', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Ayesha', points: 2150, challengesCompleted: 22, winRate: 89, badge: 'Weekly Grandmaster', city: 'Karachi', change: 'up' },
  { rank: 2, id: 'u_08', name: 'Kamran Akmal Jr', username: 'kami_expert', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Kamran', points: 1980, challengesCompleted: 20, winRate: 86, badge: 'Wicket Analyst', city: 'Lahore', change: 'same' },
  { rank: 3, id: 'u_01', name: 'Zohaib Butt', username: 'zohaib_tactics', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Zohaib', points: 1910, challengesCompleted: 19, winRate: 84, badge: 'Daily Champ', city: 'Gujranwala', change: 'down' },
  { rank: 4, id: 'u_09', name: 'Saad Rafique', username: 'saad_striker', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Saad', points: 1870, challengesCompleted: 18, winRate: 82, badge: 'Goal Predictor', city: 'Rawalpindi', change: 'up' },
  { rank: 5, id: 'usr_pak_01', name: 'Hamza Khan (You)', username: 'hamzakhan_pk', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=HamzaPK', points: 1850, challengesCompleted: 17, winRate: 82, badge: 'Master Strategist', city: 'Lahore', change: 'up' },
  { rank: 6, id: 'u_03', name: 'Bilal Farooq', username: 'bilalfarooq99', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Bilal', points: 1720, challengesCompleted: 16, winRate: 79, badge: 'Sharp Shooter', city: 'Islamabad', change: 'down' },
  { rank: 7, id: 'u_10', name: 'Zainab Qazi', username: 'zainab_q', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Zainab', points: 1650, challengesCompleted: 15, winRate: 77, badge: 'Court General', city: 'Quetta', change: 'same' },
];

export const INITIAL_LEADERBOARD_MONTHLY: LeaderboardUser[] = [
  { rank: 1, id: 'u_08', name: 'Kamran Akmal Jr', username: 'kami_expert', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Kamran', points: 8400, challengesCompleted: 85, winRate: 91, badge: 'Pakistan Champion', city: 'Lahore', change: 'up' },
  { rank: 2, id: 'u_02', name: 'Ayesha Siddiqui', username: 'ayesha_cricket', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Ayesha', points: 8120, challengesCompleted: 82, winRate: 88, badge: 'Weekly Grandmaster', city: 'Karachi', change: 'down' },
  { rank: 3, id: 'u_11', name: 'Dr. Shahzad Lodhi', username: 'dr_lodhi_sports', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Shahzad', points: 7650, challengesCompleted: 78, winRate: 85, badge: 'Veteran Pundit', city: 'Sialkot', change: 'up' },
  { rank: 4, id: 'u_01', name: 'Zohaib Butt', username: 'zohaib_tactics', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Zohaib', points: 7200, challengesCompleted: 74, winRate: 83, badge: 'Daily Champ', city: 'Gujranwala', change: 'same' },
  { rank: 5, id: 'usr_pak_01', name: 'Hamza Khan (You)', username: 'hamzakhan_pk', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=HamzaPK', points: 6890, challengesCompleted: 68, winRate: 82, badge: 'Master Strategist', city: 'Lahore', change: 'up' },
  { rank: 6, id: 'u_09', name: 'Saad Rafique', username: 'saad_striker', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Saad', points: 6420, challengesCompleted: 64, winRate: 80, badge: 'Goal Predictor', city: 'Rawalpindi', change: 'down' },
  { rank: 7, id: 'u_12', name: 'Noman Bashir', username: 'noman_tennis', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Noman', points: 6100, challengesCompleted: 60, winRate: 78, badge: 'Grass Expert', city: 'Abbottabad', change: 'same' },
];

export const INITIAL_TRANSACTIONS: PointTransaction[] = [
  {
    id: 'tx_01',
    userId: 'usr_pak_01',
    title: 'Daily Streak Bonus (Day 5)',
    category: 'daily_checkin',
    points: 150,
    timestamp: '2026-09-25T08:30:00Z',
    notes: 'Awarded for reaching 5 consecutive days of skill activity.'
  },
  {
    id: 'tx_02',
    userId: 'usr_pak_01',
    title: 'Entry: PSL Chase Master Challenge',
    category: 'prediction_entry',
    points: -50,
    timestamp: '2026-09-25T11:15:00Z',
    referenceId: 'ch_01',
    notes: 'Non-monetary virtual points allocated for 2nd ODI prediction.'
  },
  {
    id: 'tx_03',
    userId: 'usr_pak_01',
    title: 'Victory: Qalandars vs Kings Death Overs Challenge',
    category: 'prediction_win',
    points: 180,
    timestamp: '2026-09-24T22:00:00Z',
    referenceId: 'ch_05',
    notes: 'Accurate forecast of death overs economy at Gaddafi Stadium.'
  },
  {
    id: 'tx_04',
    userId: 'usr_pak_01',
    title: 'Quiz Completion: Cricket Legends Trivia',
    category: 'quiz_reward',
    points: 150,
    timestamp: '2026-09-24T18:40:00Z',
    referenceId: 'qz_cricket_master',
    notes: 'Scored 5/5 with 100% precision in under 60 seconds.'
  },
  {
    id: 'tx_05',
    userId: 'usr_pak_01',
    title: 'Welcome Skill Grant',
    category: 'achievement_bonus',
    points: 500,
    timestamp: '2026-09-01T10:00:00Z',
    notes: 'New account initial skill-token bonus.'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_01',
    userId: 'usr_pak_01',
    title: '5-Day Streak Achieved!',
    message: 'Congratulations! You claimed +150 virtual skill points. Keep playing daily to unlock the 7-Day Master Badge.',
    type: 'reward',
    timestamp: '2026-09-25T08:30:00Z',
    isRead: false
  },
  {
    id: 'notif_02',
    userId: 'usr_pak_01',
    title: 'Match Live: Pakistan vs Australia 2nd ODI',
    message: 'The chase has begun in Rawalpindi. Track your highest run-scorer skill challenge live!',
    type: 'challenge',
    timestamp: '2026-09-25T14:30:00Z',
    isRead: false,
    linkAction: '/sports'
  },
  {
    id: 'notif_03',
    userId: 'usr_pak_01',
    title: 'Challenge Won: Death Overs Economy',
    message: 'Your prediction on Lahore Qalandars death bowling was accurate! +180 points added to your balance.',
    type: 'reward',
    timestamp: '2026-09-24T22:00:00Z',
    isRead: true
  },
  {
    id: 'notif_04',
    userId: 'usr_pak_01',
    title: 'Strict Non-Monetary Fair Play Reminder',
    message: 'SkillPlay PK points are 100% skill-based entertainment units with zero monetary value. Enjoy competitive sports knowledge!',
    type: 'announcement',
    timestamp: '2026-09-20T12:00:00Z',
    isRead: true
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann_01',
    title: 'Pakistan Super League 2026 Skill Season Open!',
    message: 'Participate in daily tactical challenges and test your cricket intellect. Virtual skill points only — 100% fair play, zero gambling.',
    severity: 'info',
    active: true,
    createdAt: '2026-09-24T00:00:00Z',
  }
];
