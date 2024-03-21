package com.example.demo.Service;

import com.example.demo.Model.CodeImplementation;
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
    private metricRepository metricRepository;
    private researchRepository researchRepository;
    private ResearchService researchService;
    private codeImplementationRepository codeImplementationRepository;
    private CodeImplementationService codeImplementationService;
    private  MetricService metricService;

    @Autowired
    public ModelService(
            metricRepository metricRepository, researchRepository researchRepository
            , codeImplementationRepository codeImplementationRepository ,
            ResearchService researchService , CodeImplementationService codeImplementationService
            , MetricService metricService
    ) {
        this.metricRepository = metricRepository;
        this.researchRepository = researchRepository;
        this.codeImplementationRepository = codeImplementationRepository;
        this.researchService = researchService;
        this.codeImplementationService = codeImplementationService;
        this.metricService = metricService;
    }

    public List<Metric> getMetrics() {
        return metricService.getAllMetricsWithStatus();
    }

    public List<Research> getResearch() {
        return researchService.getAllResearchWithStatus();
    }

    public List<CodeImplementation> getCodeImplementation() {
        return codeImplementationRepository.findAll();
    }

    public Metric addMetric(Metric metric) {
        return metricRepository.save(metric);
    }

    public Research addResearch(ResearchRequest request) {
        return researchService.addResearch(request);
    }

    public CodeImplementation addCodeImplementation(CodeImplementationRequest codeImplementation) {
        return codeImplementationService.save(codeImplementation);
    }

    public Metric updateMetric(Metric metric) {
        return metricRepository.save(metric);
    }

    public void deleteMetric(String id) {
        metricRepository.deleteById(UUID.fromString(id));
    }

    public Research updateResearch(ResearchPutRequest research) {
        return researchService.updateResearch(research);
    }

    public void deleteResearch(String id)
    {
        researchRepository.deleteById(UUID.fromString(id));
    }

    public CodeImplementation updateCodeImplementation(CodeImplementationPutRequest codeImplementation) {
        return codeImplementationService.update(codeImplementation);
    }

    public void deleteCodeImplementation(String id) {
        codeImplementationRepository.deleteById(UUID.fromString(id));
    }
}
