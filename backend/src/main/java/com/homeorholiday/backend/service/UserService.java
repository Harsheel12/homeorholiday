package com.homeorholiday.backend.service;

import com.homeorholiday.backend.dto.auth.RegisterUserRequest;
import com.homeorholiday.backend.dto.UserResponse;
import com.homeorholiday.backend.model.User;
import com.homeorholiday.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserResponse::new)
                .collect(Collectors.toList());
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
