package com.example.demo.Service;

import com.example.demo.Model.Metric;
import com.example.demo.Model.Research;
import com.example.demo.Requests.ResearchPutRequest;
import com.example.demo.Requests.ResearchRequest;
import com.example.demo.repository.metricRepository;
import com.example.demo.repository.researchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ResearchService {

    private final researchRepository researchRepository;
    private final metricRepository metricRepository; // Assuming you have a MetricRepository

    @Autowired
    public ResearchService( researchRepository researchRepository, metricRepository metricRepository) {

        this.researchRepository = researchRepository;
        this.metricRepository = metricRepository;
    }

    public Research addResearch(ResearchRequest request) {
        System.out.println(request);
        Research research = Research.builder()
                .description(request.getDescription())
                .MathFormula(request.getMathFormula())
                .build();

        // Find the Metric entity by its ID
        UUID metricId = UUID.fromString(request.getMetricId());
        Metric metric = metricRepository.findById(metricId)
                .orElseThrow(() -> new RuntimeException("Metric not found"));

        research.setMetricId(metric);
        return researchRepository.save(research);
    }


    public Research updateResearch(ResearchPutRequest research) {
        Research researchToUpdate = researchRepository.findById(UUID.fromString(research.getId()))
                .orElseThrow(() -> new RuntimeException("Research not found"));

        researchToUpdate.setDescription(research.getDescription());
        researchToUpdate.setMathFormula(research.getMathFormula());

        return researchRepository.save(researchToUpdate);
    }

    public List<Research> getAllResearchWithStatus() {
        List<Object[]> researchWithStatus = researchRepository.findResearchWithStatus();
        List<Research> researchList = new ArrayList<>();
        for (Object[] research : researchWithStatus) {
            Research newResearch = Research
                    .builder()
                    .id(UUID.fromString(research[0].toString()))
                    .metricId(metricRepository.findById(UUID.fromString(research[1].toString())).orElseThrow())
                    .description(research[2].toString())
                    .MathFormula(research[3].toString())
                    .status(Integer.parseInt(research[4].toString()))
                    .build();
            researchList.add(newResearch);
        }
        return researchList;
    }
}
