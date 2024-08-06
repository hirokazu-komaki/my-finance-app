import React from 'react';

const CategorySelect = ({ category, setCategory }) => {
  const categories = ['食べ物', '日用品', '娯楽'];

  return (
    <select value={category} onChange={(e) => setCategory(e.target.value)}>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;
