package com.example.demo.MetricAnalyser.MetricDB;//package com.example.demo.MetricAnalyser.MetricDB;
//
//import com.example.demo.MetricAnalyser.MetricResultModel;
//import com.example.demo.MetricAnalyser.MetricStructure;
//
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.BufferedReader;
//import java.io.IOException;
//import java.io.InputStreamReader;
//import java.util.Arrays;
//import java.util.List;
//import java.util.regex.Matcher;
//import java.util.regex.Pattern;
//
//public class ClassLevelObjectCounter extends MetricStructure {
//
//    public ClassLevelObjectCounter(String metricName) {
//        super(metricName);
//    }
//
//    @Override
//    public float calculate(MultipartFile file) {
//        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
//            return countClassLevelObjects(br);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return -1; // Return -1 if an error occurs
//        }
//    }
//
//    private int countClassLevelObjects(BufferedReader br) throws IOException {
//        List<String> keywords = Arrays.asList("class", "interface", "enum", "int", "double", "float", "long", "short",
//                "byte", "char", "boolean", "void");
//        int count = 0;
//        boolean isInsideClass = false;
//
//        // Regular expression pattern to match variable declarations
//        Pattern pattern = Pattern.compile("^\\s*(\\w+)\\s+(\\w+)\\s*;");
//
//        String line;
//        while ((line = br.readLine()) != null) {
//            line = line.trim();
//
//            // Check if we are inside a class
//            if (line.startsWith("class") || line.startsWith("interface") || line.startsWith("enum")) {
//                isInsideClass = true;
//            } else if (line.startsWith("}") && isInsideClass) {
//                // Check if we are leaving the class
//                isInsideClass = false;
//            }
//
//            // Match variable declarations inside the class
//            if (isInsideClass) {
//                Matcher matcher = pattern.matcher(line);
//                if (matcher.find()) {
//                    String type = matcher.group(1); // Variable type
//                    if (!keywords.contains(type)) {
//                        // If the type is not a keyword, it's likely an object
//                        count++;
//                    }
//                }
//            }
//        }
//        return count;
//    }
//
//    @Override
//    public MetricResultModel execute(MultipartFile file) {
//        return new MetricResultModel(this.metricName, String.valueOf(calculate(file)));
//    }
//}


import com.example.demo.MetricAnalyser.MetricResultModel;
import com.example.demo.MetricAnalyser.MetricStructure;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NonPrimitiveVariableCounter extends MetricStructure {

    public NonPrimitiveVariableCounter(String metricName) {
        super(metricName);
    }

    @Override
    public float calculate(MultipartFile file) {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            return countNonPrimitiveVariables(br);
        } catch (IOException e) {
            e.printStackTrace();
            return -1; // Return -1 if an error occurs
        }
    }

    private int countNonPrimitiveVariables(BufferedReader br) throws IOException {
        int nonPrimitiveVariableCount = 0;
        String line;
        while ((line = br.readLine()) != null) {
            nonPrimitiveVariableCount += countNonPrimitiveVariablesInLine(line);
        }
        return nonPrimitiveVariableCount;
    }

    private int countNonPrimitiveVariablesInLine(String line) {
        int count = 0;
        // Match variable declarations: ClassName variableName;
        Pattern pattern = Pattern.compile("\\b(?!int|long|float|double|boolean|char|byte|short)\\w+\\b\\s+\\w+\\s*[;,=]");
        Matcher matcher = pattern.matcher(line);
        while (matcher.find()) {
            count++;
        }
        // Match variable declarations with generic type: ClassName<...> variableName;
        pattern = Pattern.compile("\\b(?!int|long|float|double|boolean|char|byte|short)\\w+\\b\\s*<.*?>\\s+\\w+\\s*[;,=]");
        matcher = pattern.matcher(line);
        while (matcher.find()) {
            count++;
        }
        return count;
    }

    @Override
    public MetricResultModel execute(MultipartFile file) {
        return new MetricResultModel(this.metricName, String.valueOf(calculate(file)));
    }
}
