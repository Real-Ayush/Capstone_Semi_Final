package com.edutech.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.edutech.model.User;
import com.edutech.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User registerUser(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public User getUserByUsername(String username) {

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException(
                        "User not found with username: " + username));
    }

    public List<User> getUserRolesDetails() {
        return userRepository.findAll();
    }

    public User getUserProfile(Long userId) {

        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException(
                        "User not found with id: " + userId));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User not found with username: " + username));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority(user.getRole().name())));
    }

    public String generateResetToken(User user) {
        String token = UUID.randomUUID().toString();

        user.setResetToken(token);
        user.setResetTokenExpiry(LocalDateTime.now().plusMinutes(15));

        userRepository.save(user);
        return token;
    }

    public boolean validateResetToken(String token) {
        User user = userRepository.findByResetToken(token).orElse(null);

        if (user == null) {
            return false;
        }

        if (user.getResetTokenExpiry() == null) {
            return false;
        }

        return user.getResetTokenExpiry().isAfter(LocalDateTime.now());
    }

    // public boolean updatePassword(
    //         String token,
    //         String newPassword) {

    //     User user = userRepository
    //             .findByResetToken(token)
    //             .orElse(null);

    //     if (user == null) {
    //         return false;
    //     }

    //     if (user.getResetTokenExpiry() == null || user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {

    //         return false;
    //     }

    //     user.setPassword(
    //             passwordEncoder.encode(newPassword));

    //     // Clear token after password reset
    //     user.setResetToken(null);

    //     user.setResetTokenExpiry(null);

    //     userRepository.save(user);

    //     return true;
    // }

    // public User getUserByEmail(String email) {
    //     return userRepository.findByEmail(email).orElse(null);
    // }

    // public User getUserByResetToken(String token) {
    //     return userRepository.findByResetToken(token).orElse(null);
    // }
}