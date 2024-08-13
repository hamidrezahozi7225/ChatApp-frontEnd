import { Avatar, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import Socket from '@/components/utils/socket';
import { useMediaQuery } from 'react-responsive';
import arrowBack from '@/../public/back-arrow-svgrepo-com.svg';

const HeaderMessage = ({
  setMobile,
}: {
  setMobile: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const chat = useSelector((state: any) => state.chatData.selectChat);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 830px)' });
  const [typing, setTyping] = useState({ chatId: '' });

  useEffect(() => {
    Socket.on('userTyping', (chat: any) => {
      setTyping({ chatId: chat?.id! });
    });
    Socket.on('stopTypingUser', (chat: any) => {
      setTyping({ chatId: '' });
    });
  }, []);

  return (
    <div className='h-14 flex gap-2 items-center px-4 py-2 bg-gray-200'>
      {isTabletOrMobile && (
        <Button
          className='bg-inherit border-none btn-hover '
          onClick={() => setMobile(false)}
        >
          <img src={arrowBack.src} alt='arrowBack' width='20px' height='20px' />
        </Button>
      )}
      {!!!chat?.image ? (
        <Avatar size='large' className='w-8 h-8' icon={<UserOutlined />} />
      ) : (
        <img src={chat?.image} alt='user' className='rounded-full w-8 h-8' />
      )}

      <div className='font-bold text-base'>{chat?.userName}</div>
      {typing.chatId === chat?.id && (
        <span className='animate-bounce w-full h-6 text-green-400'>
          typing ...
        </span>
      )}
    </div>
  );
};

export default HeaderMessage;
