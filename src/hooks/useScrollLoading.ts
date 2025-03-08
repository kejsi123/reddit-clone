import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

type FetchNextPageFnType<T> = (
  options?: FetchNextPageOptions
) => Promise<
  InfiniteQueryObserverResult<
    InfiniteData<{ data: T[]; nextPage?: number | undefined }, unknown>,
    Error
  >
>;

export const useScrollLoading = <T,>(
  hasNextPage: boolean,
  isFetchingNextPage: boolean,
  fetchNextPage: FetchNextPageFnType<T>
) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    //web API that watches when a DOM element comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        //the condition is true when the target element is visible
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 } //element should be fully visible for the function to happen
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { observerRef };
};
