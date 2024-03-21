package com.example.demo.repository;

import com.example.demo.Model.Metric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface metricRepository extends JpaRepository<Metric, UUID> {
    @Query(value = "SELECT m.*, " +
            "CASE WHEN EXISTS (SELECT 1 FROM research r WHERE r.metric_id = m.id) " +
            "THEN 1 ELSE 0 END AS status " +
            "FROM metrics m", nativeQuery = true)
    List<Object[]> getAllMetricsWithStatus();
}
