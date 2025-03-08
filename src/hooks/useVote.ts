import { useState } from 'react';

const getVoteKey = (postId: string, subredditId: string) => `${subredditId}-${postId}`;

type VoteType = 'upvote' | 'downvote' | null;
type VotesState = { [key: string]: VoteType };

export const useVote = (postId: string, subredditId: string) => {
  const voteKey = getVoteKey(postId, subredditId);

  const [votes, setVotes] = useState<VotesState>(() => {
    const storedVotes = localStorage.getItem('postVotes');
    return storedVotes ? JSON.parse(storedVotes) : {};
  });

  const userVote: VoteType = votes[voteKey] || null;

  const handleVote = (type: 'upvote' | 'downvote') => {
    setVotes((prevVotes) => {
      const newVotes = { ...prevVotes };

      if (newVotes[voteKey] === type) {
        newVotes[voteKey] = null;
      } else {
        newVotes[voteKey] = type;
      }

      localStorage.setItem('postVotes', JSON.stringify(newVotes));
      return newVotes;
    });
  };

  return { userVote, handleVote } as const;
};
