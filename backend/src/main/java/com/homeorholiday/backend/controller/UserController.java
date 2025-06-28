package com.homeorholiday.backend.controller;

import com.homeorholiday.backend.dto.auth.RegisterUserRequest;
import com.homeorholiday.backend.dto.UserResponse;
import com.homeorholiday.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * Get all users
     */
    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public List<UserResponse> users() {
        return userService.getAllUsers();
    }

    /**
     * Get a user by id
     */
    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public UserResponse user(@Argument Long id) {
        return userService.getUserById(id);
    }

    /**
     * Get a user by email
     */
    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public UserResponse userByEmail(@Argument String email) {
        return userService.getUserByEmail(email);
    }

    /**
     * Check if email already exists
     */
    @QueryMapping
    public boolean isEmailExisting(@Argument String email) {
        return userService.isEmailExisting(email);
    }
}
