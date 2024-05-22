package com.example.demo.MetricAnalyser.MetricDB;

import com.example.demo.MetricAnalyser.MetricResultModel;
import com.example.demo.MetricAnalyser.MetricStructure;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class NumberOfImportedClassesUsed extends MetricStructure {

    public NumberOfImportedClassesUsed(String metricName) {
        super(metricName);
    }

    public Set<String> getNumberOfUsedClasses(String fileContent) throws IOException {
        NumberOfImportedClasses NOIC = new NumberOfImportedClasses("Number of Imported Classes");
        Set<String> importedPackages = NOIC.getImportedPackages(new java.io.ByteArrayInputStream(fileContent.getBytes()));
        Set<String> classesToSearch = new HashSet<>();
        for (String p : importedPackages) {
            String currentClass = p.substring(p.lastIndexOf("/") + 1);
            if (classUsed(currentClass, fileContent)) {
                classesToSearch.add(currentClass);
            }
        }
        return classesToSearch;
    }

    public boolean classUsed(String className, String fileContent) throws IOException {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(new java.io.ByteArrayInputStream(fileContent.getBytes())))) {
            String line;
            boolean inComment = false;
            boolean inString = false;
            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (line.startsWith("//")) {
                    continue; // Skip the line if it is a comment
                }
                if (line.contains("\"")) {
                    inString = !inString; // Toggle the inString flag
                }
                if (line.contains("/*")) {
                    inComment = true; // Start of the block comment
                }
                if (inComment) {
                    if (line.contains("*/")) {
                        inComment = false; // End of the block comment
                    }
                    continue;
                }
                if (line.contains(className) && !line.contains("import")) {
                    if (inString) {
                        continue;
                    }
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public float calculate(MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {
            // Read the entire file content as a string
            String fileContent = new String(inputStream.readAllBytes());
            return this.getNumberOfUsedClasses(fileContent).size();
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public MetricResultModel execute(MultipartFile file) {
        return new MetricResultModel(this.metricName, String.valueOf(this.calculate(file)));
    }
}
