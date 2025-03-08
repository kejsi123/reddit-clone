import { useSinglePost } from '@/hooks/useSinglePost';
import ConditionalRenderer from '../conditionalRenderer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { useParams } from 'react-router-dom';
import { LoadingImage, LoadingSkeleton } from '../loading';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { ArrowBigDown, ArrowBigUp, CalendarIcon, Ellipsis } from 'lucide-react';
import ImageWithFallback from './imageWithFallback';
import { cn } from '@/lib/utils';
import CommentSection from './commentSection';
import { useVote } from '@/hooks/useVote';

const PostWithComments = () => {
  const { id, postId } = useParams() as { id: string; postId: string };
  const { isLoading, status, data } = useSinglePost(id, postId);
  const { userVote, handleVote } = useVote(postId, id);

  if (status === 'error') return <>error</>;

  return (
    <div>
      <Card className='cursor-pointer rounded-sm border-none'>
        <CardHeader>
          <div className='flex w-full justify-between'>
            <ConditionalRenderer
              isLoading={isLoading || status === 'pending'}
              trueComponent={<LoadingSkeleton size='4' />}
              falseComponent={
                <>
                  <CardDescription>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant='link'>u/{data?.user}</Button>
                      </HoverCardTrigger>
                      <HoverCardContent className='w-80'>
                        <div className='flex justify-start space-x-4'>
                          <Avatar>
                            <AvatarFallback>{data?.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className='space-y-1'>
                            <h4 className='text-sm font-semibold'>u/{data?.user}</h4>
                            <p className='text-sm'>This is a user.</p>
                            <div className='flex items-center pt-2'>
                              <CalendarIcon className='mr-2 h-4 w-4 opacity-70' />{' '}
                              <span className='text-muted-foreground text-xs'>
                                Joined December 2021
                              </span>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                    •{' '}
                    {new Date(data?.createdAt as string).toLocaleDateString('en-US', {
                      year: '2-digit',
                      month: '2-digit',
                    })}
                  </CardDescription>
                  <Button variant='ghost'>
                    <Ellipsis />
                  </Button>
                </>
              }
            />
          </div>
          <ConditionalRenderer
            isLoading={isLoading || status === 'pending'}
            trueComponent={<LoadingSkeleton size='8' />}
            falseComponent={<CardTitle className='text-2xl'>{data?.title}</CardTitle>}
          />
        </CardHeader>
        <CardContent>
          <ConditionalRenderer
            isLoading={isLoading || status === 'pending'}
            trueComponent={<LoadingImage />}
            falseComponent={<ImageWithFallback src={data?.image} alt={data?.title} />}
          />
          <p>{data?.body}</p>
        </CardContent>
        <CardFooter className='gap-x-4'>
          <ConditionalRenderer
            isLoading={isLoading || status === 'pending'}
            trueComponent={<LoadingSkeleton size='8' />}
            falseComponent={
              <div className='bg-muted rounded-full'>
                <Button
                  onClick={() => {
                    handleVote('upvote');
                  }}
                  variant='ghost'
                  className='hover:bg-muted-foreground/70 rounded-full'
                >
                  <ArrowBigUp className={cn(userVote === 'upvote' && 'text-green-500')} />
                  {data?.upvotes && data.upvotes + (userVote === 'upvote' ? 1 : 0)}
                </Button>
                <Button
                  variant='ghost'
                  onClick={() => {
                    handleVote('downvote');
                  }}
                  className='hover:bg-muted-foreground/70 rounded-full'
                >
                  <ArrowBigDown className={cn(userVote === 'downvote' && 'text-red-500')} />
                  {data?.downvotes && data.downvotes + (userVote === 'downvote' ? 1 : 0)}
                </Button>
              </div>
            }
          />
        </CardFooter>
      </Card>
      <div className='bg-background border-border mt-2 rounded-md border px-4 py-3'>
        <CommentSection subredditId={id} postId={postId} />
      </div>
    </div>
  );
};

export default PostWithComments;
