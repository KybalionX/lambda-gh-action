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

  console.log("EVENT: ",event.Records);

  try {
      const storePromises = event.Records.map(record => {
          let requestJSON = JSON.parse(record.body);
        return dynamo.send(
            new PutCommand({
              TableName: tableName,
              Item: {
                price: requestJSON.price,
                name: requestJSON.name,
              },
            })
          );
      });

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
