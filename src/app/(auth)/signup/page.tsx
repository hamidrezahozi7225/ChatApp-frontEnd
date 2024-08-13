'use client';

import { IInputAuth, ILogin } from '@/components/interface/types';
import Auth from '@/components/template/auth/Auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const userInput: IInputAuth[] = [
  { id: 0, name: 'userName' },
  { id: 1, name: 'email' },
  { id: 2, name: 'password' },
];

const SignUp = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<ILogin>({
    email: '',
    password: '',
    userName: '',
  });

  const loginHandler = async () => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (data.status !== 201) {
      toast.error(data.message, {
        position: 'top-center',
      });
    } else {
      toast.success(data.message, {
        position: 'top-center',
      });
      router.push('/login');
    }
  };

  return (
    <>
      <Auth
        userInput={userInput}
        title='Sign Up Page'
        userData={userData}
        setUserData={setUserData}
        loginHandler={loginHandler}
        btnTitle='Sign Up'
      />
      <ToastContainer autoClose={1500} />
    </>
  );
};

export default SignUp;
