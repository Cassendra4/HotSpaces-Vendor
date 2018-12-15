let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
let dynamoDBService = require('./dynamoDBService');


exports.handler = function (event, context, callback) {

    let userId = event.queryStringParameters.userId;
    dynamoDBService.getUser(userId)

        .then(function (data) {
            //your logic goes here
            console.log(data);
        })
        .catch(function (err) {
            //handle error
            console.log(err);
        });




}