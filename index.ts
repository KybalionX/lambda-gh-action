import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
const { randomUUID } = require("crypto"); // Added in: node v14.17.0

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "users-table";

interface BodyFromSqs {
  name: string;
  price: number;
}

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  console.log("EVENT: ", event.Records);

  const eventData = event.Records[0];

  try {
    const items = JSON.parse(eventData.body) as BodyFromSqs[];

    const storePromises = items.map((record) =>
      dynamo.send(
        new PutCommand({
          TableName: tableName,
          Item: record,
        })
      )
    );

    await Promise.all(storePromises);

    body = `Stored Items!`;
  } catch (error) {
    console.log("Error trying to insert a record in DynamoDB", error);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
