package com.example.demo.Service;

import com.example.demo.Model.Metric;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class MetricService {
    private metricRepository metricRepository ;

    @Autowired
    public MetricService(metricRepository metricRepository) {
        this.metricRepository = metricRepository;
    }


    public List<Metric> getAllMetricsWithStatus() {
        List<Object[]> metricStatusList = metricRepository.getAllMetricsWithStatus();
        List<Metric> metrics = new ArrayList<>();
        for (Object[] metricStatus : metricStatusList) {
            Metric metric = Metric.builder()
                    .id(UUID.fromString(metricStatus[0].toString()))
                    .name(metricStatus[1].toString())
                    .status(Integer.parseInt(metricStatus[2].toString())
                    ).build();
            metrics.add(metric);
        }
        return  metrics;
    }

}
