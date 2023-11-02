export interface User {
  userID: number,
  credentials: string,
  nickname: string,
  roomID: string,
  sockets: string[]
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
}

export interface UserInfo {
  nickname: string;
  lobby: {
    roomID: string;
    credentials: string;
    userID: string;
    createdAt: string;
    expiredAt: string;
  };
}

export interface UserVote {
  [key: string]: string;
}