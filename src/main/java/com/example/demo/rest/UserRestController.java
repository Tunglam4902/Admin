package com.example.demo.rest;

import com.example.demo.dao.UserRepository;
import com.example.demo.entity.User;
import com.example.demo.service.RoleService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api")

public class UserRestController  {
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;
    @GetMapping("/users")
    public List<User> findAll(){
        return userService.findAll();
    }
    @PostMapping("/register")
    public User register(@RequestBody User user){
        user.setEmail(user.getEmail());
        user.setPassword(user.getPassword());
        user.setUsername(user.getUsername());
        user.setRole(roleService.findById(1));
        user.setToken(generateRandomString(20));
        return userService.save(user);
    }
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user){
        User client = userService.checkLogin(user.getUsername(), user.getPassword());
        if (client != null){
            Map<String, String> body = new HashMap<>();
            body.put("code", "200");
            body.put("token", client.getToken());
            return body;
        }
        else {
            Map<String, String> body = new HashMap<>();
            body.put("code", "400");
            body.put("message", "Đăng nhập không thành công");
            return body;
        }
    }
    public static String generateRandomString(int length) {
        // Tập hợp ký tự ban đầu
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        // Đối tượng SecureRandom để tạo số ngẫu nhiên an toàn
        SecureRandom random = new SecureRandom();

        StringBuilder sb = new StringBuilder(length);

        // Tạo chuỗi ngẫu nhiên
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            sb.append(randomChar);
        }

        return sb.toString();
    }
}
