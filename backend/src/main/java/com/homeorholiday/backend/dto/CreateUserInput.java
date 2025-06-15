package com.homeorholiday.backend.dto;

public class CreateUserInput {
    private String name;

    // Constructors
    public CreateUserInput() {}

    public CreateUserInput(String name) {
        this.name = name;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
