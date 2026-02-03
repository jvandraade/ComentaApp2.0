import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Search, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Buscar reclamações...',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    setSearchValue(inputValue);
    onSearch(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setInputValue('');
    setSearchValue('');
    onSearch('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue === '' && searchValue !== '') {
      setSearchValue('');
      onSearch('');
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder={placeholder}
            leftIcon={<Search className="w-4 h-4" />}
            rightIcon={
              inputValue ? (
                <button onClick={handleClear} className="hover:text-primary transition-colors">
                  <X className="w-4 h-4" />
                </button>
              ) : null
            }
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        <Button size="md" onClick={handleSearch} disabled={!inputValue}>
          Buscar
        </Button>
      </div>

      {searchValue && <p className="text-sm text-accent-darkGray">Buscando por "{searchValue}"</p>}
    </div>
  );
};
