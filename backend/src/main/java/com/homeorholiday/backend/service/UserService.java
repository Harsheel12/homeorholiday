package com.homeorholiday.backend.service;

import com.homeorholiday.backend.dto.CreateUserInput;
import com.homeorholiday.backend.dto.UserResponse;
import com.homeorholiday.backend.model.User;
import com.homeorholiday.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserResponse::new)
                .collect(Collectors.toList());
    }

    public UserResponse createUser(CreateUserInput input) {

        // Check if email already exists
        if (userRepository.isEmailExisting(input.getEmail())) {
            throw new RuntimeException("Email already exists: " + input.getEmail());
        }

        // Create new user entity
        User user = new User();
        user.setFirstName(input.getFirstName());
        user.setLastName(input.getLastName());
        user.setEmail(input.getEmail());
        user.setPassword(input.getPassword());

        // Save and return response
        User savedUser = userRepository.save(user);

        return new UserResponse(savedUser);
    }

    public UserResponse getUserById(Long id) {

        Optional<User> user = userRepository.findById(id);

        if (user.isPresent()) {
            return new UserResponse(user.get());
        }

        throw new RuntimeException("User not found with id: " + id);
    }

    public UserResponse getUserByEmail(String email) {

        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            return new UserResponse(user.get());
        }

        throw new RuntimeException("User not found with email: " + email);
    }

    public boolean isEmailExisting(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        return user.isPresent();
    }
}
