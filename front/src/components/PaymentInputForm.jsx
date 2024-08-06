import React, { useState } from 'react';
import axios from 'axios';
import CategorySelect from './CategorySelect';

const PaymentInputForm = ({ addPayment }) => {
  const [amount, setAmount] = useState('');
  const [payment, setMethod] = useState('現金');
  const [category, setCategory] = useState('食べ物');

  const handleSubmit = async (e) => {
    e.preventDefault(); // この場合formのデフォルト動作が抑止される
    if (!amount) return;

    const paymentData = { 
      amount: parseFloat(amount), 
      payment, 
      category, 
      date: new Date().toISOString() 
    }

    try {
      // サーバーにデータを送信する処理
      const response = await axios.post('http://localhost:8080/insert-item', paymentData);
      console.log('Server response:', response.data);
      // console.log(paymentData)
      
      // フロントエンド側の処理
      addPayment(paymentData);
      setAmount(''); // 金額を追加した後に入力欄を空欄にする
      
    } catch (error) {
      console.error('Error inserting item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="金額"
      />
      <select value={payment} onChange={(e) => setMethod(e.target.value)}>
        <option value="現金">現金</option>
        <option value="カード">カード</option>
      </select>
      <CategorySelect category={category} setCategory={setCategory} />
      <button type="submit">追加</button>
    </form>
  );
};

export default PaymentInputForm;
