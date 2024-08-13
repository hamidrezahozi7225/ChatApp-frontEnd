'use client';

import Content from '@/components/template/chats/content/Content';
import Header from '@/components/template/chats/header/Header';
import SideBar from '@/components/template/chats/sidebar/SideBar';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/components/redux/slice/userSlice';
import { getUserData } from '@/components/services/service';

import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/navigation';

const Chat = () => {
  const { data: session, status } = useSession();
  const [mobile, setMobile] = React.useState<boolean>(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  let isTabletOrMobiled = true;
  isTabletOrMobiled = useMediaQuery({ query: '(max-width: 830px)' });
  useEffect(() => {
    setIsTabletOrMobile(isTabletOrMobiled);
  }, [isTabletOrMobiled]);

  useEffect(() => {
    setMobile(false);
  }, []);

  useEffect(() => {
    const setCurrentUsers = async () => {
      if (session && session.user && session.user.email) {
        const userdata = await getUserData(session.user.email.toString());
        if (userdata) {
          dispatch(
            setCurrentUser({
              userName: userdata.userName,
              email: session.user.email,
              imageUrl: userdata.imageUrl || '',
              userId: userdata._id,
            } as any)
          );
        } else {
          dispatch(
            setCurrentUser({
              userName: '',
              userId: userdata._id,
              email: session.user.email,
              imageUrl: userdata.imageUrl || '',
            } as any)
          );
        }
      } else {
        if (status === 'unauthenticated') {
          router.push('/login');
        }
      }
    };
    setCurrentUsers();
  }, [status]);

  useEffect(() => {
    if (!isTabletOrMobile) {
      setMobile(false);
    }
  }, [isTabletOrMobile]);

  return (
    <>
      <Header />
      <div
        style={{ height: 'calc(100vh - 73px)' }}
        className='flex justify-center  w-full'
      >
        {!mobile && (
          <div
            className={`${
              isTabletOrMobile ? 'w-full' : 'w-3/12 border-slate-300 border-r-2'
            }  py-3 px-4   `}
          >
            <SideBar setMobile={setMobile} />
          </div>
        )}
        {(!isTabletOrMobile || mobile) && (
          <div className='grow '>
            <Content setMobile={setMobile} />
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;
