package com.example.demo.Service;

import com.example.demo.DTO.MetricDTO;
import com.example.demo.DTO.ResearchDTO;
import com.example.demo.Model.CodeImplementation;
import com.example.demo.Model.Document;
import com.example.demo.Model.Metric;
import com.example.demo.Model.Research;
import com.example.demo.Requests.CodeImplementationPutRequest;
import com.example.demo.Requests.CodeImplementationRequest;
import com.example.demo.Requests.ResearchPutRequest;
import com.example.demo.Requests.ResearchRequest;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ModelService {

    private final metricRepository metricRepository;
    private final researchRepository researchRepository;
    private final codeImplementationRepository codeImplementationRepository;
    private final ResearchService researchService;
    private final CodeImplementationService codeImplementationService;
    private final MetricService metricService;
    private final DocumentService documentService;

    @Autowired
    public ModelService(
            metricRepository metricRepository, researchRepository researchRepository
            , codeImplementationRepository codeImplementationRepository,
            ResearchService researchService, CodeImplementationService codeImplementationService
            , MetricService metricService
            , DocumentService documentService
    ) {
        this.metricRepository = metricRepository;
        this.researchRepository = researchRepository;
        this.codeImplementationRepository = codeImplementationRepository;
        this.researchService = researchService;
        this.codeImplementationService = codeImplementationService;
        this.metricService = metricService;
        this.documentService = documentService;
    }

    public List<MetricDTO> getMetrics() {
        return metricService.getAllMetricsDTO();
    }

    public void addMetric(Metric metric) {
        metricRepository.save(metric);
    }

    public void updateMetric(Metric metric) {
        metricRepository.save(metric);
    }

    public void deleteMetric(String id) {
        UUID researchID = researchRepository.findIdByMetricId(UUID.fromString(id));
        UUID codeImplementationID = codeImplementationRepository.findIdByResearchId(researchID);
        System.out.printf("researchID: %s, codeImplementationID: %s\n", researchID, codeImplementationID);
        if (codeImplementationID != null) {
            codeImplementationRepository.deleteById(codeImplementationID);
        }

        if (researchID != null) {
            System.out.println("Deleting research");
            researchRepository.deleteById(researchID);
        }
        metricRepository.deleteById(UUID.fromString(id));
    }

    public ResearchDTO getResearchByID(String id) {
        return  researchService.getResearchById(id);
    }

    public Research addResearch(ResearchRequest request) {
        return researchService.addResearch(request);
    }

    public Research updateResearch(ResearchPutRequest research) {
        return researchService.updateResearch(research);
    }


    public CodeImplementation getCodeImplementationByID(String id) {
        return codeImplementationRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new RuntimeException("Code Implementation not found"));
    }

    public CodeImplementation addCodeImplementation(CodeImplementationRequest codeImplementation) {
        return codeImplementationService.save(codeImplementation);
    }


    public CodeImplementation updateCodeImplementation(CodeImplementationPutRequest codeImplementation) {
        return codeImplementationService.update(codeImplementation);
    }


    public List<Document> getDocuments() {
        return documentService.getDocuments();
    }
}
