import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/themeProvider';
import Layout from './pages/layout';
import SubredditsPage from './pages/subreddits';
import SingleSubredditPage from './pages/singleSubreddit';
import HomePage from './pages/home';
import SinglePostPage from './pages/singlePost';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/subreddits',
          element: <SubredditsPage />,
        },
        {
          path: '/subreddits/:id',
          element: <SingleSubredditPage />,
        },
        {
          path: '/subreddits/:id/post/:postId',
          element: <SinglePostPage />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <div className='bg-gray-50 dark:bg-neutral-900'>
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
