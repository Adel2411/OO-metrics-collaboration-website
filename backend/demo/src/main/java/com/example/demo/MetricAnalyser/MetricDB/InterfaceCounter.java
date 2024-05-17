package com.example.demo.MetricAnalyser.MetricDB;

import com.example.demo.MetricAnalyser.MetricResultModel;
import com.example.demo.MetricAnalyser.MetricStructure;
import org.springframework.web.multipart.MultipartFile;

public class InterfaceCounter extends MetricStructure {

    public InterfaceCounter(String metricName) {
        super(metricName);
    }

    public float countInterfaces(Class<?> clazz) {
        float count = 0;
        if (clazz != null) {
            // Get all interfaces directly implemented by the class
            Class<?>[] interfaces = clazz.getInterfaces();
            count = interfaces.length;

            // Check for implemented interfaces by superclasses recursively
            Class<?> superclass = clazz.getSuperclass();
            while (superclass != null) {
                count += countInterfaces(superclass);
                superclass = superclass.getSuperclass();
            }
        }
        return count;
    }

    @Override
    public float calculate(MultipartFile file) {
        try {
            Class<?> clazz = DynamicClassLoading.DynamicClassLoad(file);
            return countInterfaces(clazz);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return -1;
        }
    }

    @Override
    public MetricResultModel execute(MultipartFile file) {
        return new MetricResultModel(this.metricName, String.valueOf(this.calculate(file)));
    }
}

