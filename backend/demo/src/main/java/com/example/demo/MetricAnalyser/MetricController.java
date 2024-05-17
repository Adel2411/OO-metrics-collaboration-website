package com.example.demo.MetricAnalyser;
import com.example.demo.Metric.CsvService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("api/v1/metric")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MetricController {
    private final MetricResultService MetricResultService;
    private final CsvService csvService;

    @PostMapping("/generate-csv")
    public ResponseEntity<byte[]> generateCsv(@RequestParam("files") List<MultipartFile> files) throws IOException {
        files.removeIf(file -> !Objects.requireNonNull(file.getOriginalFilename()).endsWith(".java") && !Objects.requireNonNull(file.getOriginalFilename()).endsWith(".git"));
        List<FileMetricResult> data =  MetricResultService.analyze((ArrayList<MultipartFile>) files).stream().toList();
        byte[] csvContent = csvService.generateCsv(data).getBytes();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "metrics.csv");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.valueOf("application/csv"))
                .body(csvContent);
    }

}
