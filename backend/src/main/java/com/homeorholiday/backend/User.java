package com.homeorholiday.backend;

import java.util.Arrays;
import java.util.List;

public record User(Integer id, String name) {

    public static List<User> users = Arrays.asList(
            new User(1, "John Smith"),
            new User(2, "Jane Smith")
    );

    public static User getById(Integer id) {
        return users.stream().filter(user -> user.id().equals(id)).findFirst().orElse(null);
    }
}
