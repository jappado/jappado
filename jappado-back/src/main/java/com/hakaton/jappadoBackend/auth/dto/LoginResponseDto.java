package com.hakaton.jappadoBackend.auth.dto;

import com.hakaton.jappadoBackend.user.entity.Role;

public record LoginResponseDto(
        String message,
        Long userId,
        Role role
) {}