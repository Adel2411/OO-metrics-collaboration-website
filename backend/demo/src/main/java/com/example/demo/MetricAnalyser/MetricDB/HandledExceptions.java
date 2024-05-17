package com.example.demo.MetricAnalyser.MetricDB;

import com.example.demo.MetricAnalyser.MetricResultModel;
import com.example.demo.MetricAnalyser.MetricStructure;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class HandledExceptions extends MetricStructure {

    public HandledExceptions(String metricName) {
        super(metricName);
    }

    private int countHandledExceptions(BufferedReader reader) throws IOException {
        int handledExceptionsCount = 0;
        boolean inSingleLineComment = false;
        boolean inMultiLineComment = false;

        String line;
        while ((line = reader.readLine()) != null) {
            line = line.strip();

            // Skip empty lines
            if (line.isEmpty()) {
                continue;
            }

            // Handle single-line comments
            if (line.startsWith("//")) {
                inSingleLineComment = true;
                continue;
            }
            inSingleLineComment = false;

            // Handle multi-line comments
            if (inMultiLineComment) {
                if (line.endsWith("*/")) {
                    inMultiLineComment = false;
                }
                continue;
            } else if (line.startsWith("/*")) {
                inMultiLineComment = true;
                continue;
            }

            // Check for try and throw statements (outside comments)
            if (!inSingleLineComment && !inMultiLineComment) {
                if (line.toLowerCase().startsWith("try")) {
                    handledExceptionsCount++;
                } else if (line.toLowerCase().contains("throw ")) {
                    handledExceptionsCount++;
                }
            }
        }
        return handledExceptionsCount;
    }

    @Override
    public float calculate(MultipartFile file) {
        int handledExceptionsCount = 0;
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            handledExceptionsCount = countHandledExceptions(reader);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return handledExceptionsCount;
    }

    @Override
    public MetricResultModel execute(MultipartFile file) {
        return new MetricResultModel(this.metricName, String.valueOf(this.calculate(file)));
    }
}
