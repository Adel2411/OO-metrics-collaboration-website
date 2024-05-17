package com.example.demo.DTO;

import com.example.demo.Metric.MetricDTO;
import org.springframework.stereotype.Component;

import java.util.UUID;
import java.util.function.Function;

@Component
public class EntityToDTOMapper implements Function<Object[], MetricDTO> {
    @Override
    public MetricDTO apply(Object[] metric) {
        return MetricDTO.builder()
                .id(UUID.fromString(metric[0].toString()))
                .name(metric[1].toString())
                .researchId(metric[2] == null ? null : UUID.fromString(metric[2].toString()))
                .codeImplementationId(metric[3] == null ? null : UUID.fromString(metric[3].toString()))
                .build();
    }
}
