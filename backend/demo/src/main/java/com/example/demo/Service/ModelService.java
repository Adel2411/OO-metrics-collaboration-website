package com.example.demo.Service;

import com.example.demo.Model.CodeImplementation;
import com.example.demo.Model.Metric;
import com.example.demo.Model.Research;
import com.example.demo.Requests.CodeImplementationRequest;
import com.example.demo.Requests.ResearchRequest;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModelService {
    private metricRepository metricRepository;
    private researchRepository researchRepository;
    private ResearchService researchService;
    private codeImplementationRepository codeImplementationRepository;
    private CodeImplementationService codeImplementationService;

    @Autowired
    public ModelService(metricRepository metricRepository, researchRepository researchRepository, codeImplementationRepository codeImplementationRepository , ResearchService researchService , CodeImplementationService codeImplementationService) {
        this.metricRepository = metricRepository;
        this.researchRepository = researchRepository;
        this.codeImplementationRepository = codeImplementationRepository;
        this.researchService = researchService;
        this.codeImplementationService = codeImplementationService;
    }

    public List<Metric> getMetrics() {
        return metricRepository.findAll();
    }

    public List<Research> getResearch() {
        return researchRepository.findAll();
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
}
