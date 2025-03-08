import { Button } from '@/components/ui/button';
import { FileQuestion, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <div className='bg-background flex min-h-screen flex-col items-center justify-center px-4'>
      <div className='flex flex-col items-center justify-center text-center'>
        <div className='bg-muted mb-6 rounded-full p-6'>
          <FileQuestion className='text-muted-foreground h-12 w-12' />
        </div>

        <h1 className='mb-2 text-4xl font-bold tracking-tighter sm:text-5xl'>404</h1>
        <h2 className='mb-4 text-2xl font-semibold'>Page Not Found</h2>

        <p className='text-muted-foreground mb-8 max-w-md'>
          The page you're looking for doesn't exist or has been moved. Check the URL or return to
          the homepage.
        </p>

        <Button asChild size='lg' className='gap-2'>
          <Link to='/'>
            <Home className='h-4 w-4' />
            Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
};
