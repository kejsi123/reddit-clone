import { SubredditsType } from '@/types/subreddits';
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import { Link } from 'react-router-dom';

const SubredditCard = ({ subreddit }: { subreddit: SubredditsType }) => {
  return (
    <Link to={`/subreddits/${subreddit.id}`}>
      <Card className='h-40 w-44'>
        <CardTitle className='px-3'>r/{subreddit.title}</CardTitle>
        <CardContent>
          <CardDescription>{subreddit.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SubredditCard;
