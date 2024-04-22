export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type InputUsers = {
  name: string;
  lastName: string;
  birthday: Date;
  phone: string;
  email: string;
  password: string;
  profileUrl: string;
};

export type InputUpdateUsers = {
  name: string;
  lastName: string;
  birthday: Date;
  phone: string;
  email: string;
  profileUrl: string;
};

export type InputUpdateUsersWithId = {
  id: number;
  name?: string;
  lastName?: string;
  birthday?: Date;
  phone?: string;
  email?: string;
  profileUrl?: string;
};

export type Users = {
  id: number;
  name: string;
  lastName: string;
  birthday: Date;
  phone: string;
  email: string;
  password: string;
  profileUrl: string;
};

export type InputSession = {
  email: string;
  password: string;
};

export type SessionResponse = {
  id: number;
  userId: number;
  token: string;
};

export type InputPosts = {
  userId: number;
  description: string;
};

export type InputComment = {
  userId: number;
  postId: number;
  comment: string;
};

export type InputFollow = {
  followerId: number;
};

export type InputPasswordChange = {
  actualPassword: string;
  newPassword: string;
};
