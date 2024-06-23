import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Handler } from "aws-lambda"

type LambdaResponse = APIGatewayProxyResultV2 & {
    event: APIGatewayProxyEvent,
};

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
    return {
        statusCode: 200,
        body: "Hello there, I was deployed using aws-cli!",
        event,
    };
}