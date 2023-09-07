import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import debounce from 'lodash-es/debounce';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/app-hook';
import { fetchSuggestions, getSuggestions } from './place-autocomplete-slice';

export interface PlaceAutocompleteProps {
  label: string;
  onSelect: (placeId: string) => void;
}

export function PlaceAutocomplete({ label, onSelect }: PlaceAutocompleteProps) {
  const dispatch = useAppDispatch();
  const suggestions = useAppSelector(getSuggestions);
  const debounceSearchSuggestions = useMemo(
    () => debounce((query) => query && dispatch(fetchSuggestions(query)), 100),
    [dispatch]
  );
  return (
    <AutoComplete
      filterOption={(inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      options={suggestions.map(({ description, place_id }) => ({ id: place_id, value: description }))}
      onSelect={(_, option) => option.id && onSelect(option.id)}
      onSearch={debounceSearchSuggestions}
    >
      <Input allowClear autoFocus placeholder={label} size="large" suffix={<SearchOutlined />} />
    </AutoComplete>
  );
}

export default PlaceAutocomplete;
