# FHIR CRUD Operations
###### tags: `fhir-project` `CRUD`

## Table of Contents
[TOC]

## Introduction

This page outlines how to use the FHIR Endpoint to perform basic CRUD (Create/Read/Update/Delete) Operations.

I’m going to share a step-by-step how this system works:
* User: How to use the FHIR CRUD system ([Demo](http://203.64.84.150:51888/user4/fhirproj/CRUD/html/Create.html))
* Developer: How to use Javascript XMLHttpRequest to perform FHIR CRUD Operations ([Source Code](https://github.com/victoriatjia/FHIR_CRUD))

-----------------------------
## Developer Version
### The XMLHttpRequest Object
The XMLHttpRequest object can be used to exchange data with a server behind the scenes. This means that it is possible to update parts of a web page, without reloading the whole page.

### XMLHttpRequest Object Methods

| Method | Description |
| --- | --- |
| new XMLHttpRequest() | Creates a new XMLHttpRequest object |
| open(_method,url,async,user,psw_) | Specifies the request <br> _method_: the request type (**GET/POST/PUT/DELETE**) <br>_url_: the file location <br>_async_: true (asynchronous) or false (synchronous)   <br>_user_: optional user name <br>_psw_: optional password
| send() | Sends the request to the server (Used for **GET** and **DELETE** requests) |
| send(_string_) | Sends the request to the server (Used for **POST** and **PUT** requests) | 
setRequestHeader(header, value) | Adds HTTP headers to the request    <br>_header_: specifies the header name  <br>_value_: specifies the header value
 |

### XMLHttpRequest Object Properties

| Property | Description |
| --- | --- |
| onreadystatechange | Defines a function to be called when the readyState property changes |
| readyState | Holds the status of the XMLHttpRequest.  <br> 0: request not initialized  <br> 1: server connection established  <br> 2: request received  <br> 3: processing request  <br> 4: request finished and response is ready |
| responseText | Returns the response data as a string |
| responseXML | Returns the response data as XML data |
| status | Returns the status-number of a request  <br> 200: "OK"  <br> 403: "Forbidden"  <br> 404: "Not Found"  <br> For a complete list go to the [Http Messages Reference](https://www.w3schools.com/tags/ref_httpmessages.asp) |
| statusText | Returns the status-text (e.g. "OK" or "Not Found") |

In addition, **POST/PUT/GET/DELETE** are using the same xmlhttp function to perform the operations. The main different is in:

| Method | Open request function  | Send request function |
| -------- | -------- | -------- |
| POST     | xhttp.open("POST", url, true)     | xhttp.send(string)|
| PUT     | xhttp.open("PUT", url, true)     | xhttp.send(string);|
| GET     | xhttp.open("GET", url, true)     | xhttp.send()|
| DELETE     | xhttp.open("DELETE", url, true)     | xhttp.send()|

When we want to **open request**, we need to **specifies** what **kind** of **action** we want to **request** (POST/PUT/GET/DELETE). 
As for **sending request**, since **POST** (upload data) and **PUT** (update data) both need to **write** or perform **change** to the **data**, thus it need to **include** the **string of data** we want to write/change. In **GET** and **DELETE**, we only want to **read** or **delete** the **data**, so **no need** to send the **string of data** since we can obtain it by using the resource ID.

Now we can see the function content and I'll explain line by line for the HTTP POST only, since the other function method is just having exact same function format.
#### HTTP POST
**Function name**: postResource
**Description**: Send data to server
 **Parameter**:
 *  URL: Server path
*  ResourceName: FHIR Resource type
*  Parameter: Filter parameter to search
*  ReponseType: Requested data type returned by the server (json or xml)
*  AfterFun: The function to be executed after the data is obtained
*  RequestData: Parameter to be send to server

``` gherkin=
function postResource(URL, ResourceName, Parameter, ResponseType, AfterFun, RequestData){
    var url = URL + ResourceName + Parameter;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", 'text/' + ResponseType);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var str = this.response;
            eval(AfterFun)(str);
            return str;
        }
        else if(this.readyState == 4 && this.status != 200){    
            retValue(this.response);
        }
    };
    xhttp.send(RequestData);
}
```
Description:
> **Line 2**: Define a FHIR URL with format: [FHIR Server URL]/[ResourceType]/[Parameter]
> **Line 5**: For the header request, we usually only define the "ContentType" header, the value is requested as we need, it can be "json" or "xml"
> **Line 7-8**: When request complete (readyState=4 and status=200), then we obtain the response value (this.response) and store it into variable "str"
> **Line 9**: Next we will continue by performing the next function we want using the "eval" function along by passing the "str" variable. Eval function is used to convert string to JavaScript function code for execution. It will take the string variable called "AfterFun" and see it as a function instead of a string.
> **Line 12-13**: If the request is failed (readyState=4 and status!=200), we will continue perform "retValue" function for alert some message box so the user aware of current situation. 


#### HTTP PUT
**Function name**: putResource
**Description**: Update data to server
 **Parameter**:
*  URL: Server path
*  ResourceName: FHIR Resource type
*  Parameter: Filter parameter to search
*  ReponseType: Requested data type returned by the server (json or xml)
*  AfterFun: The function to be executed after the data is obtained
*  RequestData: Parameter to be send to server

``` gherkin=
function deleteResource(URL, ResourceName, Parameter, AfterFun){
    var url = URL + ResourceName + Parameter;
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader("Content-type", 'text/' + ResponseType);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var str = this.response;
            eval(AfterFun)(str);
            return str;
        }
        else if(this.readyState == 4 && this.status != 200){    
            retValue(this.response);
        }
    };
    xhttp.send(RequestData);
}
```

#### HTTP GET
**Function name**: getResource
**Description**: Query data from server
 **Parameter**:
*  URL: Server path
*  ResourceName: FHIR Resource type
*  Parameter: Filter parameter to search
*  ReponseType: Requested data type returned by the server (json or xml)
*  AfterFun: The function to be executed after the data is obtained

``` gherkin=
function getResource(URL, ResourceName, Parameter, ResponseType, AfterFun, RequestData){
    var url = URL + ResourceName + Parameter;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", 'text/' + ResponseType);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var str = this.response;
            eval(AfterFun)(str);
            return str;
        }
        else if(this.readyState == 4 && this.status != 200){    
            retValue(this.response);
        }
    };
    xhttp.send();
}
```
#### HTTP DELETE
**Function name**: deleteResource
**Description**: Delete data in server
 **Parameter**:
*  URL: Server path
*  ResourceName: FHIR Resource type
*  Parameter: Filter parameter to search
*  AfterFun: The function to be executed after the data is obtained

``` gherkin=
function deleteResource(URL, ResourceName, Parameter, AfterFun){
    var url = URL + ResourceName + Parameter;
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", url, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var str = this.response;
            eval(AfterFun)(str);
            return str;
        }
        else if(this.readyState == 4 && this.status != 200){    
            retValue(this.response);
        }
    };
    xhttp.send(RequestData);
}
```
