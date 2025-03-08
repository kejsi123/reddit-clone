import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ConditionalRenderer from '@/components/conditionalRenderer';
import { LoadingSkeleton } from '@/components/loading';
import SubredditPosts from '@/components/single-subreddit/posts';
import { useSingleSubreddit } from '@/hooks/useSingleSubreddit';
import ErrorComponent from '../errorComponent';

const Subreddit = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useSingleSubreddit(id);
  const [joined, setJoined] = useState<boolean>(false);
  if (!id) return;

  if (error) {
    return <ErrorComponent message='An unexpected error happened. Try again later!' />;
  }

  return (
    <>
      <ConditionalRenderer
        isLoading={isLoading}
        trueComponent={<LoadingSkeleton length={1} size='10' />}
        falseComponent={
          <div className='flex items-center justify-between'>
            <h1 className='mb-6 inline-block text-3xl font-bold tracking-tighter text-gray-900 dark:text-white'>
              r/{data?.title}
            </h1>
            <Button
              onClick={() => setJoined((prev) => !prev)}
              className='cursor-pointer rounded-full'
            >
              {joined ? (
                'Joined'
              ) : (
                <>
                  <Plus />
                  Join
                </>
              )}
            </Button>
          </div>
        }
      />
      <SubredditPosts subredditId={id} />
    </>
  );
};

export default Subreddit;
