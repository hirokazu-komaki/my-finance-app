import React from 'react';

const TotalDisplay = ({ payments }) => {
  const totalCash = payments
    .filter((payment) => payment.payment === '現金')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const totalCardNextMonth = payments
    .filter((payment) => payment.payment === 'カード')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div>
      <h2>月の合計金額</h2>
      <p>現金での合計: {totalCash}円</p>
      <p>翌月に支払うカードの合計: {totalCardNextMonth}円</p>
    </div>
  );
};

export default TotalDisplay;
