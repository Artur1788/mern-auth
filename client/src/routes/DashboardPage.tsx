import { useState } from 'react';

import { toast } from 'react-toastify';

import { api } from '../axios';
import { useAuthStore } from '../store';
import { UserData } from '../store/auth/types';
import { AxiosError } from 'axios';
import { UserCard } from '../components';

export const DashboardPage = () => {
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const user = useAuthStore((state) => state.user);

  const getAllUsers = async () => {
    try {
      const users = (await api.get<UserData[]>('get-users')).data;
      setUsersData(users);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  return (
    <div className='flex flex-col gap-y-6 mx-auto p-5 max-w-3xl text-white'>
      <h3 className='text-lg'>Welcome: &nbsp; {user?.name}</h3>
      <p className='text-lg'>Your email is {user?.email}</p>
      <button
        onClick={getAllUsers}
        className='bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded max-w-max font-bold text-white'
      >
        Get Users
      </button>

      {!!usersData.length && (
        <div className='gap-4 grid grid-cols-[repeat(auto-fit,minmax(240px,_1fr))]'>
          {usersData.map((user) => (
            <UserCard
              key={user._id}
              email={user.email}
              name={user.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};
