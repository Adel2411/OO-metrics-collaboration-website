package com.example.demo.MetricAnalyser.MetricDB;
import com.example.demo.MetricAnalyser.MetricResultModel;
import com.example.demo.MetricAnalyser.MetricStructure;
import com.github.javaparser.JavaParser;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.body.ClassOrInterfaceDeclaration;
import com.github.javaparser.ast.body.FieldDeclaration;
import com.github.javaparser.ast.body.MethodDeclaration;
import com.github.javaparser.ast.body.VariableDeclarator;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;
import com.github.javaparser.ast.expr.NameExpr;
import com.github.javaparser.ast.visitor.VoidVisitorAdapter;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

public class AUC extends MetricStructure {

    private final Map<String, Integer> attributeUsageCount = new HashMap<>();
    private final Map<String, Set<String>> methodAttributeUsage = new HashMap<>();
    private int numberOfMethods = 0;
    private final ArrayList<String> methodsNames = new ArrayList<>();

    public AUC(String metricName) {
        super(metricName);
    }

    public void countAttributeUsage(InputStream inputStream) {
        try {
            JavaParser javaParser = new JavaParser();
            CompilationUnit cu = javaParser.parse(inputStream).getResult().orElseThrow();
            cu.accept(new VoidVisitorAdapter<Object>() {
                @Override
                public void visit(ClassOrInterfaceDeclaration n, Object arg) {
                    for (MethodDeclaration method : n.getMethods()) {
                        method.accept(this, null);
                        numberOfMethods++;
                        System.out.println("Method " + numberOfMethods);
                        methodsNames.add(method.getNameAsString());
                    }
                    super.visit(n, arg);
                }


                @Override
                public void visit(FieldDeclaration n, Object arg) {
                    for (VariableDeclarator var : n.getVariables()) {
                        String attributeName = var.getNameAsString();
                        methodAttributeUsage.put(attributeName, new HashSet<>());
                        attributeUsageCount.put(attributeName, -1);
                    }
                    super.visit(n, arg);
                }

                @Override
                public void visit(NameExpr n, Object arg) {
                    String name = n.getNameAsString();
                    if (attributeUsageCount.containsKey(name)) {
                        attributeUsageCount.put(name, attributeUsageCount.get(name) + 1);
                        if (arg instanceof MethodDeclaration) {
                            MethodDeclaration method = (MethodDeclaration) arg;
                            String methodName = method.getNameAsString();
                            if (methodAttributeUsage.containsKey(name)) {
                                methodAttributeUsage.get(name).add(methodName);
                            } else {
                                Set<String> methods = new HashSet<>();
                                methods.add(methodName);
                                methodAttributeUsage.put(name, methods);
                            }
                        }
                    }
                    super.visit(n, arg);
                }

                @Override
                public void visit(MethodDeclaration n, Object arg) {
                    methodsNames.add(n.getNameAsString());
                    n.getBody().ifPresent(body -> body.accept(this, n));
                }

                @Override
                public void visit(VariableDeclarator n, Object arg) {
                    String attributeName = n.getNameAsString();
                    attributeUsageCount.put(attributeName, attributeUsageCount.getOrDefault(attributeName, 0) + 1);
                    super.visit(n, arg);
                }
            }, null);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public float utilisationAttribute() {
        float x = 0;
        for (Map.Entry<String, Set<String>> entry : methodAttributeUsage.entrySet()) {
            x += entry.getValue().size();
        }
        return x;
    }

    @Override
    public float calculate(MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {
            this.countAttributeUsage(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (this.getNumberOfMethods() == 0) {
            return 0;
        }
        return this.utilisationAttribute() / this.getNumberOfMethods();
    }

    @Override
    public MetricResultModel execute(MultipartFile file) {
        return new MetricResultModel(this.metricName, String.valueOf(calculate(file)));
    }

    // Getter for numberOfMethods to match the second code snippet
    public int getNumberOfMethods() {
       return numberOfMethods;
    }

}
