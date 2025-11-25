import { SearchIcon } from '@/shared/icons';
import { FilterKeys } from '@/utils/enums/common.enum';
import { TextInput, TextInputProps } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router';

interface AppQuickSearchProps extends TextInputProps {}

const AppQuickSearch = (props: AppQuickSearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTermFromURL = searchParams.get(FilterKeys.SEARCH_TERM) || '';
  const [search, setSearch] = useState(searchTermFromURL);

  const debouncedSetSearchParams = useDebouncedCallback(() => {
    setSearchParams((previousParams) => {
      if (search) {
        previousParams.set(FilterKeys.SEARCH_TERM, search);
      } else {
        previousParams.delete(FilterKeys.SEARCH_TERM);
      }
      // Reset page to 1 when search changes
      previousParams.set(FilterKeys.PAGE, '1');
      return previousParams;
    });
  }, 300);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    debouncedSetSearchParams();
  };

  return (
    <TextInput
      leftSectionPointerEvents='none'
      leftSection={<SearchIcon width={16} height={16} />}
      value={search}
      w={330}
      onChange={handleChange}
      {...props}
    />
  );
};

export default AppQuickSearch;
