package com.example.demo.service;

import com.example.demo.dao.RoleRepository;
import com.example.demo.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService{
    @Autowired
    private RoleRepository roleRepository;
    @Override
    public Role findById(int id) {
        return roleRepository.findById(id).get();
    }
}
