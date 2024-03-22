package com.example.demo.Service;
import com.example.demo.DTO.*;
import com.example.demo.Model.Metric;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MetricService {
    private metricRepository metricRepository ;
    private MetricToMetricDTO entityToDTOMapper;


    @Autowired
    public MetricService(metricRepository metricRepository , MetricToMetricDTO entityToDTOMapper) {
        this.metricRepository = metricRepository;
        this.entityToDTOMapper = entityToDTOMapper;

    }


    public List<MetricDTO> getAllMetricsDTO() {
        List<Metric> metrics = metricRepository.findAll();
        return metrics.stream()
                .map(entityToDTOMapper)
                .collect(Collectors.toList());
    }

}
