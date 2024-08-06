import React from 'react';

const CategoryTotalDisplay = ({ payments }) => {
  const categories = ['食べ物', '日用品', '娯楽'];

  const totalByCategory = (method) => {
    return categories.map((category) => {
      const total = payments
        .filter((payment) => payment.payment === method && payment.category === category)
        .reduce((sum, payment) => sum + payment.amount, 0);

      return (
        <p key={category}>
          {category}: {total}円
        </p>
      );
    });
  };

  return (
    <div>
      <h2>カテゴリごとの合計金額</h2>
      <h3>現金</h3>
      {totalByCategory('現金')}
      <h3>カード</h3>
      {totalByCategory('カード')}
    </div>
  );
};

export default CategoryTotalDisplay;
