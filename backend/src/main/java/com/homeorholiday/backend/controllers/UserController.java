package com.homeorholiday.backend.controllers;

import com.homeorholiday.backend.User;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class UserController {
    @QueryMapping
    public List<User> users() {
        return User.users;
    }
}
