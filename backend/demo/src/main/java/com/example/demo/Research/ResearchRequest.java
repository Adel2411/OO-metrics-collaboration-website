package com.example.demo.Research;


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
