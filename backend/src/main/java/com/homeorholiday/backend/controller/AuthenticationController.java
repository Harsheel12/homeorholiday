package com.homeorholiday.backend.controller;

import com.homeorholiday.backend.dto.UserResponse;
import com.homeorholiday.backend.dto.auth.AuthResponse;
import com.homeorholiday.backend.dto.auth.LoginUserRequest;
import com.homeorholiday.backend.dto.auth.RefreshTokenRequest;
import com.homeorholiday.backend.dto.auth.RegisterUserRequest;
import com.homeorholiday.backend.service.AuthenticationService;
import com.homeorholiday.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;
    private final UserService userService;

    /**
     * Register a new user
     */
    @MutationMapping
    public AuthResponse registerUser(@Valid @Argument RegisterUserRequest input) {
        return authService.registerUser(input);
    }

    /**
     * Login user
     */
    @MutationMapping
    public AuthResponse loginUser(@Valid @Argument LoginUserRequest input) {
        return authService.loginUser(input);
    }

    /**
     * Refresh access token
     */
    @MutationMapping
    public AuthResponse refreshToken(@Valid @Argument RefreshTokenRequest input) {
        return authService.refreshToken(input);
    }

    /**
     * Validate current access token
     * Protected endpoint - requires valid JWT token
     */
    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public Boolean validateToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return authentication != null && authentication.isAuthenticated();
    }

    /**
     * Get current user profile
     * Protected endpoint - requires valid JWT token
     */
    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public UserResponse me(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            return userService.getUserByEmail(email);
        }
        throw new RuntimeException("User not authenticated");
    }
}
