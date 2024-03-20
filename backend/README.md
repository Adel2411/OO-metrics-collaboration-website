

# Authentication



## Login

	POST  http://localhost:8080/api/v1/auth/login
	Content-Type: application/json
	{
	  "username": "",
	  "password": ""
	}

## Register

	POST http://localhost:8080/api/v1/auth/register
	Content-Type: application/json
	{
	  "username": "",
	  "email": "",
	  "password": ""
	}

## Verify a Token

	POST  http://localhost:8080/api/v1/auth/verify
	Content-Type: application/json
	{
	  "token" : ""
	}

## Extract a username

	POST  http://localhost:8080/api/v1/auth/getuser
	Content-Type: application/json
	{
	  "token" : ""
	}




# Metrics

## Get all Metrics

	GET  http://localhost:8080/api/v1/app/metrics
	
	
## Add a Metric

	POST  http://localhost:8080/api/v1/app/add/metric
	Content-Type: application/json
	{
	  "name" : ""
	}




# Implementations

## Get all Implementations

	GET  http://localhost:8080/api/v1/app/codeimplementation
	
## Add an Implementation

	POST  http://localhost:8080/api/v1/app/codeimplementation
	Content-Type: application/json
	{
	  "research_id": "",
	  "code": ""
	}



# Researches

## Get all Researches

	GET  http://localhost:8080/api/v1/app/research
	
	
## Add a Research

	POST  http://localhost:8080/api/v1/app/add/research
	Content-Type: application/json
	{
	  "metricId": "",
	  "mathFormula": "",
	  "description": ""
	}


