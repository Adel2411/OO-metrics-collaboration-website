package com.example.demo.Metric.Repository;
import com.example.demo.Metric.Model.Metric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;
@Repository
public interface metricRepository extends JpaRepository<Metric, UUID> {
}
