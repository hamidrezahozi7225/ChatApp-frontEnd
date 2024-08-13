interface ILogin {
  email: string;
  password: string;
  userName?: string;
}
interface IInputAuth {
  id: number;
  name: string;
  userName?: string;
}

interface IUser {
  createdAt: Date;
  email: string;
  imageUrl: string;
  password: string;
  userName: string;
  _id: string;
}

interface IRead {
  userId: string;
  count: number;
}
interface IChat {
  _id: string;
  createdBy: string;
  lastMessage: null | string;
  createdAt: Date;
  users: IUser[];
  readed: IRead[];
}

interface IMessage {
  chatId: string;
  sender: string;
  text: string;
  socketMessageID: Date | number;
  createdAt?: Date;
}

export type { ILogin, IInputAuth, IUser, IChat, IMessage };
