/**
 * Created by rca733 on 4/1/16.
 */
var AWS = require('aws-sdk');
var url = require('url');
var proxy = require('proxy-agent');
console.log('using proxy server %j', proxy);
var endpointDynamoDB="https://dynamodb.us-east-1.amazonaws.com/";
AWS.config.update({
    region: "us-east-1",
    endpoint: endpointDynamoDB,
    httpOptions: {
        agent: proxy('proxy-link')
    }
});


var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Movies",
    KeySchema: [
        { AttributeName: "year", KeyType: "HASH"},  //Partition key
        { AttributeName: "title", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
