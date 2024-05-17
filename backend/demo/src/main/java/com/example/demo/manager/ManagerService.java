package com.example.demo.manager;

import com.example.demo.User.UserRole;
import com.example.demo.User.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ManagerService {

    final UserRoleRepository userRoleRepository;

    public List<?> getAdmins(){
        return userRoleRepository.findAllUserWithRole();
    }



}
