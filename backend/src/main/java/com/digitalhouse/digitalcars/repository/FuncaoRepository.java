package com.digitalhouse.digitalcars.repository;

import com.digitalhouse.digitalcars.model.Funcao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FuncaoRepository extends JpaRepository<Funcao, Integer> {

    Funcao findByNome(String nome);
}
