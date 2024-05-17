package com.example.demo.MetricAnalyser.MetricDB;


import com.example.demo.MetricAnalyser.MetricResultModel;
import com.example.demo.MetricAnalyser.MetricStructure;
import org.springframework.web.multipart.MultipartFile;

public class ExampleMetric extends MetricStructure {



  public ExampleMetric(String metricName) {
    super(metricName);
  }

  int result() {
    // This is a dummy method to test the functionality of the test cases
    return 124;
  }

  @Override
  public float calculate(MultipartFile file_path) {
    return result();
  }

  @Override
  public MetricResultModel execute(MultipartFile file_path) {
    return new MetricResultModel(this.metricName, String.valueOf(this.calculate(file_path)));
  }
}
