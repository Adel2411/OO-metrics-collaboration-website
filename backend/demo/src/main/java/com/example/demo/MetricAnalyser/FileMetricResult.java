package com.example.demo.MetricAnalyser;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileMetricResult {
    private String file_name;
    private ArrayList<MetricResultModel> results;
}
