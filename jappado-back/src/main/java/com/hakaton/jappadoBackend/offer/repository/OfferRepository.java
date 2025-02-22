package com.hakaton.jappadoBackend.offer.repository;

import com.hakaton.jappadoBackend.offer.entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OfferRepository extends JpaRepository<Offer, Long> {
    List<Offer> findByCandidateId(Long candidateId);
}