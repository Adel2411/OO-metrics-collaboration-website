package com.example.demo.config;

import com.example.demo.Model.CodeImplementation;
import com.example.demo.Model.Document;
import com.example.demo.Model.Metric;
import com.example.demo.Model.Research;
import com.example.demo.Requests.CodeImplementationRequest;
import com.example.demo.Requests.ResearchRequest;
import com.example.demo.Service.DocumentService;
import com.example.demo.Service.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/app")
public class ModelConfig {

    private DocumentService documentService;
    private ModelService modelService;

    @Autowired
    public ModelConfig(DocumentService documentService , ModelService modelService) {
        this.documentService = documentService;
        this.modelService = modelService;
    }



    @GetMapping("/metrics")
    List<Metric> getMetrics(){
        return modelService.getMetrics();
    }

    @PostMapping("/add/metric")
    ResponseEntity<?> addMetric(@RequestBody Metric metric){
        Metric newMetric = modelService.addMetric(metric);
        return ResponseEntity.ok(newMetric.getId());
    }


    @GetMapping("/research")
    List<Research> getResearch(){
        return  modelService.getResearch();
    }

    @PostMapping("/add/research")
    ResponseEntity<?> addResearch(@RequestBody ResearchRequest research){
        Research newResearch = modelService.addResearch(research);
        return ResponseEntity.ok(newResearch.getId());
    }

    @GetMapping("/codeimplementation")
    List<CodeImplementation> getCodeImplementation(){
        return modelService.getCodeImplementation();
    }

    @PostMapping("/add/codeimplementation")
    ResponseEntity<?> addCodeImplementation(@RequestBody CodeImplementationRequest codeImplementation){
        CodeImplementation newCodeImplementation = modelService.addCodeImplementation(codeImplementation);
        return ResponseEntity.ok(newCodeImplementation.getId());
    }

    @GetMapping ("/documents")
    List<Document> getDocuments(){
        return documentService.getDocuments();
    }


}
