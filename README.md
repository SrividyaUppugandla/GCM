# PushNotification Micro Service.

### This micro service offers the required APIs for PushNotifications. APIs include push notifications for iOS, android, windows, slack and channels.

## PushNotification Service API

### GET /devices, /fileUpload
### POST /devices, /notify, /notify/bulk, /apnssettings
### PUT /devices/:deviceid, /gcmsettings, /wnssettings
### DELETE /devices/:device, /apnssettings, /gcmsettings, /wnssettings


Authenticates the user against requested provider and redirects back to application with a code.

### Request
| Query Param  |                  Description                                                          |
|--------------|---------------------------------------------------------------------------------------|
| callbackUrl  | callbackUrl to where Authentication service needs to redirect after authentication    |

### Response
| HTTP           |      Value                           |
|----------------|--------------------------------------|
| query params   | code=eyJ0eXAiOiJKV1dfgdfg5fggyhh...  |

* Example API call

      ```
       var url = "http://authservice.54.208.194.189.xip.io"+"/facebook?"+"callbackUrl=http://localhost:3000/callback";
       res.redirect(url);
      ```

## POST /account
This API retrieves the account details of the logged in user. Request parameters of the body are code(received from /facebook, /google, /twitter, /linkedin in callback) and apiKey

### Request
| HTTP       |                             Value                                           |
|------------|-----------------------------------------------------------------------------|
| Body       | {"code":"eyJ0eXAiOiJKV1dfgdfg5fggyhh...","apiKey":"YOUR_API_KEY_FROM_VCAP"} |

### Response
| HTTP       |  Value                                                               |
|------------|----------------------------------------------------------------------|
| Body       | {"accessToken":"Rcp4xZC06HnmcFMaW866wS9KSK4bCjxBQB2UTPfVbOJH","id":"607861336036","displayName":"John Doe","provider":"facebook"}|

*Note: refreshToken will be available only for /twitter call. Not applicable for other providers


## GET /logout
Terminates an existing login session and redirects to the callback URL

### Request
| Query Param  |                  Description                                                          |
|--------------|---------------------------------------------------------------------------------------|
| callbackUrl  | callbackUrl to where Authentication service needs to redirect after authentication    |

### Response
- Redirects back to the callbackUrl after successful session termination. No query params will be passed.


## POST /generate
- This API generates an OTP with the given combination(numeric,alpha or both) and sends the OTP to desired receipient based on the given channel and receipient details.
- Supports SendGrid and Twilio as channels.

### Request
| HTTP       |                             Value                                               |
|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Body       | {"channel": "sendgrid", "otp": {"otpLength": 5,"otpType": "numeric","otpExpiryTime":  4},"sendgrid": {"accountSID": "1234","authToken": "abcd","toRecipient":"someemail@gmail.com","fromMail": "someemail@gmail.com"}} |

### Response
| HTTP       |  Value                                                             |
|------------|--------------------------------------------------------------------------------------------|
| Body       | {"otpCode":"79653","otpKey":"69687d70cb2503339e780f54db7a02bb958e86f84aeaa6023dc7397c531"} |

* Example JSON body for request

      ```
       1. for sendgrid : {"channel": "sendgrid", "otp": {"otpLength": 5,"otpType": "numeric","otpExpiryTime":  4},"sendgrid": {"accountSID": "1234","authToken": "abcd","toRecipient":"someemail@gmail.com","fromMail": "someemail@gmail.com"}}
       2. for twilio : {"channel": "twilio", "otp": {"otpLength": 5,"otpType": "numeric","otpExpiryTime":  4},"twilio":{"accountSID": "hdfk6545f47d11a6a7a56","authToken": "3505f762yujy655c727fe","toRecipient": "somenumber","fromNo": "registerd_number"}}
      ```
* Note : Default values for otpLength, otpType and otpExpiryTime are 4, numeric and 10 respectively. otpType can be of numeric or alpha or alphanumeric

## POST /validate
- This API validates the requested OTP. Response of /generate API is the body request for this API

### Request
| HTTP       |                             Value                                                          |
|------------|--------------------------------------------------------------------------------------------|
| Body       | {"otpCode":"79653","otpKey":"69687d70cb2503339e780f54db7a02bb958e86f84aeaa6023dc7397c531"} |

### Response
| HTTP       |  Value                                      |
|------------|---------------------------------------------|
| Body       | {"status":"OTP is validated successfully"}  |


## POST /saveLog
- This API saves applications logs to Graylog server.

### Request
| HTTP       |                             Value                                                          |
|------------|--------------------------------------------------------------------------------------------|
| Body       | {"level":"INFO","message":"Info message", "appid":"OneC", "priority":"low"} |

### Response
| HTTP       |  Value                                      |
|------------|---------------------------------------------|
| Body       | {"status":"success", "message":"Successfully sent to Graylog server"}|

## POST /saveToMongo
- This API saves application logs to Mongodb server.

### Request
| HTTP       |                             Value                                                          |
|------------|--------------------------------------------------------------------------------------------|
| Body       | {"level":"INFO","message":"Info message", "appid":"OneC", "priority":"low"} |

### Response
| HTTP       |  Value                                      |
|------------|---------------------------------------------|
| Body       | {"status":"success", "message":"Successfully sent to Mongodb server"}|

## POST /searchLog
- This API used to search logs from MongoDB, based on the user provided filters.

### Request
| HTTP       |                             Value                                                          |
|------------|--------------------------------------------------------------------------------------------|
| Body       | {"level":"INFO", "appid":"OneC", "priority":"low"} |

### Response
| HTTP       |  Value                                      |
|------------|---------------------------------------------|
| Body       | [{"_id": "57764a04d5613aa7a0dd8b31", "datetime": "2016-07-01T10:46:28.000Z", "priority": "LOW", "level": "INFO", "msg": "Info message", "appid": "ONEC", "__v": 0}] |
