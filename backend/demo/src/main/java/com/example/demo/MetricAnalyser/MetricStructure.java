package com.example.demo.MetricAnalyser;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public abstract class MetricStructure implements MetricAnalyser{
    protected String metricName;

        public MetricStructure(String metricName) {
            this.metricName = metricName;
        }

}
