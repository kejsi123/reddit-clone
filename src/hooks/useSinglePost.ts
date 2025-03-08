import { fetchData } from '@/lib/fetchData';
import { PostType } from '@/types/posts';
import { useQuery } from '@tanstack/react-query';

export const useSinglePost = (subredditId: string | undefined, postId: string | undefined) => {
  const getPost = async () => {
    return await fetchData<PostType>({
      url: `${import.meta.env.VITE_API_URL}/${subredditId}/posts/${postId}`,
    });
  };

  return useQuery<PostType, Error>({
    queryKey: ['post', `${subredditId}-${postId}`],
    queryFn: getPost,
    staleTime: 1000 * 60 * 5,
    enabled: !!subredditId || !!postId,
  });
};
