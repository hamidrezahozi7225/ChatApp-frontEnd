'use client';

import { IChat, IUser } from '@/components/interface/types';
import SideBarModal from '@/components/module/sideBarModal';
import { RootState } from '@/components/redux/store';
import {
  ChatUsers,
  readChatMessage,
  sendIncreseMessage,
} from '@/components/services/service';
import { Avatar, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectChat } from '@/components/redux/slice/chatSlice';
import Socket from '@/components/utils/socket';
import { useMediaQuery } from 'react-responsive';

interface ILastMessage {
  chatId: string;
  message: string;
  createdAt: Date | null;
}
interface ICount {
  userId?: number;
}

const SideBar = ({
  setMobile,
}: {
  setMobile: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [online, setOnline] = useState<string[]>([]);
  const [lastMessage, setLastMessage] = useState<ILastMessage>({
    chatId: '',
    message: '',
    createdAt: null,
  });

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 830px)' });
  const currentUser = useSelector(
    (state: RootState) => state.userData.currentUser
  );
  const selectChat = useSelector(
    (state: RootState) => state.chatData.selectChat
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let selected = '';
    Socket.emit('chatChange', selectChat.id);
    Socket.on('selectChat', (chatselect: string) => {
      selected = chatselect;
    });
    Socket.on('readMessage', async (chat: any) => {
      console.log('chatasdsed', chat, selected);
      if (chat._id == selected) {
        await readChatMessage(chat._id, currentUser?.userId!);
        await ChatUsers(currentUser?.userId!).then((res) => {
          setChats(res);
        });
      } else {
        if (currentUser?.userId) {
          await ChatUsers(currentUser.userId).then((res) => {
            setChats(res);
          });
        }
      }
    });
  }, [selectChat, currentUser]);

  useEffect(() => {
    const getChatUsers = async () => {
      const users: IUser[] = [];
      const res = await ChatUsers(currentUser?.userId!);

      if (!!res.length && res.length > 0) {
        res?.map((item: any) => {
          const indexUser = item.users.findIndex(
            (itm: any) => itm._id != currentUser?.userId!
          );
          users.push(item.users[indexUser]);
        });
        setChats(res);
      }
    };
    getChatUsers();

    if (currentUser?.userId) {
      Socket.emit('online', currentUser?.userId);
      Socket.on('onlineUser', (onlineUsers: any) => {
        setOnline(onlineUsers.map((itm: any) => itm.user));
      });
    }
  }, [currentUser?.userId]);

  const clickChatHandler = async (chatId: string, users: IUser[]) => {
    const user = users.filter(
      (user: IUser) => user._id !== currentUser?.userId
    )[0];

    const index = chats.findIndex((chat: IChat) => chat._id === chatId);
    if (index !== -1) {
      const readed = chats[index].readed.findIndex(
        (read: any) => read.userId === currentUser?.userId
      );
      if (readed !== -1) {
        chats[index].readed[readed].count = 0;
      }
      setChats(chats);
    }

    dispatch(
      setSelectChat({
        id: chatId,
        image: user.imageUrl,
        userName: user.userName,
      })
    );

    await readChatMessage(chatId, currentUser?.userId!);
    if (isTabletOrMobile) {
      setMobile(true);
    }
  };

  useEffect(() => {
    Socket.on('setLastMessage', (chatid: string, text: string) => {
      setLastMessage({ chatId: chatid, message: text, createdAt: new Date() });
    });
  }, []);

  return (
    <>
      <div className='flex justify-between items-center h-fit'>
        <h3 className='uppercase font-bold self-center text-base'>my chat</h3>
        <SideBarModal />
      </div>
      <div className='my-4'>
        <Input className='p-3 bg-slate-200' placeholder='Search ...' />
      </div>
      <div>
        {chats.map((chat: IChat) => (
          <div
            onClick={() => clickChatHandler(chat._id, chat.users)}
            key={chat._id}
            className='w-full gap-2 cursor-pointer items-center justify-between  flex mb-2 bg-gray-200 rounded-md p-3  hover:bg-gray-300'
          >
            {chat.users
              .filter((user: IUser) => user._id !== currentUser?.userId)
              .map((user: IUser) => (
                <div
                  className='flex justify-between items-center gap-2 w-full'
                  key={user._id}
                >
                  <div className='flex items-center gap-2 w-full'>
                    {user.imageUrl ? (
                      <div className='relative'>
                        <img
                          src={user.imageUrl}
                          className='w-10 h-10 rounded-full'
                          alt={user.userName}
                        />
                        <div className='absolute bottom-[0.1px] right-[2px]'>
                          <div className='flex items-center gap-2 flex-col'>
                            {/* {online.includes(user._id) && ( */}
                            <span className='relative flex h-[0.6rem] w-[0.6rem]'>
                              {online.includes(user._id) && (
                                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                              )}
                              <span
                                className={`relative inline-flex rounded-full h-[0.6rem] w-[0.6rem] ${
                                  online.includes(user._id)
                                    ? 'bg-green-500'
                                    : 'bg-[#adb4c3]'
                                }`}
                              ></span>
                            </span>
                            {/* )} */}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className='relative'>
                        <Avatar
                          className='bg-cyan-500 w-10 h-10 '
                          size='small'
                          icon={<UserOutlined />}
                        />
                        <div className='absolute bottom-[0.1px] right-[2px]'>
                          <div className='flex items-center gap-2 flex-col'>
                            {/* {online.includes(user._id) && ( */}
                            <span className='relative flex h-[0.6rem] w-[0.6rem]'>
                              {online.includes(user._id) && (
                                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                              )}
                              <span
                                className={`relative inline-flex rounded-full h-[0.6rem] w-[0.6rem] ${
                                  online.includes(user._id)
                                    ? 'bg-green-500'
                                    : 'bg-[#adb4c3]'
                                }`}
                              ></span>
                            </span>
                            {/* )} */}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className='text-xs flex flex-col flex-grow overflow-hidden'>
                      <div className='flex justify-between items-center'>
                        <span className='font-bold'>{user.userName}</span>
                        <span className='text-xs text-gray-500 flex gap-2 items-center'>
                          {chat.readed &&
                            chat.readed.length > 0 &&
                            chat.readed
                              .filter(
                                (item) =>
                                  item.userId === currentUser?.userId &&
                                  item.count > 0
                              )
                              .map((itm) => (
                                <div className='bg-green-500 text-white rounded-full w-fit h-fit py-1 px-2'>
                                  {itm.count}
                                </div>
                              ))}
                          {lastMessage.createdAt &&
                          lastMessage.chatId &&
                          chat._id === lastMessage.chatId
                            ? lastMessage.createdAt.toTimeString().slice(0, 5)
                            : new Date(user.createdAt)
                                .toTimeString()
                                .slice(0, 5)}
                        </span>
                      </div>
                      {lastMessage.chatId && chat._id === lastMessage.chatId ? (
                        <div className='text-xs text-gray-500 overflow-hidden h-4 w-36'>
                          {lastMessage.message}
                        </div>
                      ) : (
                        <div className='text-xs text-gray-500 overflow-hidden h-4 w-full'>
                          {chat.lastMessage}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default SideBar;
