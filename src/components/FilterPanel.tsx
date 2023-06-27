import React, { useState } from 'react';
import BreedFilter, {breed} from './BreedFilter';
import SortFilter from './SortFilter';

interface FilterPanelProps {
  onApplyFilters: (filters: { breed: string; sort: string }) => void;
}

// const FilterPanel: React.FC<FilterPanelProps> = ({ onApplyFilters }) => {
const FilterPanel: React.FC= () => {

    const [sortMethod, setSortMethod] = useState<string | null>(null);

    const handleSortChange = (newValue: string | null) => {
    setSortMethod(newValue);
    };
    const handleSortMethodChange = (sortMethod: string | null) => {
        // Use the sortMethod value here
        console.log(sortMethod);
    };

  return (
    <div>
      <BreedFilter/>
      <SortFilter onSortMethodChange={handleSortMethodChange}/>
      <button>Apply Filters</button>
    </div>
  );
};

export default FilterPanel;