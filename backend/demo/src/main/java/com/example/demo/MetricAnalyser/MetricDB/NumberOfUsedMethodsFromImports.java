package com.example.demo.MetricAnalyser.MetricDB;

import com.example.demo.MetricAnalyser.MetricResultModel;
import com.example.demo.MetricAnalyser.MetricStructure;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NumberOfUsedMethodsFromImports extends MetricStructure {

    public NumberOfUsedMethodsFromImports(String metricName) {
        super(metricName);
    }

    public float countUsedMethods(InputStream inputStream) throws IOException {
        int methodCount = 0;
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            String line;
            while ((line = reader.readLine()) != null) {
                methodCount += countMethodCalls(line);
            }
        }
        return methodCount;
    }

    private static int countMethodCalls(String line) {
        int count = 0;

        // Pattern to capture method calls (including static imports)
        Pattern pattern = Pattern.compile("\\b([a-zA-Z0-9_.]+)(\\.)([a-zA-Z0-9_]+)\\(.*\\)"); // Captures class, method name, and arguments

        Matcher matcher = pattern.matcher(line);
        while (matcher.find()) {
            System.out.println(matcher.group(1));
            count++;
        }
        return count;
    }

    @Override
    public float calculate(MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {
            return countUsedMethods(inputStream);
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
            return -1;
        }
    }

    @Override
    public MetricResultModel execute(MultipartFile file) {
        return new MetricResultModel(this.metricName, String.valueOf(this.calculate(file)));
    }
}
