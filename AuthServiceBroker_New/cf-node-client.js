/**
 * CfNodeClient  Client application which will connect to the
 * cloud and do the equivalent cli command operations
 *
 */

'use strict';

var commonUtilsObj = require('./middlelayer/commonUtils.js');
var config = require('../config.json');

var CfNodeClient = function () {
};


// this api will clone the code from git and pushes it to cloud foundry
CfNodeClient.prototype.pushApp = function (options, callback) {
    //forming JSON object for login request
    options["url"] = config.loginProtocol + config.username + config.pass + config.password;
    options["contentType"] = config.contentType;
    options["charSet"] = config.charSet;
    options["authorization"] = config.authorization;
    options["endpoint"] = config["endpoint"];
    options["domain_guid"] = config["domain_guid"];
    options["space_guid"] = config["space_guid"];
    options["zippedPath"] = process.cwd() + config.microservicePath + '/' + config.appZip;

    var pushAppCallback = function (error,result) {
      if (error) {
          callback(error);
      }
      else {
          callback(null,result);
      }
    };
    commonUtilsObj.pushApp(options,pushAppCallback);
};

// this api will delete the service app from cloud foundry
CfNodeClient.prototype.deleteApp = function (options, callback) {
    options["url"] = config.loginProtocol + config.username + config.pass + config.password;
    options["contentType"] = config.contentType;
    options["charSet"] = config.charSet;
    options["authorization"] = config.authorization;

    var deleteAppCallback = function (error,result) {
        if (error) {
            callback(error);
        }
        else {
            callback(null,result);
        }
    };
    commonUtilsObj.deleteApp(options,deleteAppCallback);
};


module.exports = CfNodeClient;
