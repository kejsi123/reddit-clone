import { useEffect, useRef, useState } from 'react';
import { useSubreddits } from '@/hooks/useSubreddits';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../ui/command';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const { data } = useSubreddits();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  const filteredSubreddits = query
    ? data?.pages
        .flatMap((page) => page.data)
        .filter((subreddit) => subreddit.title.toLowerCase().includes(query.toLowerCase()))
    : data?.pages.flatMap((page) => page.data);

  return (
    <div className='relative w-full md:w-[300px] lg:w-[400px]'>
      <div className='relative'>
        <Search className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
        <Input
          type='search'
          placeholder='Search'
          className='px-8'
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length > 0) {
              setOpen(true);
            }
          }}
          onFocus={() => setOpen(true)}
        />
      </div>

      {open && (
        <div
          ref={dialogRef}
          className='bg-popover absolute top-full right-0 left-0 z-10 mt-1 overflow-hidden rounded-md border shadow-md'
        >
          <Command>
            <CommandList>
              <CommandEmpty>No results found</CommandEmpty>
              <CommandGroup>
                {filteredSubreddits?.map((subreddit, index) => (
                  <CommandItem
                    key={`subreddit-${index}`}
                    onSelect={() => {
                      setQuery(subreddit.title);
                      setOpen(false);
                    }}
                    className='flex items-center gap-2 py-3'
                  >
                    <Link to={`/subreddits/${subreddit.id}`} className='flex flex-col'>
                      <span className='font-medium'>{subreddit.title}</span>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
