'use client';
import { RootState } from '@/components/redux/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  Space,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import { uploadedImageToFireBase } from '@/components/module/imageUploadFIreBase';
import { updateUserImage } from '@/components/services/service';
import { setCurrentUser } from '@/components/redux/slice/userSlice';
import { signOut } from 'next-auth/react';
import Socket from '@/components/utils/socket';

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const [changeProfile, setChangeProfile] = React.useState(false);
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state: RootState) => state.userData.currentUser
  );

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (currentUser) {
      Socket.emit('joinRoom', currentUser?.userId);
    }
  }, [currentUser]);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type='button'
    >
      +
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const uploadHandler = async () => {
    if (fileList[0]?.originFileObj && currentUser && currentUser.email) {
      const getImageUrl = await uploadedImageToFireBase(
        fileList[0].originFileObj as File
      );
      const res = await updateUserImage(currentUser?.email, getImageUrl || '');
      if (res.status == 201) {
        dispatch(setCurrentUser({ ...currentUser, imageUrl: getImageUrl }));
      }
    }
  };

  const changeProfileHandler = () => {
    setChangeProfile(true);
    if (currentUser?.imageUrl) {
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: currentUser.imageUrl,
        },
      ]);
    } else {
      setFileList([]);
    }
  };

  return (
    <div className='flex border-b border-[#cbc5c5] items-center justify-between h-fit bg-slate-200 p-4 w-full'>
      <div>Chat App</div>
      <div className='cursor-pointer' onClick={() => setOpen(true)}>
        <Space direction='vertical' size={10}>
          <Space wrap size={10}>
            {currentUser && <div>{currentUser.userName}</div>}
            {currentUser?.imageUrl ? (
              <img
                alt='user pic'
                className='rounded-full w-10 h-10'
                src={currentUser?.imageUrl}
              />
            ) : (
              <Avatar size='large' icon={<UserOutlined />} />
            )}
          </Space>
        </Space>
      </div>
      <Drawer title='Basic Drawer' onClose={() => setOpen(false)} open={open}>
        {currentUser && currentUser.imageUrl && !changeProfile ? (
          <div className='flex justify-center flex-col items-center'>
            <img
              alt='user pic'
              className='rounded-full w-20 h-20'
              src={currentUser?.imageUrl}
            />
            <Button type='link' onClick={changeProfileHandler}>
              change profile picture
            </Button>
          </div>
        ) : (
          <Upload
            listType='picture-circle'
            fileList={fileList}
            onChange={handleChange}
            maxCount={1}
          >
            {uploadButton}
          </Upload>
        )}
        <Divider />
        <div>
          <h1 className='font-extrabold p-2'>
            <span className='font-medium'>User Name : </span>
            {currentUser?.userName}
          </h1>
          <h1 className='font-extrabold p-2'>
            <span className='font-medium'>Email : </span>
            {currentUser?.email}
          </h1>
        </div>
        <Divider />
        <Button
          className='w-full my-2 font-bold'
          type='dashed'
          onClick={uploadHandler}
        >
          update Image
        </Button>
        <Button
          className='w-full'
          type='primary'
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
          Sign Out
        </Button>
      </Drawer>
    </div>
  );
};

export default Header;
