package com.example.demo.MetricAnalyser;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MetricResultModel {
    @JsonProperty("metric_name")
    private String metricName;
    @JsonProperty("value")
    private String value;
}
