import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

type LoadingSkeletonProps = {
  length?: number;
  size?: string;
};

export const LoadingSkeleton = ({ length = 1, size = '4' }: LoadingSkeletonProps) => {
  return Array.from({ length }).map((_, index) => (
    <div
      key={index}
      className='hover:bg-muted/50 flex cursor-pointer items-center justify-start p-3 transition-colors'
    >
      <Skeleton className={cn(`h-${size} w-full rounded-md`)} />
    </div>
  ));
};
export const LoadingSquareSkeleton = ({ length = 1, size = '40' }: LoadingSkeletonProps) => {
  return (
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
      {Array.from({ length }).map((_, index) => (
        <div key={index} className='hover:bg-muted/50 cursor-pointer transition-colors'>
          <Skeleton className={cn(`h-${size} w-44 rounded-md`)} />
        </div>
      ))}
    </div>
  );
};

export const LoadingImage = () => {
  return <Skeleton className={cn(`h-[30rem] w-full rounded-md`)} />;
};

export const LoadingComment = ({ length = 5 }: { length?: number }) => {
  return (
    <div className='space-y-4'>
      {Array.from({ length }).map((_, index) => (
        <div key={index} className='rounded-lg'>
          <div className='flex gap-3'>
            <Skeleton className='mt-1 size-8 rounded-full' />
            <div className='flex-1'>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-3 w-16' />
              </div>
              <div className='mt-2 space-y-1.5'>
                <Skeleton className='h-3.5 w-full' />
                <Skeleton className='h-3.5 w-[85%]' />
                <Skeleton className='h-3.5 w-[70%]' />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
