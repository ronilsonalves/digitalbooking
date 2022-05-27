package com.digitalhouse.digitalcars.controller;

import com.digitalhouse.digitalcars.model.Cidade;
import com.digitalhouse.digitalcars.service.CidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/cidade")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CidadeController {

    @Autowired
    private CidadeService cidadeService;

    @PostMapping
    public ResponseEntity<Cidade> adicionarCidade (@RequestBody @Valid Cidade cidade) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cidadeService.cadastrarCidade(cidade));
    }

    @GetMapping
    public ResponseEntity<List<Cidade>> listarTodasCidades() {
        return ResponseEntity.ok(cidadeService.buscarCidades());
    }
}
