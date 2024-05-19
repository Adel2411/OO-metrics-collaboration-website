package com.example.demo.MetricAnalyser.MetricDB;

import com.example.demo.MetricAnalyser.MetricResultModel;
import com.example.demo.MetricAnalyser.MetricStructure;
import org.springframework.web.multipart.MultipartFile;
import java.io.BufferedReader;
import java.io.FileReader;
import java.util.StringTokenizer;

public class RUEMetric extends MetricStructure {
    private long pid;

    public RUEMetric(String metricName) {
        super(metricName);
        // Get PID of the current Java process
        this.pid = ProcessHandle.current().pid();
    }

    public float getCPUUsage() {
        try (BufferedReader reader = new BufferedReader(new FileReader("/proc/" + pid + "/stat"))) {
            String line = reader.readLine();
            if (line != null) {
                StringTokenizer tokenizer = new StringTokenizer(line);
                // Skip irrelevant fields
                for (int i = 1; i < 14; i++) {
                    tokenizer.nextToken();
                }
                // Extract CPU time spent in user mode and kernel mode
                long utime = Long.parseLong(tokenizer.nextToken());
                long stime = Long.parseLong(tokenizer.nextToken());
                long totalCpuTime = utime + stime;

                // Read total elapsed time since system boot
                long uptime = readUptime();

                // Calculate CPU usage percentage
                return (float) (100.0 * totalCpuTime / uptime);
            } else {
                throw new IllegalStateException("Error: Unable to read CPU usage");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return 0.0F; // Return 0 if unable to retrieve CPU usage
        }
    }

    private long readUptime() throws Exception {
        try (BufferedReader reader = new BufferedReader(new FileReader("/proc/uptime"))) {
            String line = reader.readLine();
            if (line != null) {
                return (long) Float.parseFloat(line.split("\\s+")[0]);
            } else {
                throw new IllegalStateException("Error: Unable to read system uptime");
            }
        }
    }

    @Override
    public float calculate(MultipartFile file) {
        // The file parameter is not used in this specific metric as it is related to system resource usage.
        return this.getCPUUsage();
    }

    @Override
    public MetricResultModel execute(MultipartFile file) {
        return new MetricResultModel(this.metricName, String.valueOf(calculate(file)) + "%");
    }
}
