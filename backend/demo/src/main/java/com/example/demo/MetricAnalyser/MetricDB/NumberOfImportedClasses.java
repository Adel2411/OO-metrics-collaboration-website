package com.example.demo.MetricAnalyser.MetricDB;

import com.example.demo.MetricAnalyser.MetricResultModel;
import com.example.demo.MetricAnalyser.MetricStructure;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.HashSet;
import java.util.Set;

public class NumberOfImportedClasses extends MetricStructure {

    public NumberOfImportedClasses(String metricName) {
        super(metricName);
    }

    public Set<String> getImportedPackages(InputStream inputStream) throws IOException {
        Set<String> packages = new HashSet<>();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            String line;
            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (line.startsWith("import ")) {
                    String packageName = line.substring(7, line.length() - 1); // 7 is the length of "import "
                    if (packageName.endsWith(".*")) {
                        String rootPackage = packageName.substring(0, packageName.length() - 2);
                        addClassesOfPackage(rootPackage, packages);
                        // addSubPackages(packages, rootPackage);   // Uncomment this line to include the
                        // subpackages
                        // packages.add(rootPackage);   // Uncomment this line to include the root package in
                        // the imported packages
                    } else {
                        packages.add(packageName.replace(".", "/"));
                    }
                }
            }
        }
        return packages;
    }

    public void addClassesOfPackage(String packageName, Set<String> importedPackages) {
        String packagePath = packageName.replace('.', '/');
        String javaHome = System.getProperty("java.home");

        try (BufferedReader reader = new BufferedReader(new FileReader(javaHome + "/lib/classlist"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (line.startsWith(packagePath) && !line.contains("$")) {
                    line = line.substring(packagePath.length() + 1);
                    if (!line.contains("/")) {
                        importedPackages.add(line);
                    }
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public float calculate(MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {
            return this.getImportedPackages(inputStream).size();
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return -1;
        }
    }

    @Override
    public MetricResultModel execute(MultipartFile file) {
        return new MetricResultModel(this.metricName, String.valueOf(this.calculate(file)));
    }
}
