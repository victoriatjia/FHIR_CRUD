/*
    getResource(URL, ResourceName, Parameter, ResponseType, AfterFun)
    @desc： Query data from server
    @param：
        URL： Server path
        ResourceName： FHIR Resource type
        Parameter： Filter parameter to search
        ReponseType： Requested data type returned by the server (json or xml) (json or xml)
        AfterFun：The function to be executed after the data is obtained
*/
function getResource(URL, ResourceName, Parameter, ResponseType, AfterFun){
    //The complete URL to request data from FHIR Server
    var url = URL + ResourceName + Parameter;
    //Using XMLHttpRequest component to interact with the server
    var xhttp = new XMLHttpRequest();
    /*
        xhttp.open(method, url, async)
        @desc： Initialize components
        @param： 
            method： Using HTTP "GET" method
            url： Request path
            async： synchronously(true) or asynchronously(false)
    */
    xhttp.open("GET", url, true);
    /*
        xhttp.setRequestHeader(header, value)
        @desc： Set the value of the HTTP header
        @param：
            header： Header name
            value： Header value
    */
    xhttp.setRequestHeader("Content-type", 'text/' + ResponseType);
    /*
        xhttp.onreadystatechange = callback;
        @desc：Stores a function to be called automatically each time the readyState property changes
    */
    xhttp.onreadystatechange = function () {
        /*
            this.readyState
            @desc： Return the current status of the XMLHttpRequest
            @value：
				0: request not initialized
				1: server connection established
				2: request received (can obtained header & status)
				3: processing request
				4: request finished and response is ready
        */
        /*
            this.status
            @desc：HTTP status messages that might be returned
            @value：
                0：UNSENT or OPENED
                200：LOADING or DONE
				403:FORBIDDEN
				404:PAGE NOT FOUND
        */
        if (this.readyState == 4 && this.status == 200) 
		{
            var str = this.response;
            /*
                eval(string)
                @desc： Convert string to JavaScript function code for execution
            */
            eval(AfterFun)(str);
            return str;
        }
		else if(this.readyState == 4 && this.status != 200)
		{
			retValue(this.response);
		}  
    };
    /*
        xhttp.send()
        @desc： Send a request to the specified server path
    */
    xhttp.send();
}

/*
    postResource(URL, ResourceName, Parameter, ResponseType, AfterFun, RequestData)
    @desc： Send data to server
    @param：
        URL： Server path
        ResourceName： FHIR Resource type
        Parameter： Filter parameter to search
        ReponseType： Requested data type returned by the server (json or xml) (json or xml)
        AfterFun：The function to be executed after the data is obtained
		RequestData: Parameter to be send to server
*/

function postResource(URL, ResourceName, Parameter, ResponseType, AfterFun, RequestData){
    //The complete URL to request data from FHIR Server
    var url = URL + ResourceName + Parameter;
    //Using XMLHttpRequest component to interact with the server
    var xhttp = new XMLHttpRequest();
    /*
        xhttp.open(method, url, async)
        @desc： Initialize components
        @param： 
            method： Using HTTP "POST" method
            url： Request path
            async： synchronously(true) or asynchronously(false)
    */
    xhttp.open("POST", url, true);
    /*
        xhttp.setRequestHeader(header, value)
        @desc： Set the value of the HTTP header
        @param：
            header： Header name
            value： Header value
    */
	if (ResponseType!="")
		xhttp.setRequestHeader("Content-type", 'text/' + ResponseType);
    /*
        xhttp.onreadystatechange = callback;
        @desc：Stores a function to be called automatically each time the readyState property changes
    */
    xhttp.onreadystatechange = function () {
        /*
            this.readyState
            @desc： Return the current status of the XMLHttpRequest
            @value：
				0: request not initialized
				1: server connection established
				2: request received (can obtained header & status)
				3: processing request
				4: request finished and response is ready
        */
        /*
            this.status
            @desc：HTTP status messages that might be returned
            @value：
                0：UNSENT or OPENED
                200：LOADING or DONE
				403:FORBIDDEN
				404:PAGE NOT FOUND
        */
        if (this.readyState == 4 && (this.status == 200 ||　this.status == 201)) 
		{
            var str = this.response;
            //alert(str);
			/*
                eval(string)
                @desc： Convert string to JavaScript function code for execution
            */
			eval(AfterFun)(str);
			return str;
        }
		else if(this.readyState == 4 && (this.status != 200　|| this.status != 201))
		{
			retValue(this.response);
		}  
    };
    /*
        xhttp.send()
        @desc： Send a request to the specified server path
    */
    xhttp.send(RequestData);
}

