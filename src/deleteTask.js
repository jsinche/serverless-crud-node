const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

exports.deleteTask = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;
    const params = {
        TableName: 'TaskTable',
        Key: {
            id,
        },
    };
    await dynamodb.delete(params).promise();
    return {
        statusCode: 200,
        body: JSON.stringify({message: 'Task deleted successfully'}),
    };
};