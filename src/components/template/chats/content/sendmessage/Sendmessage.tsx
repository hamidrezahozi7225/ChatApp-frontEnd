import { IMessage } from '@/components/interface/types';
import {
  PostMessage,
  sendIncreseMessage,
  setLastMessage,
} from '@/components/services/service';
import Socket from '@/components/utils/socket';
import { Button, Input } from 'antd';
import EmojiPicker from 'emoji-picker-react';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import emoji from '@/../public/reshot-icon-smile-emoji-X4SUBTMKRF.svg';
import { useMediaQuery } from 'react-responsive';

const Sendmessage = () => {
  const [text, setText] = useState<string>('');
  const [emojiPicker, setEmojiPicker] = useState<boolean>(false);
  const chatId = useSelector((state: any) => state.chatData.selectChat);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 830px)' });
  const userId = useSelector(
    (state: any) => state.userData.currentUser?.userId
  );
  useEffect(() => {
    setText('');
  }, [chatId]);

  const sendHandler = async () => {
    if (!!text.trim()) {
      const data: IMessage = {
        chatId: chatId.id,
        sender: userId,
        text,
        socketMessageID: Date.now(),
      };
      await PostMessage(data);
      Socket.emit('sendMessage', data);
      if (!!text.trim()) {
        await setLastMessage(chatId.id, text);
        Socket.emit('lastMessage', chatId, text);
      }
      setEmojiPicker(false);
      setText('');
      const res = await sendIncreseMessage(chatId.id, userId);
      console.log('ressss', res);

      Socket.emit('newMessage', res);
    }
  };

  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    Socket.emit('typing', chatId);

    setTimeout(() => {
      Socket.emit('stopTyping', chatId);
    }, 3000);
  };

  const emojiclick = (emoji: any) => {
    Socket.emit('typing', chatId);

    setTimeout(() => {
      Socket.emit('stopTyping', chatId);
    }, 3000);

    setText((prev) => prev + emoji.emoji);
  };

  return (
    <>
      <div className='h-20 gap-2 flex realtive items-center bg-gray-200 px-4'>
        <div className=''>
          <img
            onClick={() => setEmojiPicker(!emojiPicker)}
            width='20px'
            height='20px'
            src={emoji.src}
            alt='emoji'
          />
        </div>
        <Input
          value={text}
          onChange={changehandler}
          onPressEnter={sendHandler}
          className='h-8 p-5'
          placeholder='Type a message...'
        />
        <Button onClick={sendHandler} className='p-5' type='primary'>
          Send
        </Button>
      </div>
      {emojiPicker && (
        <div
          className={`${!isTabletOrMobile && 'absolute bottom-12 z-50 ml-4'} `}
        >
          <EmojiPicker
            onEmojiClick={emojiclick}
            height={isTabletOrMobile ? '350px' : '450px'}
            width={isTabletOrMobile ? '100%' : '350px'}
          />
        </div>
      )}
    </>
  );
};

export default memo(Sendmessage);
