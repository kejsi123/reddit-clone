import { Link } from 'react-router-dom';
import { ModeToggle } from '../modeToggle';
import SearchBar from './searchBar';

const Navbar = () => {
  return (
    <header className='bg-background sticky top-0 z-50 border-b border-gray-200'>
      <div className='flex h-16 items-center justify-between px-8'>
        <Link to='/' className='flex items-center gap-2 font-semibold'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-neutral-900 dark:text-gray-50'>
            r
          </div>
          <span className='hidden text-gray-800 md:inline-block dark:text-white'>Reddit Clone</span>
        </Link>
        <div className='ml-2 flex items-center gap-2'>
          <SearchBar />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
