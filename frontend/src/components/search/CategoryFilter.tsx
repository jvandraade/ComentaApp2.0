import React from 'react';
import { Category } from '../../types/complaint';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelect: (categoryId: string) => void;
}

export const CategoryFilter = React.memo<CategoryFilterProps>(
  ({ categories, selectedCategoryId, onSelect }) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {/* All Categories */}
        <button
          onClick={() => onSelect('')}
          className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
            selectedCategoryId === ''
              ? 'bg-primary text-dark shadow-glow'
              : 'bg-dark-lighter border border-white/10 text-accent-gray hover:border-primary/50'
          }`}
        >
          ✨ Todas
        </button>

        {/* Category Buttons */}
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              selectedCategoryId === category.id
                ? 'text-dark font-semibold shadow-lg scale-105'
                : 'bg-dark-lighter border border-white/10 text-accent-gray hover:border-white/20 hover:scale-102'
            }`}
            style={selectedCategoryId === category.id ? { backgroundColor: category.color } : {}}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                selectedCategoryId === category.id ? 'bg-dark' : ''
              }`}
              style={selectedCategoryId !== category.id ? { backgroundColor: category.color } : {}}
            />
            <span className="truncate">{category.name}</span>
          </button>
        ))}
      </div>
    );
  }
);
