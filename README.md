# PushNotification Micro Service.

### This micro service offers the required APIs for PushNotifications. APIs include push notifications for iOS, android, windows, slack and creating channels.

## Keywords

- deviceId       : The deviceId is the unique ID for the device for the application
- userId         : The userId is the unique user ID for the user for the application
- deviceToken    : deviceToken refers to registrationId in Android, device-token in iOS and channelUrl in windows. This token is retrieved after registering against GCM/iOS/WNS from device.
- platform       : Platform refers to GCM(for Android), APNS(for iOS) and WNS(for Windows)
- createdMode    : This is for identifying through where registration of device is done. This is a string value and can be anything. eg: SDK, API.
- isBlackListed  : This will denote whether a particular device is enabled for push notification
- apikey         : apiKey can be retrieved from VCAPS of developer bounded application. apiKey needs to be passed in header for all API requests.


## PushNotification Service API

## POST /devices

- Creates a new device registration with the PushNotification service. The device registrations happens from the device. The deviceId is the unique ID for the device for the application.
- apiKey required in headers.
- Body parameters for request are deviceId, userId, deviceToken, platform and createdMode. Mandatory parameters in the request are deviceId, deviceToken and platform.

      ```
       Eg for JSON body
       {
         "deviceId": "7654g67hhgt5433",
         "userId": "testuser001",
         "deviceToken": "765686eab297cc261cad2708553b2e6479824aed824f506219a5c9sdcfsd33485b31d01239997676",
         "platform": "GCM",
         "createdMode": "SDK",
         "isBlackListed" : false
       }
      ```

### Request

| Body  |                  Description                                                          |
|--------------|---------------------------------------------------------------------------------------|
| body  | {"deviceId":"7654g67hhgt5433","userId":"testuser001","deviceToken":"765686eab297cc261cad2708553b2e6479824aed824f506219a5c9sdcfsd33485b31d01239997676","platform":"GCM","createdMode":"SDK","isBlackListed" : false}    |

| Header  |                  Description                                                          |
|--------------|---------------------------------------------------------------------------------------|
| apiKey  |  apiKey can be retrieved from VCAPS of developer bounded application. apiKey needs to be passed in header for all API requests. |


### Response

| HTTP status        |      Description                          |
|----------------|--------------------------------------|
| 200   | During successful device registration  |
| 400   | During failure or update requires for a device  |


## GET /devices

- This api will fetch information of all the devices which is registered to our server.
- apiKey required in headers.

### Request

| Header  |                  Description                                                          |
|--------------|---------------------------------------------------------------------------------------|
| apiKey  |  apiKey can be retrieved from VCAPS of developer bounded application. apiKey needs to be passed in header for all API requests. |

### Response

| body         |      Description                          |
|----------------|--------------------------------------|
| userId   | The userId is the unique user ID for the user for the application  |
| deviceId   | The deviceId is the unique ID for the device for the application |
| platform   | Platform refers to GCM(for Android), APNS(for iOS) and WNS(for Windows)|
| createdTime   | The time at which the device is registered in the server|
| lastUpdatedTime   | The time at which the device registration details is updated in the server|
| createdMode   | This is for identifying through where registration of device is done. This is a string value and can be anything. eg: SDK, API.|
| isBlackListed   | This will denote whether a particular device is enabled for push notification|


      ```
       Eg for response JSON body
       [
         {
           "userId": "Notepad",
           "deviceId": "wnsPhoneTest001",
           "platform": "WNS",
           "createdTime": "2016-08-01T11:16:18.051Z",
           "lastUpdatedTime": "2016-08-01T11:19:18.051Z",
           "createdMode": "API",
           "isBlackListed": false
         },
         {
           "userId": "LGE Nexus 5",
           "deviceId": "358239056043849",
           "platform": "GCM",
           "createdTime": "2016-08-02T06:30:48.837Z",
           "lastUpdatedTime": "2016-08-01T11:19:18.051Z",
           "createdMode": "API",
           "isBlackListed": false
         },
         {
           "userId": "gcm_Device",
           "deviceId": "gcmtest001",
           "platform": "GCM",
           "createdTime": "2016-08-04T13:32:15.618Z",
           "lastUpdatedTime": null,
           "createdMode": "API",
           "isBlackListed": false
         }
       ]
      ```

