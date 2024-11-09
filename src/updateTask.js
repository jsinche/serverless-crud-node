const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

exports.updateTask = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;
    const body = JSON.parse(event.body);

    const UpdateExpression = [];
    const ExpressionAttributeValues = {};
    body.updatedAt = new Date().toUTCString();
    for (const [key, value] of Object.entries(body)) {
        UpdateExpression.push(`${key} = :${key}`);
        ExpressionAttributeValues[`:${key}`] = value;
    }

    const params = {
        TableName: 'TaskTable',
        Key: {
            id,
        },
        UpdateExpression: `SET ${UpdateExpression.join(', ')}`,
        ExpressionAttributeValues,
    };

    await dynamodb.update(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({message: 'Task updated successfully'}),
    };
};