import { IInputAuth, ILogin } from '@/components/interface/types';
import { Button, Input } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
interface IProps {
  userInput: IInputAuth[];
  title: string;
  userData: ILogin;
  setUserData: React.Dispatch<React.SetStateAction<ILogin>>;
  loginHandler: () => void;
  btnTitle: string;
}

const Auth = ({
  userInput,
  title,
  userData,
  setUserData,
  loginHandler,
  btnTitle,
}: IProps) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((userData: ILogin) => ({ ...userData, [name]: value }));
  };

  const isTabletOrMobiled = useMediaQuery({ query: '(max-width: 676px)' });
  console.log('isTabletOrMobiled', isTabletOrMobiled);

  return (
    <div className='flex justify-center items-center h-full w-full'>
      <div className='flex rounded-md p-3 h-3/4 justify-content-center shadow-2xl align-items-center flex-row  w-3/4'>
        <div
          className={`${
            isTabletOrMobiled ? 'w-full' : 'w-2/4'
          } flex flex-col gap-1`}
        >
          <h2 className='text-center h-fit font-bold'>{title}</h2>
          <div className='flex flex-col grow h-fit m-3'>
            {userInput.map((user: IInputAuth) => (
              <div className='my-4' key={user.id}>
                <label>{user.name} </label>
                <Input
                  name={user.name}
                  value={userData[user.name as keyof ILogin]}
                  onChange={changeHandler}
                  placeholder={`${user.name}...`}
                />
              </div>
            ))}
          </div>
          <div className='flex items-end mx-3 my-2'>
            <Button
              onClick={loginHandler}
              type='primary'
              style={{ width: '100%' }}
            >
              {btnTitle}
            </Button>
          </div>
          <div className='h-fit'>
            {btnTitle == 'Login' ? (
              <div className='font-light text-sm f px-3 py-1'>
                Don t have an account ?{' '}
                <Link
                  className='font-extrabold underline underline-offset-3'
                  href='/signup'
                >
                  sign up
                </Link>
              </div>
            ) : (
              <div className='font-light text-sm f px-3 py-1'>
                Already have an account ?{' '}
                <Link
                  className='font-extrabold underline underline-offset-3'
                  href='/login'
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
        {!isTabletOrMobiled && (
          <div className='w-2/4 bg-slate-300 flex justify-center items-center rounded-sm'>
            <Image src='/chat.png' alt='chat app' width={200} height={300} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
