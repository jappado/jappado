package com.hakaton.jappadoBackend.auth.controller;

import com.hakaton.jappadoBackend.auth.dto.*;
import com.hakaton.jappadoBackend.auth.service.AuthService;
import com.hakaton.jappadoBackend.user.entity.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // ✅ 회원가입
    @PostMapping("/signup")
    public ResponseEntity<SignupResponseDto> signup(@RequestBody SignupRequestDto request) {
        User user = authService.registerUser(request);
        SignupResponseDto response = new SignupResponseDto(user.getId(), user.getEmail(), user.getRole());
        return ResponseEntity.ok(response);
    }

    // ✅ 로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto request, HttpSession session) {
        User user = authService.authenticate(request.email(), request.password());
        if (user != null) {
            session.setAttribute("user", user);
            return ResponseEntity.ok(new LoginResponseDto("로그인 성공", user.getId(), user.getRole()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponseDto("로그인 실패", null, null));
        }
    }

    // ✅ 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<LogoutResponseDto> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(new LogoutResponseDto("로그아웃 완료"));
    }

    // ✅ 현재 로그인한 사용자 정보 조회
    @GetMapping("/info")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            UserResponseDto response = new UserResponseDto(user.getId(), user.getEmail(), user.getName(), user.getRole());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponseDto("세션 없음", null, null));
        }
    }
}
