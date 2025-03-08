import React from 'react';
import { Loader2, MessageSquareOff } from 'lucide-react';
import { useComments } from '@/hooks/useComments';
import { useScrollLoading } from '@/hooks/useScrollLoading';
import { useSorting } from '@/hooks/useSorting';
import { Avatar, AvatarFallback } from '../ui/avatar';
import ConditionalRenderer from '../conditionalRenderer';
import { LoadingComment } from '../loading';
import SortingSelect from '../sorting/sortingSelect';

const CommentSection = ({
  subredditId,
  postId,
}: {
  subredditId: string | undefined;
  postId: string | undefined;
}) => {
  const { currentSort } = useSorting();
  const { isLoading, data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useComments(subredditId, postId, { sortBy: currentSort });
  const { observerRef } = useScrollLoading(hasNextPage, isFetchingNextPage, fetchNextPage);

  const options = [{ value: 'sortBy=createdAt', label: 'New' }];

  return (
    <div className='mt-4 space-y-6'>
      <div className='space-y-4'>
        <div className='flex justify-between'>
          <h3 className='text-lg font-medium'>Comments</h3>
          <SortingSelect options={options} />
        </div>
        <div className='space-y-4'>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              <ConditionalRenderer
                isLoading={isLoading || isFetching}
                trueComponent={<LoadingComment />}
                falseComponent={
                  <>
                    {error || page.data.length < 0 ? (
                      <NoComments />
                    ) : (
                      <>
                        {page.data.map((comment) => (
                          <div key={comment.id} className='rounded-lg'>
                            <div className='flex gap-3'>
                              <Avatar className='mt-1 h-8 w-8'>
                                <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className='flex-1'>
                                <div className='flex items-center gap-2'>
                                  <span className='font-medium'>u/{comment.name}</span>•
                                  <span className='text-muted-foreground text-xs'>
                                    {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                      year: '2-digit',
                                      month: '2-digit',
                                      day: '2-digit',
                                    })}
                                  </span>
                                </div>
                                <p className='mt-1 text-sm'>{comment.body}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                }
              />
            </React.Fragment>
          ))}
          {hasNextPage && (
            <div ref={observerRef} className='flex h-10 items-center justify-center'>
              {isFetchingNextPage ? (
                <Loader2 className='animate-spin' />
              ) : (
                'Scroll down to load more'
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;

const NoComments = () => {
  return (
    <div className='flex flex-col items-center justify-center py-10 text-center'>
      <div className='bg-muted mb-3 rounded-full p-3'>
        <MessageSquareOff className='text-muted-foreground h-6 w-6' />
      </div>
      <h3 className='mb-1 text-lg font-medium'>No Comments Found</h3>
      <p className='text-muted-foreground max-w-sm text-sm'>
        Be the first to share your thoughts on this post.
      </p>
    </div>
  );
};
