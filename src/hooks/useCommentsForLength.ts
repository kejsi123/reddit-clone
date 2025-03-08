import { fetchData } from '@/lib/fetchData';
import { CommentType } from '@/types/comments';
import { useQuery } from '@tanstack/react-query';

export const useCommentsForLength = (subredditId: string, postId: string) => {
  const getComments = async (): Promise<number> => {
    const url = `${import.meta.env.VITE_API_URL}/${subredditId}/posts/${postId}/comments`;

    const data = await fetchData<CommentType[]>({ url });

    return data.length;
  };

  return useQuery({
    queryFn: getComments,
    queryKey: ['post-comment-length', `${subredditId}-${postId}`],
    staleTime: 1000 * 60 * 5,
  });
};
