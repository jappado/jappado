package com.hakaton.jappadoBackend.auth.dto;

import com.hakaton.jappadoBackend.user.entity.Role;

public record SignupRequestDto(
    String email,
    String password,
    Role role
) {
}
