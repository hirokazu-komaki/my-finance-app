import React, { useState } from 'react';
import {PaymentInputForm, TotalDisplay, CategoryTotalDisplay} from './components';

const App = () => {
  const [payments, setPayments] = useState([]);

  const addPayment = (paymentItem) => {
    setPayments([...payments, paymentItem]);
    // setPayments((payments) => {
    //   payments.push(paymentItem)
    // })
  };

  return (
    <div>
      <h1>家計管理アプリ</h1>
      <PaymentInputForm addPayment={addPayment} />
      <TotalDisplay payments={payments} />
      <CategoryTotalDisplay payments={payments} />
    </div>
  );
};

export default App;