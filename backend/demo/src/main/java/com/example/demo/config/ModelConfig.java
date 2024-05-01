package com.example.demo.config;

import com.example.demo.DTO.CodeImplementationDTO;
import com.example.demo.DTO.MetricDTO;
import com.example.demo.DTO.ResearchDTO;
import com.example.demo.Model.*;
import com.example.demo.Requests.CodeImplementationPutRequest;
import com.example.demo.Requests.CodeImplementationRequest;
import com.example.demo.Requests.ResearchPutRequest;
import com.example.demo.Requests.ResearchRequest;
import com.example.demo.Service.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/app")
@CrossOrigin({ "https://oo-metrics-collaboration-website-frontend.onrender.com" , "http://localhost:5173" })
public class ModelConfig {

    private ModelService modelService;

    @Autowired
    public ModelConfig(ModelService modelService) {
        this.modelService = modelService;
    }



    @GetMapping("/metrics")
    ResponseEntity<?> getMetrics(){
        ResponseModel responseModel ;
        try {
            List<MetricDTO> metrics = modelService.getMetrics();
            responseModel = ResponseModelBuilder.okResponse(metrics);
        }
        catch (Exception e){
            responseModel = ResponseModelBuilder.badRequestResponse(e.getMessage());
        }
        return ResponseEntity.status(responseModel.getStatus()).body(responseModel);
    }

    @PostMapping("/add/metric")
    ResponseEntity<?> addMetric(@RequestBody Metric metric){
        ResponseModel responseModel ;
        try{
            modelService.addMetric(metric);
            responseModel = ResponseModelBuilder.okResponse("Metric added");
        }catch (Exception e){
            responseModel = ResponseModelBuilder.badRequestResponse("metric cannot be added");
        }
        return ResponseEntity.status(responseModel.getStatus()).body(responseModel);
    }

    @PutMapping("/update/metric")
    ResponseEntity<?> updateMetric(@RequestBody Metric metric){
        ResponseModel responseModel ;
        try{
            modelService.updateMetric(metric);
            responseModel = ResponseModelBuilder.okResponse("Metric updated");
        }catch (Exception e){
            responseModel = ResponseModelBuilder.badRequestResponse("failed updating this metric");
        }
        return ResponseEntity.status(responseModel.getStatus()).body(responseModel);
    }

    @DeleteMapping("/delete/metric/{id}")
    ResponseEntity<?> deleteMetric(@PathVariable String id){
        ResponseModel responseModel ;
        try{
            modelService.deleteMetric(id);
            responseModel = ResponseModelBuilder.okResponse("Metric deleted");
        }catch (Exception e){
            responseModel = ResponseModelBuilder.badRequestResponse("failed deleting this metric");
        }
        return ResponseEntity.status(responseModel.getStatus()).body(responseModel);
    }

    @GetMapping("research/{id}")
    ResponseEntity<?> getResearch(@PathVariable String id){
        ResponseModel responseModel ;
        try {
            ResearchDTO research = modelService.getResearchByID(id);
            responseModel = ResponseModelBuilder.okResponse(research);
        }
        catch (Exception e){
            responseModel = ResponseModelBuilder.badRequestResponse("failed getting research");
        }
        return ResponseEntity.status(responseModel.getStatus()).body(responseModel);
    }

    @PostMapping("/add/research")
    ResponseEntity<?> addResearch(@RequestBody ResearchRequest research){
        ResponseModel responseModel ;
        try {
            Research newResearch = modelService.addResearch(research);
            responseModel = ResponseModelBuilder.okResponse("Research added Successfully");
        }catch (Exception e){
            responseModel = ResponseModelBuilder.badRequestResponse("failed adding research");
        }
        return ResponseEntity.status(responseModel.getStatus()).body(responseModel);
    }

    @PutMapping("/update/research")
    ResponseEntity<?> updateResearch(@RequestBody ResearchPutRequest research){
        ResponseModel responseModel ;
        try{
            modelService.updateResearch(research);
            responseModel = ResponseModelBuilder.okResponse("Research updated");
        }catch (Exception e){
            responseModel = ResponseModelBuilder.badRequestResponse("failed updating research");
        }
        return ResponseEntity.status(responseModel.getStatus()).body(responseModel);
    }


    @GetMapping("codeimplementation/{id}")
    ResponseEntity<?> getCodeImplementation(@PathVariable String id){
        ResponseModel responseModel ;
        try {
            CodeImplementationDTO codeImplementation = modelService.getCodeImplementationByID(id);
            responseModel = ResponseModelBuilder.okResponse(codeImplementation);
        }
        catch (Exception e){
            responseModel = ResponseModelBuilder.badRequestResponse("failed getting code implementation");
        }
        return ResponseEntity.status(responseModel.getStatus()).body(responseModel);
    }

      @PostMapping("/add/codeimplementation")
    ResponseEntity<?> addCodeImplementation(@RequestBody CodeImplementationRequest codeImplementation){
        ResponseModel responseModel ;
        try {
            CodeImplementation newCodeImplementation = modelService.addCodeImplementation(codeImplementation);
            responseModel = ResponseModelBuilder.okResponse("Code Implementation added Successfully");
        }catch (Exception e){
            responseModel = ResponseModelBuilder.badRequestResponse("failed adding code implementation");
        }
        return ResponseEntity.status(responseModel.getStatus()).body(responseModel);
    }

    @PutMapping("/update/codeimplementation")
    ResponseEntity<?> updateCodeImplementation(@RequestBody CodeImplementationPutRequest codeImplementation){
        ResponseModel responseModel ;
        try {
            CodeImplementation updatedCodeImplementation = modelService.updateCodeImplementation(codeImplementation);
            responseModel = ResponseModelBuilder.okResponse("Code Implementation updated Successfully");
        }catch (Exception e){
            responseModel = ResponseModelBuilder.badRequestResponse("failed updating code implementation");
        }
        return ResponseEntity.status(responseModel.getStatus()).body(responseModel);
    }


    @GetMapping ("/documents")
    ResponseEntity<?> getDocuments(){
        ResponseModel responseModel ;
        try {
            List<Document> documents = modelService.getDocuments();
            responseModel = ResponseModelBuilder.okResponse(documents);
        }
        catch (Exception e){
            responseModel = ResponseModelBuilder.badRequestResponse("failed getting documents");
        }
        return ResponseEntity.status(responseModel.getStatus()).body(responseModel);
    }


    @GetMapping ("/codeimplementations")
    ResponseEntity<?> getCodeImplementations(){
        ResponseModel responseModel ;
        try {
            List<CodeImplementation> codeImplementations = modelService.getCodeImplementations();
            responseModel = ResponseModelBuilder.okResponse(codeImplementations);
        }
        catch (Exception e){
            responseModel = ResponseModelBuilder.badRequestResponse("failed getting code implementations");
        }
        return ResponseEntity.status(responseModel.getStatus()).body(responseModel);
    }


    @GetMapping("/re/{id}")
    ResponseEntity<?> getResearches(@PathVariable String id){
        ResponseModel responseModel ;
        try {
            List<?> research = modelService.getRe(id);
            responseModel = ResponseModelBuilder.okResponse(research);
        }
        catch (Exception e){
            responseModel = ResponseModelBuilder.badRequestResponse("failed getting research");
        }
        return ResponseEntity.status(responseModel.getStatus()).body(responseModel);
    }
}
