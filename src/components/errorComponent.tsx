import { AlertCircle } from 'lucide-react';

type PostErrorProps = {
  title?: string;
  message?: string;
};

const ErrorComponent = ({
  title = 'Failed to load data',
  message = "We couldn't load this data. It may have been deleted or there might be a temporary issue. Try again later!",
}: PostErrorProps) => {
  return (
    <div className='flex flex-col items-center justify-center px-4 py-12 text-center'>
      <div className='mb-4 rounded-full bg-red-100 p-4 dark:bg-red-900/20'>
        <AlertCircle className='h-8 w-8 text-red-600 dark:text-red-400' />
      </div>

      <h2 className='mb-2 text-2xl font-bold'>{title}</h2>

      <p className='text-muted-foreground mb-6 max-w-md'>{message}</p>
    </div>
  );
};

export default ErrorComponent;
