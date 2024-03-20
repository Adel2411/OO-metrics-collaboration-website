package com.example.demo.Model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Document {
    private String metricName ;
    private String researchDescription ;
    private String metricMathFormula ;
    private String code ;
}
