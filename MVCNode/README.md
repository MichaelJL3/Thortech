
# ThortechMVCAPI

[![Mysql][mysql]](https://www.mongodb.com/)
[![Nodejs][node]](https://nodejs.org/en/)

[node]:  public/icons/nodejs-icon-medium.png "Nodejs"
[mysql]: public/icons/mysql-icon-medium.png "Mysql"

[nodesmall]:  public/icons/nodejs-icon-small.png "Nodejs"
[mysqlsmall]: public/icons/mysql-icon-small.png "Mysql"

> We can only see a short distance ahead, but we can see plenty that needs to be done.
>
**Alan Turing**

## Description

V 1.0
A RESTful API for Thortech interview project

Handles Database interactions for managing interactions with
the master and detail tables of the Thortech DB

uses a modelled approach for displaying relations between the data

Currently acts as the **Controller** and the **Model** the view is handled
through proxied ajax connections to a react client

## Index

Table Of Contents
+ [Routes](#routes "Server Routing Components")
+ [DevStack](#backend-stack "Technologies Used In The Development/Production Of The Backend")
+ [Protocols](#request-response "Communication Protocols")
+ [Errors](#error-handling "How To Handle Errors")
+ [Database](#database "Database Configuration/Tables/Schemes")
+ [Config](#config "Server Configuration Files")

## Backend Stack

[![Mysql][mysqlmall]](https://www.mysql.com/)
[![Nodejs][nodesmall]](https://nodejs.org/en/)

The Backend API Stack is developed using **Nodejs** and the **express** library.
The API uses **Mysql** as a datastore.
The server itself is kept running by [pm2](http://pm2.keymetrics.io/). Pm2 keeps the service up and running forever and **restarts** in the case of **crashes**. It also generates logs and separates logs into categories of **success** and **failure**

## Routes

Routes, are components (express routers) for handling specific requests with an associated field.
each router has and each route handles the clients request and response. Routes must have unique names based on their **HTTP** verb `post('new')` and `get('new')` are ok `post('new')` and `post('new')` are not ok even if located in different routers (obviously attached to the same app).

All the routes currently return JSON formatted Data holding the result of the interaction

## Request-Response

Requests must be sent as AJAX style requests,
**GET** is a supported operation only for the data grabbing.
Current HTTP verbs supported for data manipulation are
**PUT**, **DELETE**, and **POST**.

The request must satisfy **CORS** or else the request 
will be denied by the server.

The server will respond with json data displaying
any relevant data

return data can be found in the **Object.data** field
any errors can be found as **Object.error**
if **dev-mode** is enabled a full error stack is also available as **Object.errorStack**, note not all errors will return an error stack, these occur from thrown errors. Many errors may come from bad requests which are immediately returned with messages and are not thrown.

all return codes display information about the validity of a request
(ex: 400) return means the data sent most likely did not meet validation standards

```javascript
/**
* @name Status
* @desc list of potential status codes 
*/
exports.Status={
    CLIENT:     400,
    OK:         200,
    CREATED:    201,
    NODATA:     204,
    SERVER:     500
};
```

## Error Handling

For errors, check the server logs

The server should not crash for most errors, as many promise rejections are captured. and handled by both middleware and the request logic. 
In the case of a server crash check the logs.

The logs can be checked by using the **pm2** commands: [pm2](http://pm2.keymetrics.io/)

## Database

[![Mysql][mysqlsmall]](https://www.mysql.com/)

The backend uses **Mysql** as its primary datastore.

The Database consists of currently 2 tables
+ [masterTable](#master-table "Scheme For Parent Data")
+ [detailTable](#detail-table "Scheme For Child Data")

### Master Table
Stores data for parent elements
    
```mysql
CREATE TABLE Thortech.masterTable (
	ID int NOT NULL AUTO_INCREMENT,
	value varchar(100) NOT NULL,
	PRIMARY KEY(ID)
);
```

### Detail Table
Stores data for child elements
    
```mysql
CREATE TABLE Thortech.detailTable (
	ID int NOT NULL AUTO_INCREMENT,
	masterID int NOT NULL,
	value varchar(100) NOT NULL,
	PRIMARY KEY(ID)	
);
```

## Config

The server configuration is located in the [config.js](config/config.js) file.

There is the physical server configuration which is part of the startup script
in [bin/www](bin/www)

application entry point and startup middleware is located in [app.js](app.js),
