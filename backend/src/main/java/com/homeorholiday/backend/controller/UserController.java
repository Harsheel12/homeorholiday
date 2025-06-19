package com.homeorholiday.backend.controller;

import com.homeorholiday.backend.dto.CreateUserInput;
import com.homeorholiday.backend.dto.UserResponse;
import com.homeorholiday.backend.model.User;
import com.homeorholiday.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    // Query to get all users
    @QueryMapping
    public List<UserResponse> users() {
        return userService.getAllUsers();
    }

    // Query to get user by ID
    @QueryMapping
    public UserResponse user(@Argument Long id) {
        return userService.getUserById(id);
    }

    // Query to get user by email
    @QueryMapping
    public UserResponse userByEmail(@Argument String email) {
        return userService.getUserByEmail(email);
    }

    // Query to check if email already exists
    @QueryMapping
    public boolean isEmailExisting(@Argument String email) {
        return userService.isEmailExisting(email);
    }

    // Mutation to create a new user
    @MutationMapping
    public UserResponse createUser(@Valid @Argument CreateUserInput input) {
        return userService.createUser(input);
    }
}
