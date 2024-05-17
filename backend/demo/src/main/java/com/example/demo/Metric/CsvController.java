package com.example.demo.Metric;


import com.example.demo.MetricAnalyser.FileMetricResult;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
public class CsvController {

    @Autowired
    private CsvService csvService;

    public ResponseEntity<String> generateCsv(@RequestBody List<FileMetricResult> fileMetricResults) throws IOException {
        String csvContent = csvService.generateCsv(fileMetricResults);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=metrics.csv")
                .contentType(MediaType.TEXT_PLAIN)
                .body(csvContent);
    }
}
