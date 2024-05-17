package com.example.demo.MetricAnalyser;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class MetricResultService {
    private final MetricRepository metricRepository = new MetricRepository();
    public  List<FileMetricResult> analyze(List<MultipartFile> files) {
        ArrayList<FileMetricResult> fileMetricResults = new ArrayList<>();
        for (MultipartFile file : files) {
            FileMetricResult fileMetricResult = FileMetricResult.builder()
                    .file_name(file.getOriginalFilename())
                    .results(new ArrayList<>())
                    .build();
            for (MetricAnalyser metric : metricRepository.analyse_metrics) {
                MetricResultModel metricResultModel = metric.execute(file);
                fileMetricResult.getResults().add(metricResultModel);
            }
            fileMetricResults.add(fileMetricResult);
        }
        return fileMetricResults;
    }
}
