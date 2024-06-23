import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "users-table";

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
      let requestJSON = JSON.parse(event.body);
    await dynamo.send(
        new PutCommand({
          TableName: tableName,
          Item: {
            price: requestJSON.price,
            name: requestJSON.name,
          },
        })
      );
      body = `Put item ${requestJSON.id}`;
    } catch (error) {
        console.log("Error trying to insert a record in DynamoDB", error);
    }

  return {
    statusCode,
    body,
    headers,
  };
};
