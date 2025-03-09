import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSubreddits } from '@/hooks/useSubreddits';
import { Link } from 'react-router-dom';
import { LoadingSkeleton } from '../loading';
import ConditionalRenderer from '../conditionalRenderer';
import ErrorComponent from '../errorComponent';

const TopCommunities = () => {
  const { isLoading, data, error } = useSubreddits();

  console.log(data);

  if (error)
    return (
      <ErrorComponent
        message='An unexpected error happened. Try again later!'
        title='Subreddits data was not found'
      />
    );

  return (
    <Card className='overflow-hidden border py-1 shadow-sm'>
      <CardHeader className='p-4 pb-2'>
        <CardTitle className='text-lg'>Top Communities</CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='divide-y'>
          <ConditionalRenderer
            isLoading={isLoading}
            trueComponent={<LoadingSkeleton length={5} size='8' />}
            falseComponent={data?.pages[0].data?.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className='hover:bg-muted/50 flex cursor-pointer items-center justify-start p-3 transition-colors'
              >
                <span className='text-muted-foreground w-6 text-sm font-medium'>{item.id}</span>
                <div className='flex-1'>
                  <Link
                    to={`/subreddits/${item.id}`}
                    className='text-sm font-medium hover:underline'
                  >
                    r/{item.title}
                  </Link>
                </div>
              </div>
            ))}
          />
        </div>
        <div className='bg-muted/30 mt-4 p-3'>
          <ConditionalRenderer
            isLoading={isLoading}
            trueComponent={<LoadingSkeleton />}
            falseComponent={
              <Link
                to='/subreddits'
                className='block w-full text-center text-sm text-blue-500 hover:underline'
              >
                View All Communities
              </Link>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TopCommunities;
