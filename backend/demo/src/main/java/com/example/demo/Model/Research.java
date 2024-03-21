package com.example.demo.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "research")
public class Research {
    @Id
    @GeneratedValue
    private UUID id ;

    @OneToOne
    @JoinColumn(name = "metric_id")
    private Metric metricId;
    private String description;
    private String MathFormula;

    @Transient
    private int status;
}
