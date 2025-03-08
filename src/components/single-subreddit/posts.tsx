import { Loader2 } from 'lucide-react';
import { usePosts } from '@/hooks/usePosts';
import { useScrollLoading } from '@/hooks/useScrollLoading';
import { useSorting } from '@/hooks/useSorting';
import ErrorComponent from '../errorComponent';
import SortingSelect from '../sorting/sortingSelect';
import PostCard from './postCard';

const SubredditPosts = ({ subredditId }: { subredditId: string }) => {
  const { currentOrder, currentSort } = useSorting();
  const { isLoading, data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    usePosts(subredditId, { sortBy: currentSort, order: currentOrder });
  const { observerRef } = useScrollLoading(hasNextPage, isFetchingNextPage, fetchNextPage);

  const options = [
    { value: 'sortBy=title', label: 'Title' },
    { value: 'sortBy=upvotes&order=desc', label: 'Upvotes' },
    { value: 'sortBy=createdAt', label: 'New' },
  ];

  if (error)
    return (
      <ErrorComponent
        title='Failed to get this post.'
        message="We couldn't load this post. It may have been deleted or there might be a temporary issue. Try again later!"
      />
    );

  return (
    <>
      <div className='flex w-full items-end justify-end'>
        <SortingSelect options={options} />
      </div>
      {data?.pages.map((page, index) => (
        <div key={index} className='-4 mx-auto w-[80%] py-4'>
          {page.data.map((post) => (
            <PostCard key={post.id} post={post} isLoading={isLoading} isFetching={isFetching} />
          ))}
        </div>
      ))}
      {hasNextPage && (
        <div ref={observerRef} className='flex h-10 items-center justify-center'>
          {isFetchingNextPage ? <Loader2 className='animate-spin' /> : 'Scroll down to load more'}
        </div>
      )}
    </>
  );
};

export default SubredditPosts;
