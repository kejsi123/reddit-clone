import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useSorting } from '@/hooks/useSorting';

type SortingSelectProps = {
  options: {
    value: string;
    label: string;
  }[];
};

const SortingSelect = ({ options }: SortingSelectProps) => {
  const { setSearchParams, currentOrder, currentSort } = useSorting();

  const expectedValue = currentSort
    ? `sortBy=${currentSort}${currentOrder === 'desc' ? '&order=desc' : ''}`
    : '';

  const selectedValue = options.find((option) => option.value === expectedValue)?.value;

  return (
    <Select
      onValueChange={(value) => setSearchParams(new URLSearchParams(value))}
      value={selectedValue}
    >
      <SelectTrigger>
        <SelectValue placeholder='Sort by'>
          {options.find((option) => option.value === selectedValue)?.label || 'Sort by'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort Options</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortingSelect;
