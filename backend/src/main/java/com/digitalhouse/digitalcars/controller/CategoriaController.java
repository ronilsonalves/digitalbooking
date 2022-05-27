package com.digitalhouse.digitalcars.controller;

import com.digitalhouse.digitalcars.model.Categoria;
import com.digitalhouse.digitalcars.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/categoria")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @PostMapping
    public ResponseEntity<Categoria> adicionarCategoria (@RequestBody @Valid Categoria categoria) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaService.cadastrarCategoria(categoria));
    }

    @GetMapping
    public ResponseEntity<List<Categoria>> listarTodasCategorias() {
        return ResponseEntity.ok(categoriaService.buscarCategorias());
    }

    @PutMapping
    public ResponseEntity<Categoria> editarCategoria(@RequestBody @Valid Categoria categoria) {
        ResponseEntity<Categoria> response = null;
        if(categoria.getId() != null && categoriaService.buscarPorId(categoria.getId()).isPresent())
            response = ResponseEntity.ok(categoriaService.atualizarCategoria(categoria));
        else
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        return response;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarCategoria(@PathVariable Integer id) {
        ResponseEntity<String> response = null;
        if(categoriaService.buscarPorId(id).isPresent()){
            categoriaService.excluirCategoria(id);
            response = ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return response;
    }
}
