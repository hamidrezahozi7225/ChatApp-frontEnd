import { Button, Dropdown, MenuProps, Modal } from 'antd';
import React, { useState } from 'react';
import { addChat, getAllUsers } from '../services/service';
import { IUser } from '../interface/types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const items: MenuProps['items'] = [
  {
    label: 'new chat',
    key: '1',
  },
  {
    label: 'new group',
    key: '2',
  },
];

const SideBarModal = () => {
  const [showChatModal, setChatModal] = React.useState<boolean>(false);
  const [users, setUsers] = useState<[]>([]);
  const currentUser = useSelector(
    (state: RootState) => state.userData.currentUser
  );
  const handleOk = () => {
    setChatModal(false);
  };

  const handleMenuClick: MenuProps['onClick'] = async (e) => {
    if (e.key == '1') {
      setChatModal(true);
      const res = await getAllUsers();
      const data = res.filter(
        (item: IUser) => item.email != currentUser?.email
      );
      setUsers(data);
    }
  };

  const addUserToChat = async (item: string) => {
    if (currentUser?.userId) {
      const res = await addChat(currentUser?.userId, item);
      setChatModal(false);
    }
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <div className='h-fit'>
        <Dropdown.Button menu={menuProps}>New</Dropdown.Button>
      </div>

      <Modal
        title='Add Member To Chat'
        open={showChatModal}
        onOk={handleOk}
        okText='Add'
        centered
        onCancel={() => setChatModal(false)}
      >
        <div className='min-h-[200px] mt-8'>
          {users.map((item: IUser) => (
            <div
              key={item._id}
              className=' flex p-2 rounded-md bg-gray-300  font-bold mx-2 justify-between items-center my-2'
            >
              <div className='flex items-center'>
                <div className='ml-2'>{item?.userName}</div>
              </div>
              <div className='flex items-center'>
                <Button type='dashed' onClick={() => addUserToChat(item._id)}>
                  Add To Chat
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default SideBarModal;
