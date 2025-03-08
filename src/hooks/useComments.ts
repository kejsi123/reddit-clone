import { fetchData } from '@/lib/fetchData';
import { CommentType } from '@/types/comments';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useComments = (
  subredditId: string | undefined,
  postId: string | undefined,
  options?: { sortBy?: string; [key: string]: unknown }
) => {
  const getComments = async ({ pageParam }: { pageParam: number }) => {
    const url = `${import.meta.env.VITE_API_URL}/${subredditId}/posts/${postId}/comments?page=${pageParam}&limit=5`;

    const data = await fetchData<CommentType[]>({ url, options });

    return {
      data,
      nextPage: data.length > 0 ? pageParam + 1 : undefined,
    };
  };

  return useInfiniteQuery({
    queryKey: ['post-comments', subredditId, postId, options],
    queryFn: getComments,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
    enabled: !!subredditId || !!postId,
  });
};
