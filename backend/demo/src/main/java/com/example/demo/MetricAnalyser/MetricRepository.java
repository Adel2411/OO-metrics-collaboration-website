package com.example.demo.MetricAnalyser;
import com.example.demo.MetricAnalyser.MetricDB.*;

import java.util.ArrayList;
import java.util.List;

public class MetricRepository {
    public ArrayList<MetricAnalyser> analyse_metrics;

    public MetricRepository() {
        this.analyse_metrics = new ArrayList<>(
                List.of(
                        new HandledExceptions("HandledExceptions"),
//                        new InterfaceCounter("InterfaceCounter"),
                        new NumberOfImportedClasses("NumberOfImportedClasses"),
                        new NumberOfImportedClassesUsed("NumberOfImportedClassesUsed"),
                        new NumberOfUsedMethodsFromImports("NumberOfUsedMethodsFromImports"),
                        new NumberOfInterfacesImplemented("NumberOfInterfacesImplemented")
                )
        );
    }
}
