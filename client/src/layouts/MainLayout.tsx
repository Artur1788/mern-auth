import { Outlet } from 'react-router';

import { Footer, Header } from '../components';

export const MainLayout = () => {
  return (
    <div className='flex flex-col h-full'>
      <Header />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
