package com.example.demo.rest;

import com.example.demo.dao.UserRepository;
import com.example.demo.entity.User;
import com.example.demo.service.RoleService;
import com.example.demo.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
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
@CrossOrigin(origins = "*")
public class UserRestController  {
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;
    @GetMapping("/users")
    @CrossOrigin(origins = "*")
    public List<User> findAll(){
        return userService.findAll();
    }

    @GetMapping("/test")
    public String allAccess() {
        return "ok";
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user){
        if (userService.checkUsername(user.getUsername()) == null){
            user.setEmail(user.getEmail());
            user.setPassword(user.getPassword());
            user.setUsername(user.getUsername());
            user.setRole(roleService.findById(1));
            user.setToken(generateRandomString(20));
            userService.save(user);
            Map<String, String> body = new HashMap<>();
            body.put("code", "200");
            body.put("token", user.getToken());
            return body;
        }
        else {
            Map<String, String> body = new HashMap<>();
            body.put("code", "400");
            body.put("message", "Username đã được sử dụng");
            return body;
        }
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
    @PutMapping("/update_role")
    @CrossOrigin(origins = "*")
    public Map<String, String> update(@RequestBody User user, HttpServletRequest request){
        String token = request.getHeader("Authorization");
        if (token == null){
            Map<String, String> body = new HashMap<>();
            body.put("code", "400");
            body.put("Message", "Bạn không có quyền truy cập");
            return body;
        }
        String[] tmp = token.split(" ");
        token = tmp[1];
        User admin = userService.findByToken(token);
        if (admin == null){
            Map<String, String> body = new HashMap<>();
            body.put("code", "400");
            body.put("Message", "Expired token");
            return body;
        }
        if (admin.getRole().getId() != 3){
            Map<String, String> body = new HashMap<>();
            body.put("code", "400");
            body.put("Message", "Bạn không đủ quyền truy cập");
            return body;
        }
        User client = userService.findById(user.getId());
        if (client != null){
            client.setRole(roleService.findById(user.getRole().getId()));
            userService.save(client);
            Map<String, String> body = new HashMap<>();
            body.put("code", "200");
            body.put("message", "Cập nhật thành công");
            return body;
        }
        else {
            Map<String, String> body = new HashMap<>();
            body.put("code", "400");
            body.put("message", "Cập nhật không thành công");
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
