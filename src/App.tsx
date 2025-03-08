import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { ThemeProvider } from './components/themeProvider';
import Layout from './pages/layout';

const HomePage = lazy(() =>
  import('./pages/home').then((module) => ({ default: module.HomePage }))
);

const SubredditsPage = lazy(() =>
  import('./pages/subreddits').then((module) => ({ default: module.SubredditsPage }))
);
const SingleSubredditPage = lazy(() =>
  import('./pages/singleSubreddit').then((module) => ({ default: module.SingleSubredditPage }))
);
const SinglePostPage = lazy(() =>
  import('./pages/singlePost').then((module) => ({ default: module.SinglePostPage }))
);
const ErrorPage = lazy(() =>
  import('./pages/error').then((module) => ({ default: module.ErrorPage }))
);

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback={<Loader2 className='mx-auto size-44 animate-spin' />}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: '/subreddits',
          element: (
            <Suspense fallback={<Loader2 className='mx-auto size-44 animate-spin' />}>
              <SubredditsPage />
            </Suspense>
          ),
        },
        {
          path: '/subreddits/:id',
          element: (
            <Suspense fallback={<Loader2 className='mx-auto size-44 animate-spin' />}>
              <SingleSubredditPage />,
            </Suspense>
          ),
        },
        {
          path: '/subreddits/:id/post/:postId',
          element: (
            <Suspense fallback={<Loader2 className='mx-auto size-44 animate-spin' />}>
              <SinglePostPage />,
            </Suspense>
          ),
        },
      ],
    },
    {
      path: '*',
      element: (
        <Suspense fallback={<Loader2 className='mx-auto size-44 animate-spin' />}>
          <ErrorPage />
        </Suspense>
      ),
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
