package com.example.demo.Requests;


import jakarta.persistence.GeneratedValue;
import lombok.*;





@Getter
@Setter
public class ResearchRequest {
    String Description;
    String MathFormula;
    String MetricId;

    public ResearchRequest(String Description, String MathFormula, String MetricId) {
        this.Description = Description;
        this.MathFormula = MathFormula;
        this.MetricId = MetricId;
    }

    public ResearchRequest() {
    }


    @Override
    public String toString() {
        return "ResearchRequest{" +
                "Description='" + Description + '\'' +
                ", MathFormula='" + MathFormula + '\'' +
                ", MetricId='" + MetricId + '\'' +
                '}';
    }


}
