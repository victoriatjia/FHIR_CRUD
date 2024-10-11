/*
    Public variable area
    FHIRURL: FHIR Server URL
    FHIRResponseType: Requested data type returned by the server
*/
var FHIRURL=  'https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/';
//'https://hapi.fhir.org/baseR4/';	//default FHIR Server API
var ResponseType= 'json';						//default response type

//Page initialization: Show FHIR Resource Type drop down list
$(document).ready(function(){
	var temp= "";
	var resourceType= [ '... Other Resources', 'Endpoint', 'Immunization', 'Group', 'Menu',
						'Library', 'List', 'Patient', 'Appointment', 'Bundle',
						'Composition', 'Consent', 'Person', 'Organization', 'DiagnosticReport',
						'DocumentReference', 'Condition', 'Observation', 'Encounter', 'PlanDefinition',
						'Practitioner', 'PractitionerRole', 'Location', 'Schedule', 'ServiceRequest',
						'Slot', 'ImagingStudy', 'MessageHeader', 'Questionnaire', 'QuestionnaireResponse', 'RelatedPerson'];		
	resourceType.sort();
	
	//Resoure type code based on sequence number
	var resourceTypeCode= 0;
	for(const res of resourceType){
		temp+= "<option value='" + resourceTypeCode + "'>" + res + "</option>";
		resourceTypeCode++;
	}
	
	document.getElementById("resourceType").innerHTML= temp;
	document.getElementById("FHIRServer").value= FHIRURL;
});