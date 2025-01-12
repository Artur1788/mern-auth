import { LoaderIcon } from 'lucide-react';

export const Loader = () => {
  return (
    <div className='flex justify-center items-center h-full'>
      <LoaderIcon className='w-10 h-10 text-blue-500 animate-spin' />
    </div>
  );
};
