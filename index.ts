import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Handler } from "aws-lambda"

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> => {
    return {
        body: "Hello there!",
    }
}