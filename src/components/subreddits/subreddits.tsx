import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConditionalRenderer from '@/components/conditionalRenderer';
import { LoadingSquareSkeleton } from '@/components/loading';
import SubredditCard from '@/components/subreddits/subredditCard';
import { useSubreddits } from '@/hooks/useSubreddits';
import ErrorComponent from '../errorComponent';

const Subreddits = () => {
  const { isLoading, data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useSubreddits();

  if (error)
    return (
      <ErrorComponent message='There was a problem with getting the subreddits. Try again later!' />
    );

  return (
    <>
      <ConditionalRenderer
        isLoading={isLoading}
        trueComponent={<LoadingSquareSkeleton length={10} />}
        falseComponent={
          <>
            {data?.pages.map((group, i) => (
              <div
                key={i}
                className='grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
              >
                {group.data.map((project) => (
                  <SubredditCard subreddit={project} key={project.id} />
                ))}
              </div>
            ))}
          </>
        }
      />
      <ConditionalRenderer
        isLoading={isFetching}
        trueComponent={<LoadingSquareSkeleton length={10} />}
        falseComponent={<></>}
      />
      <div className='flex w-full items-center justify-center'>
        <Button
          variant={'link'}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            <Loader2 className='size-4 animate-spin' />
          ) : hasNextPage ? (
            'Load More'
          ) : isLoading ? null : (
            ''
          )}
        </Button>
      </div>
    </>
  );
};

export default Subreddits;
