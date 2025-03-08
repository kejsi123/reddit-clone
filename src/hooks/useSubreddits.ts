import { fetchData } from '@/lib/fetchData';
import { SubredditsType } from '@/types/subreddits';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useSubreddits = () => {
  const getSubreddits = async ({
    pageParam,
  }: {
    pageParam: number;
  }): Promise<{ data: SubredditsType[]; nextPage?: number }> => {
    const url = `${import.meta.env.VITE_API_URL}?page=${pageParam}&limit=10`;

    const data = await fetchData<SubredditsType[]>({ url });

    return {
      data,
      nextPage: data.length > 0 ? pageParam + 1 : undefined,
    };
  };

  return useInfiniteQuery({
    queryKey: ['subreddits'],
    queryFn: getSubreddits,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
  });
};
