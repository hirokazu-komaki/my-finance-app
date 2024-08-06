// なぜかこのconfigファイルからdynamoDbDocClientをbackep-serverから読み込もうとすると
// 実行が失敗する
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const { cli } = require('webpack');
require('dotenv').config();

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN
  },
});

const dynamoDbDocClient = DynamoDBDocumentClient.from(client);
module.exports = dynamoDbDocClient;
