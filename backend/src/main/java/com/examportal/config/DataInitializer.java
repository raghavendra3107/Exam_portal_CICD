package com.examportal.config;

import com.examportal.user.User;
import com.examportal.user.UserRepository;
import com.examportal.user.UserRole;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CommandLineRunner seedUsers(UserRepository repo, PasswordEncoder encoder) {
        return args -> {
            if (repo.findByUsername("student@example.com").isEmpty()) {
                User s = new User();
                s.setUsername("student@example.com");
                s.setPasswordHash(encoder.encode("student123"));
                s.setRole(UserRole.STUDENT);
                repo.save(s);
            }
            if (repo.findByUsername("teacher").isEmpty()) {
                User t = new User();
                t.setUsername("teacher");
                t.setPasswordHash(encoder.encode("teacher123"));
                t.setRole(UserRole.TEACHER);
                repo.save(t);
            }
        };
    }
}


