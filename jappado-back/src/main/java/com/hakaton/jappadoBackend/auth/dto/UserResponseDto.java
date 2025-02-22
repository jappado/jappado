package com.hakaton.jappadoBackend.auth.dto;

import com.hakaton.jappadoBackend.user.entity.Role;

public record UserResponseDto(
        Long id,
        String email,
        String name,
        Role role
) {}