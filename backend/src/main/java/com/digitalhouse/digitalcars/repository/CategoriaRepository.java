package com.digitalhouse.digitalcars.repository;

import com.digitalhouse.digitalcars.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {

    List<Categoria> findByTitulo(String titulo);
}
