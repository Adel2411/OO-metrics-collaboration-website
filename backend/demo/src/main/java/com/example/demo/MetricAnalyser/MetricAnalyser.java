package com.example.demo.MetricAnalyser;

import org.springframework.web.multipart.MultipartFile;

public interface MetricAnalyser{
    float calculate(MultipartFile file_path);
    MetricResultModel execute(MultipartFile file_path);

}
