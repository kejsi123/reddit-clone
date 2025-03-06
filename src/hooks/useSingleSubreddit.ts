import { SubredditsType } from '@/types/subreddits';
import { useQuery } from '@tanstack/react-query';

export const useSingleSubreddit = (id: string | undefined) => {
  const getSubreddit = async (): Promise<SubredditsType> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Could not get the data try again later!');
    }
    return await response.json();
  };

  return useQuery<SubredditsType, Error>({
    queryKey: ['subreddit', id],
    queryFn: getSubreddit,
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};
