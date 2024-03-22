package com.example.demo.Service;

import com.example.demo.DTO.ResearchDTO;
import com.example.demo.DTO.ResearchToResearchDTO;
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
    private final metricRepository metricRepository;

    private final ResearchToResearchDTO entityToDTOMapper;
    @Autowired
    public ResearchService( researchRepository researchRepository, metricRepository metricRepository  , ResearchToResearchDTO entityToDTOMapper) {
        this.researchRepository = researchRepository;
        this.metricRepository = metricRepository;
        this.entityToDTOMapper = entityToDTOMapper;
    }

    public Research addResearch(ResearchRequest request) {
        System.out.println(request);
        Research research = Research.builder()
                .description(request.getDescription())
                .MathFormula(request.getMathFormula())
                .build();

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

    public ResearchDTO getResearchById(String id) {
        Research research = researchRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new RuntimeException("Research not found"));

        return entityToDTOMapper.apply(research);
    }

}
