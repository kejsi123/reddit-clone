import { SubredditsType } from '@/types/subreddits';
import { useInfiniteQuery } from '@tanstack/react-query';

const getSubreddits = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<{ data: SubredditsType[]; nextPage?: number }> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}?page=${pageParam}&limit=10`);

  if (!response.ok) {
    throw new Error('Could not get the data, try again later!');
  }

  const data: SubredditsType[] = await response.json();

  return {
    data,
    nextPage: data.length > 0 ? pageParam + 1 : undefined,
  };
};

export const useSubreddits = () => {
  return useInfiniteQuery({
    queryKey: ['subreddits'],
    queryFn: getSubreddits,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
  });
};
