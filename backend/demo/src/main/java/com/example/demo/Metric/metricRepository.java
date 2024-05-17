package com.example.demo.Metric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;
@Repository
public interface metricRepository extends JpaRepository<Metric, UUID> {
}
