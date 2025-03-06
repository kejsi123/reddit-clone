import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

type LoadingSkeletonProps = {
  length?: number;
  size?: string;
};

export const LoadingSkeleton = ({ length = 1, size = '4' }: LoadingSkeletonProps) => {
  return Array.from({ length: length }).map((_, index) => (
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
      {Array.from({ length: length }).map((_, index) => (
        <div key={index} className='hover:bg-muted/50 cursor-pointer transition-colors'>
          <Skeleton className={cn(`h-${size} w-44 rounded-md`)} />
        </div>
      ))}
    </div>
  );
};
