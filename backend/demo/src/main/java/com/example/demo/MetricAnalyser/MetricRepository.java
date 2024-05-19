package com.example.demo.MetricAnalyser;
import com.example.demo.MetricAnalyser.MetricDB.*;

import java.util.ArrayList;
import java.util.List;

public class MetricRepository {
    public ArrayList<MetricAnalyser> analyse_metrics;

    public MetricRepository() {
        this.analyse_metrics = new ArrayList<>(
                List.of(
                        new HandledExceptions("Handled Exceptions"),
                        new NumberOfImportedClasses("Number Of Imported Classes"),
                        new NumberOfImportedClassesUsed("Number Of Imported Classes Used"),
                        new NumberOfUsedMethodsFromImports("Number Of Used Methods From Imports"),
                        new NumberOfInterfacesImplemented("Number Of Interfaces Implemented"),
                        // TODO : try to fix the error
//                        new AUC("Attribute Usage Count"),
                        new RUEMetric("RUE Metric"),
                        new WebImportCounter("Web Import Counter"),
                        new NonPrimitiveVariableCounter("Non Primitive Variable Counter")
                )
        );
    }
}
