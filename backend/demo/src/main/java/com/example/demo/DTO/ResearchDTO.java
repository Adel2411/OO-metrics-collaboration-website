package com.example.demo.DTO;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;


@Data
@Builder
public class ResearchDTO {
    private UUID id;
    private String description;
    private String mathFormula;

    // Getters and setters
}