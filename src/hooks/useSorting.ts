import { useSearchParams } from 'react-router-dom';

export const useSorting = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get('sortBy') || undefined;
  const currentOrder = searchParams.get('order') || undefined;

  return { setSearchParams, currentSort, currentOrder };
};
