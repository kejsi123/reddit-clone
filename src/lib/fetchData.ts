import { OptionsType } from '@/types/sort';

type FetchDataParams = {
  url: string;
  options?: OptionsType;
};

export const fetchData = async <T>({ url, options }: FetchDataParams): Promise<T> => {
  const apiUrl = new URL(url);

  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined) {
        apiUrl.searchParams.append(key, value as string);
      }
    });
  }

  const response = await fetch(apiUrl.toString());
  if (!response.ok) {
    throw new Error('Could not get the data, try again later!');
  }

  const data: T = await response.json();

  return data;
};
