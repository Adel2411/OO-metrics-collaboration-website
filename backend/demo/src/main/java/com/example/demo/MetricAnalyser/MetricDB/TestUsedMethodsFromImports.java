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

public class TestUsedMethodsFromImports extends MetricStructure {

    public TestUsedMethodsFromImports(String metricName) {
        super(metricName);
    }

    public float countUsedMethods(InputStream inputStream) throws IOException {
        int methodCount = 0;
        StringBuilder codeLine = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            String line;
            while ((line = reader.readLine()) != null) {
                codeLine.append(line).append("\n");
            }
            methodCount += countMethodCalls(codeLine.toString());
        }
        return methodCount;
    }

    private static int countMethodCalls(String code) {
        int count = 0;

        // Pattern to capture method calls, including those used as parameters
        Pattern pattern = Pattern.compile("\\b([a-zA-Z0-9_.]+)(?:\\.[a-zA-Z0-9_]+)+\\(.*?\\)");

        Matcher matcher = pattern.matcher(code);
        while (matcher.find()) {
            count++;
        }
        return count;
    }

    @Override
    public float calculate(MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {
            return countUsedMethods(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public MetricResultModel execute(MultipartFile file) {
        return new MetricResultModel(this.metricName, String.valueOf(this.calculate(file)));
    }
}
