import { fetchData } from '@/lib/fetchData';
import { SubredditsType } from '@/types/subreddits';
import { useQuery } from '@tanstack/react-query';

export const useSingleSubreddit = (id: string | undefined) => {
  const getSubreddit = async (): Promise<SubredditsType> => {
    return await fetchData<SubredditsType>({
      url: `${import.meta.env.VITE_API_URL}/${id}`,
    });
  };

  return useQuery<SubredditsType, Error>({
    queryKey: ['subreddit', id],
    queryFn: getSubreddit,
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};
