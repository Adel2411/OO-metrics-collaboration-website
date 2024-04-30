package com.example.demo.Requests;


import jakarta.persistence.GeneratedValue;
import lombok.*;





@Builder
@Data
public class ResearchRequest {
    String Description;
    String MathFormula;
    String MetricId;

    @Override
    public String toString() {
        return "ResearchRequest{" +
                "Description='" + Description + '\'' +
                ", MathFormula='" + MathFormula + '\'' +
                ", MetricId='" + MetricId + '\'' +
                '}';
    }


}