/*
    putResource(URL, ResourceName, Parameter, ResponseType, AfterFun, RequestData)
    @desc： Update data to server
    @param：
        URL： Server path
        ResourceName： FHIR Resource type
        Parameter： Filter parameter to search
        ReponseType： Requested data type returned by the server (json or xml)
        AfterFun：The function to be executed after the data is obtained
		RequestData: Parameter to be send to server
*/
function putResource(URL, ResourceName, Parameter, ResponseType, AfterFun, RequestData){
    //The complete URL to request data from FHIR Server
    var url = URL + ResourceName + Parameter;
    //Using XMLHttpRequest component to interact with the server
    var xhttp = new XMLHttpRequest();
    /*
        xhttp.open(method, url, async)
        @desc： Initialize components
        @param： 
            method： Using HTTP "PUT" method
            url： Request path
            async： synchronously(true) or asynchronously(false)
    */
    xhttp.open("PUT", url, true);
    /*
        xhttp.setRequestHeader(header, value)
        @desc： Set the value of the HTTP header
        @param：
            header： Header name
            value： Header value
    */
    xhttp.setRequestHeader("Content-type", 'text/' + ResponseType);
    /*
        xhttp.onreadystatechange = callback;
        @desc：建立當readyState狀態改變時執行的部分 Create the part that executes when the readyState status changes
    */
    xhttp.onreadystatechange = function () {
        /*
            this.readyState
            @desc： Return the current status of the XMLHttpRequest
            @value：
				0: request not initialized
				1: server connection established
				2: request received (can obtained header & status)
				3: processing request
				4: request finished and response is ready
        */
        /*
            this.status
            @desc：HTTP status messages that might be returned
            @value：
                0：UNSENT or OPENED
                200：LOADING or DONE
				403:FORBIDDEN
				404:PAGE NOT FOUND
        */
        if (this.readyState == 4 && this.status == 200) 
		{
            var str = this.response;
            /*
                eval(string)
                @desc： Convert string to JavaScript function code for execution
            */
            eval(AfterFun)(str);
            return str;
        }
		else if(this.readyState == 4 && this.status != 200)
		{
			retValue(this.response);
		}
    };
    /*
        xhttp.send()
        @desc： Send a request to the specified server path
    */
    xhttp.send(RequestData);
}


//Delete FHIR Data
function deleteResource(URL, ResourceName, Parameter, AfterFun) {
    //The complete URL to request data from FHIR Server
    var url = URL + ResourceName + Parameter;
    //Using XMLHttpRequest component to interact with the server
    var xhttp = new XMLHttpRequest();
    /*
        xhttp.open(method, url, async)
        @desc： Initialize components
        @param： 
            method： Using HTTP "PUT" method
            url： Request path
            async： synchronously(true) or asynchronously(false)
    */
    xhttp.open("DELETE", url, true);
    /*
        xhttp.onreadystatechange = callback;
        @desc：建立當readyState狀態改變時執行的部分 Create the part that executes when the readyState status changes
    */
    xhttp.onreadystatechange = function () {
        /*
            this.readyState
            @desc： Return the current status of the XMLHttpRequest
            @value：
				0: request not initialized
				1: server connection established
				2: request received (can obtained header & status)
				3: processing request
				4: request finished and response is ready
        */
        /*
            this.status
            @desc：HTTP status messages that might be returned
            @value：
                0：UNSENT or OPENED
                200：LOADING or DONE
				403:FORBIDDEN
				404:PAGE NOT FOUND
        */
		if (this.readyState == 4 && this.status == 200) 
		{
            var str = this.response;
            /*
                eval(string)
                @desc： Convert string to JavaScript function code for execution
            */
            eval(AfterFun)(str);
            return str;
        }
		else if(this.readyState == 4 && this.status != 200)
		{
			retValue(this.response);
		}
    };
	/*
        xhttp.send()
        @desc： Send a request to the specified server path
    */
    xhttp.send();
}

//Check data response is complete or error
function retValue(str){
	var id="", resType="", err="", severity="";	
	if(ResponseType=="json")
	{
		var obj= JSON.parse(str);
		id= obj.id? obj.id :"";
		resType= obj.resourceType? obj.resourceType : "";
		err= obj.issue? obj.issue[0].diagnostics : "";
		severity= obj.issue? obj.issue[0].severity : "";
	}
	else if(ResponseType=="xml")
	{
		if(str.includes("OperationOutcome"))
		{
			resType= "OperationOutcome";
			var temp= str.split('diagnostics value=')[1];  //y.nodeValue; 
			err= temp.split('"')[1];
		}
		else
		{
			var temp= str.split('id value=')[1];  //y.nodeValue; 
			id= temp.split('"')[1];
		}
	}
	
	if(resType=="OperationOutcome" && severity=="information")
		alert('Finished!\n' + err);
	else if(resType=="OperationOutcome")
		alert('Error!\n' + err);
	else
		alert('Finished!\nFHIR Resource ID: ' + id);
	
}