package com.hakaton.jappadoBackend.auth.dto;

public record LoginRequestDto(
    String email,
    String password
) {
}
