package com.example.demo.Requests;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResearchPutRequest {
    private String id;
    private String description;
    private String mathFormula;

    public ResearchPutRequest(String id, String description, String mathFormula) {
        this.id = id;
        this.description = description;
        this.mathFormula = mathFormula;
    }
}
