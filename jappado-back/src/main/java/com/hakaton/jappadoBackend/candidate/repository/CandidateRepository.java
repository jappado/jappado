package com.hakaton.jappadoBackend.candidate.repository;

import com.hakaton.jappadoBackend.candidate.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
}
