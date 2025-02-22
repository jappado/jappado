package com.hakaton.jappadoBackend.user.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String name;

    private String address;

    @Column(nullable = false)
    private Role role; // "CANDIDATE" or "COMPANY"

    @Column
    private String phone;

    @ElementCollection
    private List<String> skills;

    @Column
    private String experience;

    @Column
    private String desiredLocation;

    @Column
    private String desiredJobType;
}
