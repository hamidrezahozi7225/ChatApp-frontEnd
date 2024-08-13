'use server';

import { IMessage } from '../interface/types';
import ChatModel from '../model/ChatModel';
import MessageModel from '../model/MessageModel';
import { UserModel } from '../model/UserModel';
import connectDB from '../utils/connectDB';

export async function getUserData(email: string) {
  try {
    await connectDB();
    const userData = await UserModel.findOne({ email: email });
    return JSON.parse(JSON.stringify(userData));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: 'An unknown error occurred',
      };
    }
  }
}

export async function updateUserImage(email: string, imageUrl: string) {
  try {
    await connectDB();
    const userData = await UserModel.findOne({ email: email });
    userData.imageUrl = imageUrl;
    await userData.save();
    return { status: 201, message: 'update image success' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: 'An unknown error occurred',
      };
    }
  }
}

export async function getAllUsers() {
  try {
    await connectDB();
    const users = await UserModel.find({});
    return JSON.parse(JSON.stringify(users));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: 'An unknown error occurred',
      };
    }
  }
}

export async function addChat(currentUserId: string, otherUserId: string) {
  try {
    await connectDB();
    const chat = await ChatModel.create({
      users: [currentUserId, otherUserId],
      createdBy: currentUserId,
      lastMessage: null,
    });
    return JSON.parse(JSON.stringify(chat));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: 'An unknown error occurred',
      };
    }
  }
}

export async function ChatUsers(currentUserId: string) {
  try {
    await connectDB();
    const chat = await ChatModel.find({
      users: { $in: [currentUserId] },
    })
      .populate('users')
      .sort({ updatedAt: -1 });
    return JSON.parse(JSON.stringify(chat));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: 'An unknown error occurred',
      };
    }
  }
}

export async function PostMessage(data: IMessage) {
  try {
    await connectDB();
    const message = await MessageModel.create(data);
    return JSON.parse(JSON.stringify(message));
  } catch (error) {
    console.log('error', error);
  }
}

export async function getMessages(chatId: string) {
  try {
    await connectDB();
    const messages = await MessageModel.find({ chatId: chatId });
    return JSON.parse(JSON.stringify(messages));
  } catch (error) {
    console.log(error);
  }
}

export async function setLastMessage(chatId: string, message: string) {
  try {
    await connectDB();
    console.log('messageee', chatId, message);

    const chat = await ChatModel.findOne({ _id: chatId });
    chat.lastMessage = message;
    await chat.save();
    console.log('chhhh', chat);

    return JSON.parse(JSON.stringify(chat));
  } catch (error) {
    console.log(error);
  }
}

export async function sendIncreseMessage(chatId: string, senderId: string) {
  try {
    await connectDB();
    const chat = await ChatModel.findOne({ _id: chatId });
    const user = chat.users.find(
      (user: any) => user._id.toString() !== senderId
    );

    const exist = chat.readed.findIndex(
      (read: any) => read.userId == user.toString()
    );
    let newChat = [];
    if (exist === -1) {
      chat.readed.push({ userId: user._id, count: 1 });
    } else {
      chat.readed[exist].count = chat.readed[exist].count + 1;
    }
    newChat.push(...chat.readed);

    console.log('ccc', newChat);

    chat.readed = [];
    chat.readed = newChat.filter((itm: any) => !!itm.userId);

    await chat.save();

    return JSON.parse(JSON.stringify(chat));
  } catch (error) {
    console.log(error);
  }
}

export async function readChatMessage(chatId: string, userId: string) {
  try {
    await connectDB();
    const chat = await ChatModel.findOne({ _id: chatId });

    let newChat = [];
    chat.readed.filter((itm: any) => {
      if (itm.userId == userId) {
        itm.count = 0;
      }
      return itm;
    });
    newChat.push(...chat.readed);
    chat.readed = [];

    chat.readed = newChat;
    await chat.save();

    return JSON.parse(JSON.stringify(chat));
  } catch (error) {
    console.log(error);
  }
}
