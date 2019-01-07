let AWS = require('aws-sdk');
const cognito_idp = new AWS.CognitoIdentityServiceProvider();

exports.handler = function (event, context, callback) {
    let email = event.email;
    let phone = event.phone;
    let role = event.role;
    cognito_idp.adminCreateUser({
        UserPoolId: process.env.UserPoolId_cognitoHotspacesVendor,
        Username: `${email}`,
        DesiredDeliveryMediums: ["EMAIL", "SMS"],
        ForceAliasCreation: false,
        TemporaryPassword: "12345678",
        UserAttributes: [{
            Name: "email",
            Value: `${email}`
        }, {
            Name: "phone_number",
            Value: `${phone}`
        }, {
            Name: "custom:Role",
            Value: `${role}`
        }],
        ValidationData: []
    }, function (error, data) {
        if (error) {
            console.log(error);
            // implement error handling logic here
            throw error;
        }
        console.log(data)
        // your logic goes within this block
    });

    callback(null, { "message": "Successfully executed" });
}