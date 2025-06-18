package com.homeorholiday.backend.controller;

import com.homeorholiday.backend.dto.CreateUserInput;
import com.homeorholiday.backend.model.User;
import com.homeorholiday.backend.service.UserService;
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
    public List<User> users() {
        return userService.getAllUsers();
    }

    // Query to get user by ID
    @QueryMapping
    public User user(@Argument Long id) {
        return userService.getUserById(id);
    }

    // Mutation to create a new user
    @MutationMapping
    public User createUser(@Argument CreateUserInput input) {
        return userService.createUser(input.getFirstName());
    }
}
