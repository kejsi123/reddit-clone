import Navbar from '@/components/layout/navbar';
import SubredditSidebar from '@/components/layout/subredditSidebar';
import TopCommunities from '@/components/layout/topCommunities';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Navbar />
      <main className='container mx-auto grid grid-cols-1 gap-6 px-4 py-6 md:grid-cols-3 lg:grid-cols-4'>
        <div className='col-span-1 space-y-6 md:col-span-2 lg:col-span-3'>
          <Outlet />
        </div>
        <div className='sticky top-8 space-y-6'>
          <SubredditSidebar />
          <TopCommunities />
        </div>
      </main>
    </div>
  );
};

export default Layout;
