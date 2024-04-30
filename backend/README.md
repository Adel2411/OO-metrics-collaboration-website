
# Authentication

## Login

    POST  http://localhost:8080/api/v1/auth/login
    Content-Type: application/json
    {
      "username": "",
      "password": ""
    }

### Return Structure

    {
    	"status" :
    	"response" : ""
    }

#### Type of responses

| Status | Response                     |
| ------ | ---------------------------- |
| 200    | Jwt Token                    |
| 403    | Invalid Username or Password |

## Register

    POST http://localhost:8080/api/v1/auth/register
    Content-Type: application/json
    {
      "username": "",
      "email": "",
      "password": ""
    }

### Return Structure

    {
    	"status" :
    	"response" : ""
    }

#### Type of responses

| Status | Response                        |
| ------ | ------------------------------- |
| 200    | Jwt Token                       |
| 403    | Email or Username already taken |

## Verify a Token

    POST  http://localhost:8080/api/v1/auth/verify
    Content-Type: application/json
    {
      "token" : ""
    }

### Return Structure

    {
    	"status" :
    	"response" : ""
    }

#### Type of responses

| Status | Response      |
| ------ | ------------- |
| 200    | Valid Token   |
| 403    | Invalid Token |

## Extract a username

    POST  http://localhost:8080/api/v1/auth/getuser
    Content-Type: application/json
    {
      "token" : ""
    }

### Return Structure

    {
    	"status" :
    	"response" : ""
    }

#### Type of responses

| Status | Response      |
| ------ | ------------- |
| 200    | Username      |
| 403    | Invalid Token |

# Metrics

## Get all Metrics

    GET  http://localhost:8080/api/v1/app/metrics

### Return Structure

	{
		"status":  200,
		"data":  
		[
			{
				"id":  "",
				"name":  "",
				"researchId":  "",
				"codeImplementationId":  ""
			},
		]
	}
## Add a Metric

    POST  http://localhost:8080/api/v1/app/add/metric
    Content-Type: application/json
    {
      "name" : ""
    }

### Return Structure

	{
	  "status": ,
	  "data": ""
	}

#### Type of responses

| Status | data                   |
| ------ | -------------------------- |
| 200    | Metric added	                    |
| 403    | metric cannot be added |

## Delete
	DELETE http://localhost:8080/api/v1/app/delete/metric/{id}
	
### Return Structure

	{
	  "status": ,
	  "data": ""
	}

#### Type of responses

| Status | data                   |
| ------ | -------------------------- |
| 200    | Metric deleted                   |
| 403    |failed deleting this metric|


## Update
	PUT http://localhost:8080/api/v1/app/update/metric
	Content-Type: application/json

	{
	  "id": "",
	  "name": ""
	}
	
### Return Structure

	{
	  "status": ,
	  "data": ""
	}

#### Type of responses

| Status | data                   |
| ------ | -------------------------- |
| 200    | Metric updated                  |
| 403    |failed updating this metric|

	
# Implementations

## Get Implementation From Id

    GET  http://localhost:8080/api/v1/app/codeimplementation/{id}

### Return Structure
		
	"status" : 
	"data" :

#### Type of responses

| Status | data                                      |
| ------ | ----------------------------------------------- |
| 200    | [    {        "id": "",        "code": ""    }]                                      |
| 403    | implementation for this research already exists |

## Add an Implementation

    POST  http://localhost:8080/api/v1/app/codeimplementation
    Content-Type: application/json
    {
      "research_id": "",
      "data": ""
    }

### Return Structure

    {
    	"status" :
    	"data" : ""
    }

#### Type of responses

| Status | data                                      |
| ------ | ----------------------------------------------- |
| 200    | id                                              |
| 403    | implementation for this research already exists |

## Update
	PUT http://localhost:8080/api/v1/app/update/codeimplementation
	Content-Type: application/json

	{
	  "id": "",
	  "name": ""
	}
	
### Return Structure

	{
	  "status": ,
	  "data": ""
	}

#### Type of responses

| Status | data                   |
| ------ | -------------------------- |
| 200    | codeimplementation updated                  |
| 403    |failed updating this codeimplementation|

# Researches

## Get Research by id

    GET  http://localhost:8080/api/v1/app/research

### Return Structure

	{
		"status": ,
		"data": 
			
	}

#### Type of responses

| Status | data                            |
| ------ | -------------------------------------- |
| 200   	|"id": ""   ,"description": ""  ,"mathFormula": ""                                     |
| 403    | failed getting research|

## Add a Research

    POST  http://localhost:8080/api/v1/app/add/research
    Content-Type: application/json
	{
	  "Description": "",
	  "MathFormula": "",
	  "MetricId": ""
	}

### Return Structure

    {
    	"status" :
    	"data" : 
    }
    
   ### Type of Response

| Status | data                            |
| ------ | -------------------------------------- |
| 200   	|Research added Successfully                                    |
| 403    | failed getting research|

## Update
	PUT http://localhost:8080/api/v1/app/update/research
	Content-Type: application/json

	{
	  "id": "",
	  "name": ""
	}
	
### Return Structure

	{
	  "status": ,
	  "data": ""
	}

#### Type of responses

| Status | data                   |
| ------ | -------------------------- |
| 200    | research updated                  |
| 403    |failed updating this research|

# Document

## Get all Documents

    GET  http://localhost:8080/api/v1/app/documents

### Return Structure
	
	"stataus" : 
	"data" : 
   ### Type of Response

| Status | data                            |
| ------ | -------------------------------------- |
| 200   	|[{ "metricName":  "", "researchDescription":  "", "metricMathFormula":  "",  "code":  ""  }  ]                                    |
| 403    | failed getting documents|

