package com.homeorholiday.backend.service;

import com.homeorholiday.backend.dto.UserResponse;
import com.homeorholiday.backend.dto.auth.AuthResponse;
import com.homeorholiday.backend.dto.auth.LoginUserRequest;
import com.homeorholiday.backend.dto.auth.RefreshTokenRequest;
import com.homeorholiday.backend.dto.auth.RegisterUserRequest;
import com.homeorholiday.backend.model.User;
import com.homeorholiday.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;

    @Transactional
    public AuthResponse registerUser(RegisterUserRequest request) {
        // Check if user email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered: " + request.getEmail());
        }

        try {
            User user = User.builder()
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .build();

            User savedUser = userRepository.save(user);

            // Generate JWT
            UserDetails userDetails = userDetailsService.loadUserByUsername(savedUser.getEmail());
            String accessToken = jwtService.generateToken(userDetails);
            String refreshToken = jwtService.generateRefreshToken(userDetails);

            return  AuthResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .tokenType("Bearer")
                    .expiresIn(jwtService.getJwtExpirationMs() / 1000) // Convert to seconds
                    .user(new UserResponse(savedUser))
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("User registration failed: " + e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public AuthResponse loginUser(LoginUserRequest request) {
        try {
            // Authenticate user credentials
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userDetailsService.loadUserEntityByEmail(userDetails.getUsername());

            // Generate JWT
            String accessToken = jwtService.generateToken(userDetails);
            String refreshToken = jwtService.generateRefreshToken(userDetails);

            return AuthResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .tokenType("Bearer")
                    .expiresIn(jwtService.getJwtExpirationMs() / 1000) // Convert to seconds
                    .user(new UserResponse(user))
                    .build();


        } catch (BadCredentialsException e) {
            throw new RuntimeException("Invalid email or password");
        } catch (Exception e) {
            throw new RuntimeException("Authentication failed: " + e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        try {
            final String refreshToken = request.getRefreshToken();
            final String userEmail = jwtService.extractUsername(refreshToken);

            if (userEmail != null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
                User user = userDetailsService.loadUserEntityByEmail(userEmail);

                if (jwtService.isTokenValid(refreshToken, userDetails)) {
                    String newAccessToken = jwtService.generateToken(userDetails);

                    return AuthResponse.builder()
                            .accessToken(newAccessToken)
                            .refreshToken(refreshToken) // Keep the same refresh token
                            .tokenType("Bearer")
                            .expiresIn(jwtService.getRefreshExpirationMs() / 1000) // Convert to seconds
                            .user(new UserResponse(user))
                            .build();
                }
            }

            throw new RuntimeException("Invalid refresh token");

        } catch (Exception e) {
            throw new RuntimeException("Token refresh failed: " + e.getMessage());
        }
    }
}
