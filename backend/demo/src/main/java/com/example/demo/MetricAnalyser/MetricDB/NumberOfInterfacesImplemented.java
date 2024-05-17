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

public class NumberOfInterfacesImplemented extends MetricStructure {
    public NumberOfInterfacesImplemented(String metricName) {
        super(metricName);
    }
    public float numberOfInterfacesImpl(String fileContent) {
        int interfaceCount = 0;
        Pattern pattern = Pattern.compile(".*implements\\s+((\\w+)(\\s*,\\s*\\w+)*)\\s*.*");

        try (BufferedReader br = new BufferedReader(new InputStreamReader(new java.io.ByteArrayInputStream(fileContent.getBytes())))) {
            String line;
            while ((line = br.readLine()) != null) {
                Matcher matcher = pattern.matcher(line);
                if (matcher.matches()) {
                    interfaceCount += matcher.group(1).split("\\s*,\\s*").length;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            return -1;
        }
        return interfaceCount;
    }

    @Override
    public float calculate(MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {
            // Read the entire file content as a string
            String fileContent = new String(inputStream.readAllBytes());
            return numberOfInterfacesImpl(fileContent);
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
