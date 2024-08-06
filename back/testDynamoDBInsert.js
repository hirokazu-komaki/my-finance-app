// import { PutCommand } from '@aws-sdk/lib-dynamodb';
// import { dynamoDbDocClient } from './dynamodb-config';
const { PutCommand } = require('@aws-sdk/lib-dynamodb');
const dynamoDbDocClient = require('./dynamodb-config');

const insertItem = async () => {
  const params = {
    TableName: 'my-finance-data',
    Item: {
      date: "2024/07/31",
      payment: "credit",
      UserId: '12345',
      Name: 'Hiroo',
    },
  };

  try {
    await dynamoDbDocClient.send(new PutCommand(params));
    console.log('Item inserted successfully');
  } catch (error) {
    console.error('Error inserting item:', error);
  }
};

insertItem();