## PUT /devices/:deviceid

- This api is used to update the registered device details in the server  .
- apiKey required in headers.
- The possible Body parameters are userId,deviceToken and isBlackListed
- In the path parameter you have to pass the deviceID of the device which has to be updated

### Request

| Body  |                  Description                                                          |
|--------------|---------------------------------------------------------------------------------------|
| body  | {"userId":"testuser001","deviceToken":"765686eab297cc261cad2708553b2e6479824aed824f506219a5c9sdcfsd33485b31d01239997676","isBlackListed" : false}    |

| Header  |                  Description                                                          |
|--------------|---------------------------------------------------------------------------------------|
| apiKey  |  apiKey can be retrieved from VCAPS of developer bounded application. apiKey needs to be passed in header for all API requests. |


      ```
       Eg for JSON requestbody
       {
       	"userId"		: "LGE Nexus 5",

       }
      ```

### Response

| HTTP status        |      Description                          |
|----------------|--------------------------------------|
| 200   | During successful device registration  |
| 400   | During failure or update requires for a device  |



## DELETE /devices/:deviceId

- This api is used to delete the registered device details in the server  .
- apiKey required in headers.
- In the path parameter you have to pass the deviceID of the device which has to be deleted

### Request

| Header  |                  Description                                                          |
|--------------|---------------------------------------------------------------------------------------|
| apiKey  |  apiKey can be retrieved from VCAPS of developer bounded application. apiKey needs to be passed in header for all API requests. |

### Response

| HTTP status        |      Description                          |
|----------------|--------------------------------------|
| 200   | During successful device deletion  |
| 400   | During failure of delete operation  |

## POST /fileUpload

- This api is used to upload the p12 certificate of APNS  settings.
- apiKey, passphrase and p12 certificate has to be send as body


### Request

| body  |                  Description                                                          |
|--------------|---------------------------------------------------------------------------------------|
| apiKey  |  apiKey can be retrieved from VCAPS of developer bounded application. apiKey needs to be passed in header for all API requests. |
| passPhrase  | Password of the P12 certificate |
| p12   | p12 certificate has to be uploaded as multipart data for APNS settings. |

### Response

| HTTP status        |      Description                          |
|----------------|--------------------------------------|
| 200   | During successful upload  |
| 400   | During failure of upload operation  |


## POST /notify

- This api is used to notify the devices which is registered to the server
- apiKey required in headers
- The possible Body parameters are message,deviceId,settings - sound,badge,payload ...


### Request

| Body  |                  Description                                                          |
|--------------|---------------------------------------------------------------------------------------|
| body  | {"message":"This is from postman - test1","deviceId":["B8DDF72E-5640-4CAC-A975-79CDA31771A4"],"settings":{"gcm":{"sound":"ping.aiff","badge":3,"payload":{"sample":"message for APNS"}}}}   |

| Header  |                  Description                                                          |
|--------------|---------------------------------------------------------------------------------------|
| apiKey  |  apiKey can be retrieved from VCAPS of developer bounded application. apiKey needs to be passed in header for all API requests. |


### Response

| HTTP status        |      Description                          |
|----------------|--------------------------------------|
| 202   | Accepted to send push notification. Notification will be sent if all settings are available  |
| 400   | If no devices found for sending push notifications  |



- Pending APIs

## POST /notify/bulk, /apnssettings
## PUT /gcmsettings, /wnssettings
## DELETE  /apnssettings, /gcmsettings, /wnssettings


## POST /createchannel

- This api is used to create a channel
- apiKey & channelName are required in headers
- channeldescription is optional in headers

### Request

| Header  |                  Description                                                          |
|--------------|---------------------------------------------------------------------------------------|
| apiKey  |  apiKey can be retrieved from VCAPS of developer bounded application. apiKey needs to be passed in header for all API requests. |
| channelName  | name of the channel to create. |
| channeldescription  | description of the channel to create. |

