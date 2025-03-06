import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSingleSubreddit } from '@/hooks/useSingleSubreddit';
import { Cake, CircleAlert, Globe, Info, Users } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '../ui/skeleton';
import { LoadingSkeleton } from '../loading';
import ConditionalRenderer from '../conditionalRenderer';

const SubredditSidebar = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useSingleSubreddit(id);

  if (!id) return;

  if (error) {
    return (
      <Card className='flex h-96 items-center justify-center overflow-hidden border py-0 shadow-sm'>
        <CircleAlert className='text-muted-foreground size-32' />
        <CardContent className='flex space-y-6'>
          <CardDescription className='text-center'>
            An unexpected error happened. Try again later!
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  const subredditInfo = [
    { icon: Users, text: '10k members • 2k online' },
    { icon: Cake, text: `Created ${new Date(data?.createdAt as string).toDateString()}` },
    { icon: Globe, text: 'Public' },
  ];

  return (
    <Card className='overflow-hidden border py-0 shadow-sm'>
      <CardHeader className='bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white'>
        <ConditionalRenderer
          isLoading={isLoading}
          trueComponent={<Skeleton className='h-8 w-full rounded-md' />}
          falseComponent={
            <CardTitle className='flex items-center gap-2'>
              <Info className='h-5 w-5' />
              r/{data?.title}
            </CardTitle>
          }
        />
      </CardHeader>
      <CardContent className='space-y-4'>
        <CardDescription className='text-foreground text-sm'>{data?.description}</CardDescription>
        <div className='space-y-3 pt-2'>
          <ConditionalRenderer
            isLoading={isLoading}
            trueComponent={<LoadingSkeleton length={3} size='4' />}
            falseComponent={subredditInfo.map((item, index) => (
              <div key={index}>
                <div className='flex items-center gap-2'>
                  <item.icon className='text-muted-foreground h-4 w-4' />
                  <span className='text-sm'>{item.text}</span>
                </div>
              </div>
            ))}
          />
        </div>
      </CardContent>
      <CardFooter className='bg-muted/50 flex flex-col items-start border-t pb-4'>
        <div className='text-muted-foreground mt-4 text-xs'>
          Reddit Clone Inc © {new Date().getFullYear()}. All rights reserved.
        </div>
      </CardFooter>
    </Card>
  );
};

export default SubredditSidebar;
