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

    [
    	{
    		"id" :  "",
    		"name":  ""
    	}
    ]

## Add a Metric

    POST  http://localhost:8080/api/v1/app/add/metric
    Content-Type: application/json
    {
      "name" : ""
    }

### Return Structure

    {
    	"status" :
    	"response" : ""
    }

#### Type of responses

| Status | Response                   |
| ------ | -------------------------- |
| 200    | id                         |
| 403    | Metric name already exists |

# Implementations

## Get all Implementations

    GET  http://localhost:8080/api/v1/app/codeimplementation

### Return Structure

    [
    	{
    		"id": "",
    		"reseach_id":
    		{
    			"id": "",
    			"metricId":
    			{
    				"id": "",
    				"name": ""
    			},
    			"description": "",
    			"mathFormula": ""
    		},
    		"code": ""
    	}
    ]

## Add an Implementation

    POST  http://localhost:8080/api/v1/app/codeimplementation
    Content-Type: application/json
    {
      "research_id": "",
      "code": ""
    }

### Return Structure

    {
    	"status" :
    	"response" : ""
    }

#### Type of responses

| Status | Response                                        |
| ------ | ----------------------------------------------- |
| 200    | id                                              |
| 403    | implementation for this research already exists |

# Researches

## Get all Researches

    GET  http://localhost:8080/api/v1/app/research

### Return Structure

    [
    	{
    		"metricName":  "",
    		"researchDescription":  "",
    		"metricMathFormula":  "",
    		"code":  ""
    	}
    ]

## Add a Research

    POST  http://localhost:8080/api/v1/app/add/research
    Content-Type: application/json
    {
    	"metricId": "",
    	"mathFormula": "",
    	"description": ""
    }

### Return Structure

    {
    	"status" :
    	"response" : ""
    }

#### Type of responses

| Status | Response                               |
| ------ | -------------------------------------- |
| 200    | id                                     |
| 403    | Research for this metric already exist |

# Document

## Get all Documents

    GET  http://localhost:8080/api/v1/app/documents

### Return Structure

    [
    	{
    		"metricName":  "",
    		"researchDescription":  "",
    		"metricMathFormula":  "",
    		"code":  ""
    	}
    ]
