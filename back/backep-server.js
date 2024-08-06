require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const { PutCommand } = require('@aws-sdk/lib-dynamodb');
const { cli } = require('webpack');

// console.log('AWS_REGION:', process.env.AWS_REGION);
// .envファイルはmy-finance-appディレクトリ配下に置く

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  // region: "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN
  },
});
const dynamoDbDocClient = DynamoDBDocumentClient.from(client);

const app = express();

// ミドルウェア定義
// 受信するリクエストの本文（body）をJSON形式でパース
app.use(express.json()); 
// Reactのビルドファイルを配信するための設定
app.use(express.static(path.join(__dirname, '..', 'dist')));


// 支出データをPOST(新たに作成)
app.post('/insert-item', async (req, res) => {
    const { date, payment, category, amount} = req.body; // req.bodyも合わせる必要がある
  
    const params = {
      TableName: 'my-finance-data',
      Item: {
        date,
        payment,
        category,
        amount
      },
    };
  
    try {
      await dynamoDbDocClient.send(new PutCommand(params));
      // await dynamoDbDocClient.put(params)
      res.status(201).send('Item inserted successfully');
    } catch (error) {
      console.error('Error inserting item:', error);
      res.status(501).send('Error inserting item');
    }
});

// Reactのルートファイル（index.html）を配信
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

// やりとりするPORTを指定(デフォルト3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