### Response

| HTTP status        |      Description                          |
|----------------|--------------------------------------|
| 200   | Successfully created channel.  |
| 400   | If some error occurs while creating channel.  |


## PUT /updatechannel

- This api is used to update channel description
- apiKey & channeldescription are required in headers

### Request

| Header  |                  Description                                                          |
|--------------|---------------------------------------------------------------------------------------|
| apiKey  |  apiKey can be retrieved from VCAPS of developer bounded application. apiKey needs to be passed in header for all API requests. |
| channeldescription  | description of the channel to update. |

### Response

| HTTP status        |      Description                          |
|----------------|--------------------------------------|
| 200   | Successfully updated channel.  |
| 400   | If some error occurs while updating the channel.  |


## DELETE /deletechannel

- This api is used to delete channel
- apiKey & channelName are required in headers

### Request

| Header  |                  Description                                                          |
|--------------|---------------------------------------------------------------------------------------|
| apiKey  |  apiKey can be retrieved from VCAPS of developer bounded application. apiKey needs to be passed in header for all API requests. |
| channelName  | name of the channel to delete. |

### Response

| HTTP status        |      Description                          |
|----------------|--------------------------------------|
| 200   | Successfully deleted channel.  |
| 400   | If some error occurs while deleting the channel.  |


## PUT /subscribe

- This api is used to subscribe the device to a channel
- apiKey, channelName & deviceID are required in headers

### Request

| Header  |                  Description                                                          |
|--------------|---------------------------------------------------------------------------------------|
| apiKey  |  apiKey can be retrieved from VCAPS of developer bounded application. apiKey needs to be passed in header for all API requests. |
| channelName  | name of the channel to subcribe. |
| deviceID  | deviceID for channel subcription. |

### Response

| HTTP status        |      Description                          |
|----------------|--------------------------------------|
| 200   | Successfully subcribed to a channel.  |
| 400   | If some error occurs while subcribing to channel.  |


## DELETE /unsubscribe

- This api is used to unsubscribe the device from a channel
- apiKey, channelName & deviceID are required in headers

### Request

| Header  |                  Description                                                          |
|--------------|---------------------------------------------------------------------------------------|
| apiKey  |  apiKey can be retrieved from VCAPS of developer bounded application. apiKey needs to be passed in header for all API requests. |
| channelName  | name of the channel to unsubcribe. |
| deviceID  | deviceID to unsubscribe from a channel. |

### Response

| HTTP status        |      Description                          |
|----------------|--------------------------------------|
| 200   | Successfully unsubcribed from a channel.  |
| 400   | If some error occurs while unsubscribing from a channel.  |


## POST /pushNotifyToChannel

- This api is used to notify the devices which is registered to the channel
- apiKey required in headers
- The possible Body parameters are channelname,message,settings - sound,badge,payload ...


### Request

| Body  |                  Description                                                          |
|--------------|---------------------------------------------------------------------------------------|
| body  | {"channelname":"mychannel","message":"This is from postman - test1","settings":{"gcm":{"sound":"ping.aiff","badge":3,"payload":{"sample":"message for APNS"}}}}   |

| Header  |                  Description                                                          |
|--------------|---------------------------------------------------------------------------------------|
| apiKey  |  apiKey can be retrieved from VCAPS of developer bounded application. apiKey needs to be passed in header for all API requests. |


### Response

| HTTP status        |      Description                          |
|----------------|--------------------------------------|
| 202   | Accepted to send push notification. Notification will be sent if all settings are available  |
| 400   | If no devices found for sending push notifications  |


## GET /getChannels

- This api is used to get channels info
- apiKey is required in headers

### Request

| Header  |                  Description                                                          |
|--------------|---------------------------------------------------------------------------------------|
| apiKey  |  apiKey can be retrieved from VCAPS of developer bounded application. apiKey needs to be passed in header for all API requests. |

### Response

| HTTP status        |      Description                          |
|----------------|--------------------------------------|
| 200   | channels data  |
| 400   | If some error occurs while getting the channels data.  |
