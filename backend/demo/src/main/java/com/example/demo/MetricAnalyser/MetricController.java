package com.example.demo.MetricAnalyser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("api/v1/metric")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MetricController {
    private final MetricResultService metricResultService;
    private final CsvService csvService;

    @PostMapping("/generate-csv")
    public ResponseEntity<?> generateCsv(@RequestParam("files") List<MultipartFile> files) {
        try {
            // Filter files to only include .java and .git files
            files.removeIf(file -> !Objects.requireNonNull(file.getOriginalFilename()).endsWith(".java") &&
                    !Objects.requireNonNull(file.getOriginalFilename()).endsWith(".git"));

            // Handle case where no valid files are provided
            if (files.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "message", "No valid files provided. Only .java and .git files are accepted."
                ));
            }

            // Analyze the files
            List<FileMetricResult> data = metricResultService.analyze(files);

            // Handle case where analysis fails or returns no data
            if (data == null || data.isEmpty()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                        "message", "File analysis failed or returned no data."
                ));
            }

            // Generate CSV content
            byte[] csvContent = csvService.generateCsv(data).getBytes();

            // Prepare response headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "metrics.csv");

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.valueOf("application/csv"))
                    .body(csvContent);

        } catch (IOException e) {
            // Handle IOException separately if needed
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "message", "An error occurred while processing the files.",
                    "error", e.getMessage()
            ));
        } catch (Exception e) {
            // Handle all other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "message", "An unexpected error occurred.",
                    "error", e.getMessage()
            ));
        }
    }

}
