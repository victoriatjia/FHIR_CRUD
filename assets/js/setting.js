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
	var resourceType= ['Questionnaire', 'QuestionnaireResponse', 'Immunization', 'Group','Menu','Library', 'List', 'Patient','Appointment','Bundle','Composition','Consent','Person','Organization','DiagnosticReport','DocumentReference','Condition',
					'Observation','Encounter','PlanDefinition','Practitioner','PractitionerRole','Location','Schedule','ServiceRequest','Slot','ImagingStudy','MessageHeader'];		
	resourceType.sort();
	for(const res of resourceType){
		temp+= "<option>" + res + "</option>";
	}
	document.getElementById("resourceType").innerHTML= temp;
	document.getElementById("FHIRServer").value= FHIRURL;
});