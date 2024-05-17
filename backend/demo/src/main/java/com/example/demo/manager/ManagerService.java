package com.example.demo.manager;

import com.example.demo.User.Model.UserID;
import com.example.demo.User.Repository.UserRepository;
import com.example.demo.User.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ManagerService {

    final UserRoleRepository userRoleRepository;
    final UserRepository userRepository;
    public List<UserID> getAdmins(){
        return userRoleRepository.findAdminUsers();
    }

    public void deleteAdmin(String adminId){
        UUID id = UUID.fromString(adminId);
        userRepository.deleteById(id);
    }



}
