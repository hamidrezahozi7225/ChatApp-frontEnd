import React from 'react';
import HeaderMessage from './header/HeaderMessage';
import Message from './message/Message';
import Sendmessage from './sendmessage/Sendmessage';
import { useSelector } from 'react-redux';
import lottiejson from '../../../module/lottie/myLottie.json';
import Lottie from 'react-lottie-player';

const Content = ({
  setMobile,
}: {
  setMobile: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const chat = useSelector((state: any) => state.chatData.selectChat);

  return (
    <div className='flex flex-col h-full '>
      {chat.id == '' ? (
        <div className='flex justify-center items-center h-full'>
          <Lottie
            loop
            animationData={lottiejson}
            play
            style={{ width: 400, height: 400 }}
          />
        </div>
      ) : (
        <>
          {' '}
          <HeaderMessage setMobile={setMobile} />
          <Message />
          <Sendmessage />
        </>
      )}
    </div>
  );
};

export default Content;
