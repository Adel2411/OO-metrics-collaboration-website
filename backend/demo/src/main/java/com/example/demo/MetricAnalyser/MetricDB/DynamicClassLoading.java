package com.example.demo.MetricAnalyser.MetricDB;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.net.URLClassLoader;

class DynamicClassLoading {

    public static Class<?> DynamicClassLoad(MultipartFile file) throws Exception {
        // Save the uploaded Java file
        File javaFile = saveJavaFile(file);

        // Compile the Java file
        compileJavaFile(javaFile.getAbsolutePath());

        // Load the compiled class dynamically
        return loadCompiledClass(javaFile);
    }

    private static File saveJavaFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        File tempFile = File.createTempFile("temp", fileName.substring(fileName.lastIndexOf('.')));
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(file.getBytes());
        }
        return tempFile;
    }

    private static void compileJavaFile(String filePath) throws IOException, InterruptedException {
        Process compileProcess = Runtime.getRuntime().exec("javac " + filePath);
        int exitCode = compileProcess.waitFor();
        if (exitCode != 0) {
            throw new RuntimeException("Compilation failed.");
        }
    }

    private static Class<?> loadCompiledClass(File javaFile) throws Exception {
        File classFile = new File(javaFile.getParentFile(), javaFile.getName().replace(".java", ".class"));
        URLClassLoader classLoader = URLClassLoader.newInstance(new URL[]{classFile.toURI().toURL()});
        return classLoader.loadClass(javaFile.getName().replace(".java", ""));
    }
}
