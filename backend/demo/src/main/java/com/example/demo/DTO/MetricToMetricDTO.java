package com.example.demo.DTO;

import com.example.demo.Model.Metric;
import com.example.demo.repository.codeImplementationRepository;
import com.example.demo.repository.researchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;
import java.util.function.Function;

@Component
public class MetricToMetricDTO implements Function<Metric, MetricDTO> {
    private researchRepository  researchRepository;
    private codeImplementationRepository codeImplementationRepository;

    @Autowired
    public MetricToMetricDTO(researchRepository researchRepository, codeImplementationRepository codeImplementationRepository) {
        this.researchRepository = researchRepository;
        this.codeImplementationRepository = codeImplementationRepository;
    }
    @Override
    public MetricDTO apply(Metric metric) {
        UUID researchID =  researchRepository.findIdByMetricId(metric.getId());
        UUID codeImplementationID = codeImplementationRepository.findIdByResearchId(researchID);
        return MetricDTO.builder()
                .id(metric.getId())
                .name(metric.getName())
                .codeImplementationId(codeImplementationID)
                .researchId(researchID)
                .build();
    }
}
