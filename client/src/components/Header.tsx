import { NavLink } from 'react-router';
import { useAuthStore } from '../store';

export const Header = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className='flex justify-between sm:justify-center items-center px-2 sm:px-6 py-1 sm:py-4 text-white'>
      <nav className='sm:mx-auto'>
        <ul className='flex gap-x-2 sm:gap-x-5'>
          <li className='rounded-lg font-semibold text-lg'>
            <NavLink
              to='/'
              className='px-4 py-2'
            >
              Home
            </NavLink>
          </li>
          <li className='font-semibold text-lg'>
            <NavLink
              to='/about'
              className='px-4 py-2'
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
      <button
        className='bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-lg text-white self-end'
        onClick={logout}
      >
        Log out
      </button>
    </header>
  );
};
