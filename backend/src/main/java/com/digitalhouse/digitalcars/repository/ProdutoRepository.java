package com.digitalhouse.digitalcars.repository;

import com.digitalhouse.digitalcars.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {

    List<Produto> findListaDeProdutosByCidadeNomeIgnoringCase(String nome);

    List<Produto> findListaDeProdutosByCidadeId(Integer id);

    List<Produto> findListaDeProdutosByCategoriaId(Integer id);

    List<Produto> findTop6ByOrderByCidadeDescCategoriaAsc();

}
