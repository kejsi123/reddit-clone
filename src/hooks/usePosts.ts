import { fetchData } from '@/lib/fetchData';
import { PostType } from '@/types/posts';
import { useInfiniteQuery } from '@tanstack/react-query';

export const usePosts = (
  subredditId: string,
  options?: { sortBy?: string; order?: string; [key: string]: unknown }
) => {
  const getPosts = async ({
    pageParam,
  }: {
    pageParam: number;
  }): Promise<{ data: PostType[]; nextPage?: number }> => {
    const url = `${import.meta.env.VITE_API_URL}/${subredditId}/posts?page=${pageParam}&limit=1`;

    const data = await fetchData<PostType[]>({ url, options });

    return {
      data,
      nextPage: data.length > 0 ? pageParam + 1 : undefined,
    };
  };

  return useInfiniteQuery({
    queryKey: ['subreddit-posts', subredditId, options],
    queryFn: getPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
  });
};
