import React, { useEffect, useMemo, useState } from 'react';
import { useJobContext } from '../context/JobContext';
import debounce from 'lodash.debounce';

function SearchBar() {
  const { dispatch } = useJobContext();
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = useMemo(() => {
    return debounce((text) => {
      dispatch({ type: 'SET_SEARCH', payload: text.toLowerCase() });
    }, 300);
  }, [dispatch]);

  useEffect(() => {
    debouncedSearch(inputValue);
    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue, debouncedSearch]);

  return (
    <input
      type="text"
      placeholder="Search by title or company..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      style={{ padding: '10px', width: '100%', marginBottom: '20px' }}
    />
  );
}

export default SearchBar;
