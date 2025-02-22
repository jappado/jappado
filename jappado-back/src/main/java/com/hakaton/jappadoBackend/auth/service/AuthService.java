package com.hakaton.jappadoBackend.auth.service;

import com.hakaton.jappadoBackend.auth.dto.SignupRequestDto;
import com.hakaton.jappadoBackend.user.entity.User;
import com.hakaton.jappadoBackend.user.repository.UserRepository;
import com.hakaton.jappadoBackend.util.LoggerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final LoggerUtil logger = LoggerUtil.getInstance();

    @Autowired
    private UserRepository userRepository;

    /**
     * 새로운 사용자를 등록합니다.
     *
     * @param request 회원가입에 필요한 데이터를 담은 SignupRequestDto 객체.
     *                  email: 사용자의 이메일 주소
     *                  password: 사용자의 비밀번호
     *                  name: 사용자의 이름
     *                  role: 사용자의 역할
     * @return 데이터베이스에 저장된 후 생성된 User 엔티티 객체.
     */
    public User registerUser(SignupRequestDto request) {
        User user = User.builder()
                .email(request.email())
                .password(request.password())
                .role(request.role())
                .build();
        logger.info("📌 [AuthService] registerUser 처리: ", user);
        return userRepository.save(user);
    }

    /**
     * 주어진 이메일과 비밀번호로 사용자를 인증합니다.
     *
     * @param email 인증에 사용될 사용자의 이메일 주소.
     * @param password 인증에 사용될 사용자의 비밀번호.
     * @return 이메일과 비밀번호가 일치하는 사용자가 존재하면 해당 User 엔티티를 반환하고,
     *         그렇지 않으면 null을 반환합니다.
     */
    public User authenticate(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password).orElse(null);
    }
}
