package com.example.demo.service;

import com.example.demo.dao.UserRepository;
import com.example.demo.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }
    @Override
    public User checkLogin(String username, String pasword) {
        return userRepository.findByUsernameAndPassword(username, pasword);
    }
    @Override
    public User findById(int id) {
        return userRepository.findById(id).get();
    }

}
