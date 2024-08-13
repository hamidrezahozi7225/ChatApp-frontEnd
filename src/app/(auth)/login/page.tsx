'use client';

import { IInputAuth, ILogin } from '@/components/interface/types';
import Auth from '@/components/template/auth/Auth';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const userInput: IInputAuth[] = [
  { id: 1, name: 'email' },
  { id: 2, name: 'password' },
];

const Login = () => {
  const [userData, setUserData] = useState<ILogin>({
    email: '',
    password: '',
  });
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log('session', session);

    if (session && session.user && session.user.email) {
      router.push('/chat');
    }
  }, [status]);

  const loginHandler = async () => {
    const res = await signIn('credentials', {
      email: userData.email,
      password: userData.password,
      redirect: false,
    });
    if (res && res.status !== 200) {
      toast.error(res.error, {
        position: 'top-center',
      });
    } else {
      toast.success('Login success', {
        position: 'top-center',
      });
      router.push('/chat');
    }
  };

  return (
    <>
      <Auth
        userInput={userInput}
        title='Login Page'
        userData={userData}
        setUserData={setUserData}
        loginHandler={loginHandler}
        btnTitle='Login'
      />
      <ToastContainer autoClose={1500} />
    </>
  );
};

export default Login;
