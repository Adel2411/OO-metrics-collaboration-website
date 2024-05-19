package com.example.demo.MetricAnalyser.MetricDB;

import com.example.demo.MetricAnalyser.MetricResultModel;
import com.example.demo.MetricAnalyser.MetricStructure;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class WebImportCounter extends MetricStructure {

    private static final String WEB_IMPORT_PATTERN =
            "import\\s+(java\\.net\\..*|javax\\.servlet\\..*|org\\.apache\\.http\\..*|okhttp3\\..*|com\\..*);";
    private Pattern pattern;

    public WebImportCounter(String metricName) {
        super(metricName);
        this.pattern = Pattern.compile(WEB_IMPORT_PATTERN);
    }

    public boolean isWebImport(String importStatement) {
        Matcher matcher = pattern.matcher(importStatement);
        return matcher.matches();
    }

    public int countWebImports(InputStreamReader inputStreamReader) {
        int webImportCount = 0;
        try (BufferedReader reader = new BufferedReader(inputStreamReader)) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.startsWith("import ") && isWebImport(line.trim())) {
                    webImportCount++;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return webImportCount;
    }

    @Override
    public float calculate(MultipartFile file) {
        try (InputStreamReader inputStreamReader = new InputStreamReader(file.getInputStream())) {
            return this.countWebImports(inputStreamReader);
        } catch (IOException e) {
            return -1;
        }
    }

    @Override
    public MetricResultModel execute(MultipartFile file) {
        return new MetricResultModel(this.metricName, String.valueOf(this.calculate(file)));
    }
}
