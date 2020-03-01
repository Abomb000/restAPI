# restAPI
### Installation:
```ssh
docker-compose up --build
```

### Test:
```ssh
npm test
```

#### Settings:
Basic configuration "app/config/config.js"

    PORT                       -> application port
    mysqlDB: {
        "host": "127.0.0.1",   -> mysql host
        "user": "root",        -> mysql user
        "password": "toor",    -> mysql password
        "database": "test",    -> mysql database
        "tbl":"dataSet"        -> mysql table
    },
    allowedTypes:['temperature','pressure','volume'] (allowed data types)

### API CRUD:
Endpoint URL: 
    
    http://[HOST]:3005/data

* By GET request returned all data from db 
```sh
$ curl -i -H 'Accept: application/json' http://[HOST]/data
```  
```js
var URL="http://[HOST]/data";

var xhr = new XMLHttpRequest();
xhr.open('GET', URL, true);
xhr.responseType = 'json';
xhr.onload = function() {
	console.log(xhr.status);
	console.log(xhr.response);
};
xhr.send();
```
Create a new record POST request:

    Required fields:
        type        --> One of allowed types:(temperature|pressure|volume)
        value       --> Numerical value
        *timestamp  --> if the time not provided,the time will be automatically added 
        
Time format example:

    'Sun, 01 Mar 2020 09:46:37 GMT' (can be used any time format supported by moment)
    '1583055997' can be regular unix timestamp
    ***if you using js divide value by 1000***
    
        
Create Example:
```sh
$ curl -i -H 'Accept: application/json' -d 'firstName=John&lastName=Doe&email=abuse@gmail.com' http://localhost/api/students
```  
```js
var URL="http://[HOST]/data";

var xhr = new XMLHttpRequest();
xhr.open('POST', URL, true);
xhr.responseType = 'json';
xhr.onload = function() {
	console.log(xhr.status);
	console.log(xhr.response);
};
xhr.send(JSON.stringify({ "type": "pressure", "value": "22","timestamp": "1583055997" }));

```

GET record by ID example:
```sh
$ curl -i -H 'Accept: application/json' http://[HOST]/data/[recordID]
```  
```js
var recordID=1;

var URL="http://[HOST]/data/"+recordID;

var xhr = new XMLHttpRequest();
xhr.open('GET', URL, true);
xhr.responseType = 'json';
xhr.onload = function() {
	console.log(xhr.status);
	console.log(xhr.response);
};
xhr.send();
```

Update record by ID Example:
```sh
$ curl -i -H 'Accept: application/json' -d 'type=volume&value=3&timestamp=1583055997' http://[HOST]/data/1
```  
```js
var recorID="1";
var URL="http://[HOST]/data/"+recorID;

var xhr = new XMLHttpRequest();
xhr.open('PUT', URL, true);
xhr.responseType = 'json';
xhr.onload = function() {
	console.log(xhr.status);
	console.log(xhr.response);
};
xhr.send(JSON.stringify({ "type": "volume", "value": "3","timestamp": "1583055997" }));

```


Delete record by ID Example:
```sh
$ curl -i -H 'Accept: application/json' -X DELETE http://[HOST]/data/1
```  
```js
var recorID="1";
var URL="http://[HOST]/data/"+recorID;

var xhr = new XMLHttpRequest();
xhr.open('DELETE', URL, true);
xhr.responseType = 'json';
xhr.onload = function() {
	console.log(xhr.status);
	console.log(xhr.response);
};
xhr.send();

```


### formula API:
Endpoint URL: 
    
    http://[HOST]:3005/formula
    
Supported conditions:
    
    <
    >
    or
    and
    {fieldName}
    

##### * The response is true or false

    
Structure examples:
```
{temperature} > 50 or {pressure} < 80 or {volume} < 100
{volume} < 1
```

Request example:
```
http://[HOST]:3005/formula?q={temperature}%20%3C%201
```
Response example:
```
{"result":false}
```