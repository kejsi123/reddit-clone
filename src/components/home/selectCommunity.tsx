import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const SelectCommunity = () => {
  return (
    <Card className='overflow-hidden border shadow-sm'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-center text-xl'>Select a subreddit</CardTitle>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='flex flex-col items-center justify-center space-y-6 py-12 text-center'>
          <div className='max-w-md space-y-2'>
            <h3 className='text-xl font-semibold'>Choose a subreddit first</h3>
            <p className='text-muted-foreground'>
              Select a subreddit from the Top Communities section to view posts.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelectCommunity;
