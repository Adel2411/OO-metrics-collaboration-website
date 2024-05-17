package com.example.demo.manager;

import com.example.demo.Exceptions.UserAlreadyExistsException;
import com.example.demo.User.Model.Roles;
import com.example.demo.User.Model.UserID;
import com.example.demo.auth.AuthenticationService;
import com.example.demo.auth.RegisterRequest;
import com.example.demo.Exceptions.AdminNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/manager")
@RequiredArgsConstructor
public class ManagerController {

    final ManagerService managerService;
    final AuthenticationService authenticationService;

    @GetMapping("/get/admins")
    public ResponseEntity<List<UserID>> getAdmins(){
        List<UserID> admins = managerService.getAdmins();
        return ResponseEntity.ok(admins);
    }

    @PostMapping("/add/admin")
    public ResponseEntity<?> addAdmin(@RequestBody RegisterRequest registerRequest){
        try {
            String token = authenticationService.register(registerRequest, Roles.ADMIN.ordinal()).toString();
            return new ResponseEntity<>(Map.of(
                    "message", "User created successfully",
                    "token", token
            ), HttpStatus.CREATED);
        } catch (UserAlreadyExistsException e) {
            return new ResponseEntity<>(Map.of(
                    "message", "User creation failed",
                    "errors", Map.of("username", "Username already exists")
            ), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of(
                    "message", "An unexpected error occurred during user creation",
                    "error", e.getMessage()
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/admin")
    public ResponseEntity<?> deleteAdmin(@RequestParam("adminId") String adminId){
        try{
            managerService.deleteAdmin(adminId);
            return ResponseEntity.ok(Map.of(
                    "message", "Admin deleted successfully"
            ));
        } catch (AdminNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "message", "Admin not found"
            ));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "message", "An unexpected error occurred during admin deletion",
                    "error", e.getMessage()
            ));
        }
    }
}
