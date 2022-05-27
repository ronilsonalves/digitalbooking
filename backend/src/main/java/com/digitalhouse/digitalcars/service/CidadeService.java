package com.digitalhouse.digitalcars.service;

import com.digitalhouse.digitalcars.model.Cidade;
import com.digitalhouse.digitalcars.repository.CidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CidadeService {

    @Autowired
    private CidadeRepository cidadeRepository;

    public Cidade cadastrarCidade(Cidade cidade){
        return cidadeRepository.save(cidade);
    }

    public List<Cidade> buscarCidades(){
        return cidadeRepository.findAll();
    }

    public List<Cidade> findByNome(String nome){
        return cidadeRepository.findByNome(nome);
    }
}
