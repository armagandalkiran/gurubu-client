export interface Votes {
  [key: string]: string;
}
export interface User {
  userID: number;
  credentials: string;
  nickname: string;
  roomID: string;
  sockets: string[];
  votes: Votes;
  isAdmin: boolean;
}

export interface Metric {
  id: number;
  name: string;
  points: string[];
}

export interface Participants {
  [key: string]: User;
}

export interface GroomingInfo {
  totalParticipants: number;
  mode: string;
  participants: Participants;
  metrics: Metric[];
  score: number;
  status: string;
  isAdmin: boolean;
  isResultShown: boolean;
}

export interface UserInfo {
  nickname: string;
  lobby: {
    roomID: string;
    credentials: string;
    userID: string;
    createdAt: string;
    expiredAt: string;
    isAdmin: boolean;
  };
}

export interface UserVote {
  [key: string]: string;
}
