import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        },
        // 'UpdateExpression' defines the attributes to be updated
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":content": data.content || null
        },
        // 'ReturValues' specifies if and how to return the item's attribute
        // ALL_NEW return all attributes of the item after the update;
        ReturnValues: "ALL_NEW"
    };
    await dynamoDb.update(params);

    return { status: true };
});