package com.digitalhouse.digitalcars.repository;

import com.digitalhouse.digitalcars.model.Cidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CidadeRepository extends JpaRepository<Cidade, Integer> {

    List<Cidade> findByNome(String nome);
}
