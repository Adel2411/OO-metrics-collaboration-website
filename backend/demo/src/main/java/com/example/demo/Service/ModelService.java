package com.example.demo.Service;
import com.example.demo.CodeImplementation.CodeImplementationService;
import com.example.demo.DTO.CodeImplementationDTO;
import com.example.demo.DTO.ResearchDTO;
import com.example.demo.Metric.Model.Metric;
import com.example.demo.Metric.Model.MetricDTO;
import com.example.demo.Metric.Repository.metricRepository;
import com.example.demo.Metric.Service.MetricService;
import com.example.demo.Model.Document;
import com.example.demo.Research.*;
import com.example.demo.CodeImplementation.*;
import com.example.demo.Requests.CodeImplementationPutRequest;
import com.example.demo.Requests.CodeImplementationRequest;
import com.example.demo.Research.ResearchPutRequest;
import com.example.demo.Research.ResearchRequest;
import com.example.demo.Research.ResearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ModelService {

    private final com.example.demo.Metric.Repository.metricRepository metricRepository;
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

    public void  updateResearch(ResearchPutRequest research) {
        researchService.updateResearch(research);
    }


    public CodeImplementationDTO getCodeImplementationByID (String id) {
        return codeImplementationService.getCodeImplementationDTO(UUID.fromString(id));
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


    public List<CodeImplementation> getCodeImplementations() {
        return codeImplementationRepository.findAllWithAssociations();
    }

    public List<?> getRe(String id){
        return List.of(researchService.getResearches(UUID.fromString(id)));
    }

    public void deleteResearch(String id) {
        UUID codeImplementationID = codeImplementationRepository.findIdByResearchId(UUID.fromString(id));
        if (codeImplementationID != null) {
            System.out.println("Deleting code implementation");
            codeImplementationRepository.deleteById(codeImplementationID);
        }
        researchRepository.deleteById(UUID.fromString(id));
    }


    public void deleteCodeImplementation(String id) {
        codeImplementationRepository.deleteById(UUID.fromString(id));
    }
}
