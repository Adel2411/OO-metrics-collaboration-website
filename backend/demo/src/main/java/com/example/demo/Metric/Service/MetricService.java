package com.example.demo.Metric.Service;
import com.example.demo.DTO.*;
import com.example.demo.Metric.Model.MetricDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MetricService {
    private EntityToDTOMapper entityToDTOMapper;


    @Autowired
    public MetricService(EntityToDTOMapper entityToDTOMapper) {
        this.entityToDTOMapper = entityToDTOMapper;

    }


    public List<MetricDTO> getAllMetricsDTO() {
        List<?> metrics = findAllMetricsWithAssociations();
        return metrics.stream()
                .map(e-> entityToDTOMapper.apply((Object[]) e))
                .collect(Collectors.toList());
    }

    @PersistenceContext
    private EntityManager entityManager;

    public List<?> findAllMetricsWithAssociations() {

        String jpql = "SELECT m.id , m.name , r.id , c.id FROM Metric m LEFT JOIN Research r ON m.id = r.metricId.id LEFT JOIN CodeImplementation c ON r.id = c.researchId.id";
        Query query = entityManager.createQuery(jpql);

        return query.getResultList();
    }
}
