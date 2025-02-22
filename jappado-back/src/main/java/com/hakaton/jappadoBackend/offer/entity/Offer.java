package com.hakaton.jappadoBackend.offer.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "candidate_id", nullable = false)
    private Long candidateId;  // 후보자 ID

    @Column(name = "company_id", nullable = false)
    private Long companyId;    // 기업 ID

    private String jobTitle;
    private String jobDescription;
    private String proposedSalary;

    // pending, accepted, rejected
    private String status = "pending";

    public void updateStatus(String status) {
        this.status = status;
    }
}

