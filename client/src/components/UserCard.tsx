import { FC } from 'react';

interface UserCardProps {
  email: string;
  name: string;
}
export const UserCard: FC<UserCardProps> = ({ email, name }) => {
  return (
    <div className='flex flex-col gap-x-2 bg-slate-600 p-4 rounded-lg'>
      <p className='text-lg text-neutral-300 break-words'>Email: {email}</p>
      <p className='text-lg text-neutral-300 break-words'>Name: {name}</p>
    </div>
  );
};
