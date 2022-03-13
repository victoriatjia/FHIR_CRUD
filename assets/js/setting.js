/*
    Public variable area
    FHIRURL:FHIR Server URL
    FHIRResponseType:Requested data type returned by the server
*/
var FHIRURL =  'https://hapi.fhir.org/baseR4/';	//default FHIR Server API
var ResponseType= 'json';

//Page initialization: Show FHIR resource type drop down list
$(document).ready(function(){
	var temp="";
	var resourceType= ['Patient','Appointment','Bundle','Composition','Consent','Person','Organization','DiagnosticReport','DocumentReference','Condition',
					'Observation','Encounter','PlanDefinition','Practitioner','PractitionerRole','Location','Schedule','ServiceRequest','Slot','ImagingStudy','MessageHeader'];		
	resourceType.sort();
	for(const res of resourceType){
		temp+= "<option>" + res + "</option>";
	}
	document.getElementById("resourceType").innerHTML= temp;
	document.getElementById("FHIRServer").value= FHIRURL;
});

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