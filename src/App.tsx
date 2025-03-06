import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/themeProvider';
import Layout from './pages/layout';
import SubredditsPage from './pages/subreddits';
import SingleSubredditPage from './pages/singleSubreddit';
import HomePage from './pages/home';

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
      ],
    },
  ]);

  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(apiUrl);

  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
