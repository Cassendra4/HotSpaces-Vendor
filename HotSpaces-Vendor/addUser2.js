let AWS = require('aws-sdk');
const cognito_idp = new AWS.CognitoIdentityServiceProvider();

exports.handler = function (event, context, callback) {
    let email = event.email;
    let phone = event.phone;
    let role = event.role;
    cognito_idp.adminCreateUser({
        UserPoolId: process.env.UserPoolId_cognitoHotspaceVendor,
        Username: `${email}`,
        DesiredDeliveryMediums: ["EMAIL", "SMS"],
        ForceAliasCreation: false,
        TemporaryPassword: "12345678",
        UserAttributes: [{
            Name: "custom:role",
            Value: `${role}`
        }, {
            Name: "email",
            Value: `${email}`
        }, {
            Name: "phone_number",
            Value: `${phone}`
        }, {
            Name: "custom:phone_number_verified",
            Value: "true"
        }, {
            Name: "custom:email_verified",
            Value: "true"
        }],
        ValidationData: []
    }, function (error, data) {
        if (error) {
            console.log(error)
            // implement error handling logic here
            throw error;
        }
        // your logic goes within this block
        console.log(data);
    });


    callback(null, { "message": "Successfully executed" });
}