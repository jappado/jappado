package com.hakaton.jappadoBackend.auth.dto;

import com.hakaton.jappadoBackend.user.entity.Role;

public record SignupResponseDto(
        Long id,
        String email,
        Role role
) {}
