package com.example.demo.Metric;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class MetricDTO {
    private UUID id;
    private String name;
    private UUID researchId;
    private UUID codeImplementationId;

    // Getters and setters
}