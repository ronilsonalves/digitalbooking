package com.digitalhouse.digitalcars.service;

import com.digitalhouse.digitalcars.model.Categoria;
import com.digitalhouse.digitalcars.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public Categoria cadastrarCategoria(Categoria categoria){
        return categoriaRepository.save(categoria);
    }

    public List<Categoria> buscarCategorias(){
        return categoriaRepository.findAll();
    }

    public Optional<Categoria> buscarPorId(Integer id){
        return categoriaRepository.findById(id);
    }

    public Categoria atualizarCategoria(Categoria categoria){
        return categoriaRepository.save(categoria);
    }

    public void excluirCategoria(Integer id){
        categoriaRepository.deleteById(id);
    }
}
