package com.examportal.auth;

import com.examportal.user.User;
import com.examportal.user.UserRepository;
import com.examportal.user.UserRole;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public record LoginRequest(@NotBlank String username, @NotBlank String password) {}
    public record RegisterRequest(@NotBlank String username,
                                  @NotBlank String password,
                                  @Pattern(regexp = "STUDENT|TEACHER", message = "role must be STUDENT or TEACHER") String role) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        return userRepository.findByUsername(request.username())
                .filter(u -> passwordEncoder.matches(request.password(), u.getPasswordHash()))
                .map(u -> ResponseEntity.ok(Map.of(
                        "success", true,
                        "role", u.getRole().name().toLowerCase(),
                        "user", Map.of("username", u.getUsername())
                )))
                .orElseGet(() -> ResponseEntity.status(401).body(Map.of(
                        "success", false,
                        "message", "Invalid credentials"
                )));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "User already exists"));
        }
        User u = new User();
        u.setUsername(request.username());
        u.setPasswordHash(passwordEncoder.encode(request.password()));
        u.setRole(UserRole.valueOf(request.role()));
        userRepository.save(u);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "role", u.getRole().name().toLowerCase(),
                "user", Map.of("username", u.getUsername())
        ));
    }
}


