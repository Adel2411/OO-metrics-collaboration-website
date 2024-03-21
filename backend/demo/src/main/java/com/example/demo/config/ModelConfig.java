package com.example.demo.config;

import com.example.demo.Model.CodeImplementation;
import com.example.demo.Model.Document;
import com.example.demo.Model.Metric;
import com.example.demo.Model.Research;
import com.example.demo.Requests.CodeImplementationPutRequest;
import com.example.demo.Requests.CodeImplementationRequest;
import com.example.demo.Requests.ResearchPutRequest;
import com.example.demo.Requests.ResearchRequest;
import com.example.demo.Service.DocumentService;
import com.example.demo.Service.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/app")
@CrossOrigin(origins = "http://localhost:5173")
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

    @PutMapping("/update/metric")
    ResponseEntity<?> updateMetric(@RequestBody Metric metric){
        Metric updatedMetric = modelService.updateMetric(metric);
        return ResponseEntity.ok(updatedMetric.getId());
    }

    @DeleteMapping("/delete/metric/{id}")
    ResponseEntity<?> deleteMetric(@PathVariable String id){
        modelService.deleteMetric(id);
        return ResponseEntity.ok("Metric deleted");
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

    @PutMapping("/update/research")
    ResponseEntity<?> updateResearch(@RequestBody ResearchPutRequest research){
        Research updatedResearch = modelService.updateResearch(research);
        return ResponseEntity.ok(updatedResearch.getId());
    }

    @DeleteMapping("/delete/research/{id}")
    ResponseEntity<?> deleteResearch(@PathVariable String id){
        modelService.deleteResearch(id);
        return ResponseEntity.ok("Research deleted");
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

    @PutMapping("/update/codeimplementation")
    ResponseEntity<?> updateCodeImplementation(@RequestBody CodeImplementationPutRequest codeImplementation){
        CodeImplementation updatedCodeImplementation = modelService.updateCodeImplementation(codeImplementation);
        return ResponseEntity.ok(updatedCodeImplementation.getId());
    }

    @DeleteMapping("/delete/codeimplementation/{id}")
    ResponseEntity<?> deleteCodeImplementation(@PathVariable String id){
        modelService.deleteCodeImplementation(id);
        return ResponseEntity.ok("CodeImplementation deleted");
    }

    @GetMapping ("/documents")
    List<Document> getDocuments(){
        return documentService.getDocuments();
    }


}
