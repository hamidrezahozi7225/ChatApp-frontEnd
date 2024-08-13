import { IMessage } from '@/components/interface/types';
import { getMessages } from '@/components/services/service';
import Socket from '@/components/utils/socket';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Message = () => {
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const [time, setTime] = React.useState<null | Date>(null);
  const chat = useSelector((state: any) => state.chatData.selectChat);

  const user = useSelector((state: any) => state.userData.currentUser);

  useEffect(() => {
    Socket.on('receiveMessage', (data: IMessage) => {
      setMessages((prev) => {
        const exist = prev.find(
          (item) => item.socketMessageID === data.socketMessageID
        );

        if (!exist) {
          return [...prev, data];
        } else {
          return prev;
        }
      });
      setTime(new Date());
    });
  }, []);

  useEffect(() => {
    const getMessage = async () => {
      const messageData = await getMessages(chat.id);

      setMessages(messageData);
      const boxes = document.getElementById('scrollableBox');
      if (boxes) {
        boxes.scrollTop = boxes.scrollHeight;
      }
    };
    getMessage();
  }, [chat.id]);

  useEffect(() => {
    const boxes = document.getElementById('scrollableBox');
    if (boxes) {
      boxes.scrollTop = boxes.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className='grow px-4 overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100'
      id='scrollableBox'
    >
      {messages
        .filter((item) => item.chatId === chat.id)
        .map((item: IMessage, index: number) => (
          <div
            className={`flex flex-col gap-2 my-2  ${
              item.sender === user.userId &&
              'flex-row-reverse rtl-grid text-right'
            } `}
            key={index}
          >
            {item.sender === user.userId ? (
              <>
                <div className='bg-blue-500 max-w-[60%] h-fit text-white font-bold w-fit px-4 py-3  rounded-lg rounded-tr-none'>
                  <p className={`text-sm break-all `}>{item.text}</p>
                  <div className='text-[10px] text-end mt-2'>
                    {item.createdAt
                      ? new Date(item.createdAt).toTimeString().slice(0, 5)
                      : time && time.toTimeString().slice(0, 5)}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='bg-[#dee5f1] max-w-[60%] h-fit  font-bold w-fit px-4 py-3  rounded-lg rounded-tl-none'>
                  <p className={`text-sm break-all `}>{item.text}</p>
                  <div className='text-[10px] text-end mt-2'>
                    {item.createdAt
                      ? new Date(item.createdAt).toTimeString().slice(0, 5)
                      : time && time.toTimeString().slice(0, 5)}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default Message;
