package com.example.demo.MetricAnalyser;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Objects;

@RestController
@RequestMapping("api/v1/metric")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MetricController {
    private final MetricResultService MetricResultService;

    @PostMapping("/analyze")
    public ResponseEntity<ArrayList<FileMetricResult>> analyze(@RequestParam("files") ArrayList<MultipartFile> files) {
        // ignore all the files that are not java files
        files.removeIf(file -> !Objects.requireNonNull(file.getOriginalFilename()).endsWith(".java") && !Objects.requireNonNull(file.getOriginalFilename()).endsWith(".git"));
        ArrayList<FileMetricResult> result = MetricResultService.analyze(files);
        return ResponseEntity.ok(result);
    }
}
