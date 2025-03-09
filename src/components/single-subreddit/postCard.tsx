import React from 'react';
import { PostType } from '@/types/posts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowBigDown, ArrowBigUp, CalendarIcon, Ellipsis, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useVote } from '@/hooks/useVote';
import { useCommentsForLength } from '@/hooks/useCommentsForLength';

import ConditionalRenderer from '../conditionalRenderer';
import { LoadingImage, LoadingSkeleton } from '../loading';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import ImageWithFallback from '../post/imageWithFallback';

const PostCard = ({
  post,
  isLoading,
  isFetching,
}: {
  post: PostType;
  isLoading: boolean;
  isFetching: boolean;
}) => {
  const { data: commentsLength } = useCommentsForLength(post.subredditId, post.id);
  const navigate = useNavigate();
  const { userVote, handleVote } = useVote(post.id, post.subredditId);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }

    navigate(`/subreddits/${post.subredditId}/post/${post.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      className='cursor-pointer rounded-sm border-none hover:bg-gray-100/20 dark:hover:bg-gray-700/40'
    >
      <CardHeader>
        <div className='flex w-full justify-between'>
          <ConditionalRenderer
            isLoading={isLoading || isFetching}
            trueComponent={<LoadingSkeleton size='4' />}
            falseComponent={
              <>
                <CardDescription>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant='link'>u/{post.user}</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className='w-80'>
                      <div className='flex justify-start space-x-4'>
                        <Avatar>
                          <AvatarFallback>{post.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className='space-y-1'>
                          <h4 className='text-sm font-semibold'>u/{post.user}</h4>
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
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
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
          isLoading={isLoading || isFetching}
          trueComponent={<LoadingSkeleton size='8' />}
          falseComponent={
            <CardTitle
              onClick={() => navigate(`/subreddits/${post.subredditId}/post/${post.id}`)}
              className='text-2xl'
            >
              {post.title}
            </CardTitle>
          }
        />
      </CardHeader>
      <CardContent>
        <ConditionalRenderer
          isLoading={isLoading || isFetching}
          trueComponent={<LoadingImage />}
          falseComponent={<ImageWithFallback src={post.image} alt={post.title} />}
        />
        <p>{post.body}</p>
      </CardContent>
      <CardFooter className='gap-x-4'>
        <div className='bg-muted rounded-full'>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleVote('upvote');
            }}
            variant='ghost'
            className='hover:bg-muted-foreground/70 rounded-full'
          >
            <ArrowBigUp className={cn(userVote === 'upvote' && 'text-green-500')} />
            {post.upvotes + (userVote === 'upvote' ? 1 : 0)}
          </Button>
          <Button
            variant='ghost'
            onClick={(e) => {
              e.stopPropagation();
              handleVote('downvote');
            }}
            className='hover:bg-muted-foreground/70 rounded-full'
          >
            <ArrowBigDown className={cn(userVote === 'downvote' && 'text-red-500')} />
            {post.downvotes + (userVote === 'downvote' ? 1 : 0)}
          </Button>
        </div>
        <div className='bg-muted rounded-full'>
          <Button variant='ghost' className='hover:bg-muted-foreground/70 rounded-full'>
            <MessageCircle />
            {commentsLength}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
