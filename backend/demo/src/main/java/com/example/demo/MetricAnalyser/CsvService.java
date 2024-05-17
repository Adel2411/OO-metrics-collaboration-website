package com.example.demo.MetricAnalyser;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;


@Service
public class CsvService {

    public String generateCsv(List<FileMetricResult> data) throws IOException {
        Set<String> metrics = new HashSet<>();
        for (FileMetricResult fileMetricResult : data) {
            metrics.addAll(fileMetricResult.getResults().stream().map(MetricResultModel::getMetricName).toList());
        }

        StringWriter out = new StringWriter();
        try (CSVPrinter printer = new CSVPrinter(out, CSVFormat.DEFAULT.withHeader(getHeader(metrics)))) {
            for (FileMetricResult fileMetricResult : data) {
                printRecord(printer, fileMetricResult, metrics);
            }
        }
        return out.toString();
    }

    private void printRecord(CSVPrinter printer, FileMetricResult fileMetricResult, Set<String> metrics) throws IOException {
        String[] record = new String[metrics.size() + 1];
        record[0] = fileMetricResult.getFile_name();

        for (int i = 0; i < metrics.size(); i++) {
            String metric = metrics.toArray(new String[0])[i];
            String value = fileMetricResult.getResults().stream()
                    .filter(m -> m.getMetricName().equals(metric))
                    .map(MetricResultModel::getValue)
                    .findFirst()
                    .orElse("");
            record[i + 1] = value;
        }
        printer.printRecord(record);
    }

    private String[] getHeader(Set<String> metrics) {
        String[] header = new String[metrics.size() + 1];
        header[0] = "File Name";
        int i = 1;
        for (String metric : metrics) {
            header[i++] = metric;
        }
        return header;
    }
}
