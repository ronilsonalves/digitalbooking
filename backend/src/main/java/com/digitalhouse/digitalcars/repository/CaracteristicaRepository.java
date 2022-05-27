package com.digitalhouse.digitalcars.repository;

import com.digitalhouse.digitalcars.model.Caracteristica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaracteristicaRepository extends JpaRepository<Caracteristica, Integer> {
}
