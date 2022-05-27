package com.digitalhouse.digitalcars.controller;

import com.digitalhouse.digitalcars.model.Produto;
import com.digitalhouse.digitalcars.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/produto")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @PostMapping
    public ResponseEntity<Produto> adicionarProduto (@RequestBody @Valid Produto produto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(produtoService.cadastrarProduto(produto));
    }

    @GetMapping
    public ResponseEntity<List<Produto>> listarTodasProdutos() {
        return ResponseEntity.ok(produtoService.buscarProdutos());
    }

    @GetMapping("/recomendacoes")
    public ResponseEntity<List<Produto>> listarRecomendacoes() {
        return ResponseEntity.ok(produtoService.listarRecomendacoes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Produto>> listarProdutoPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(produtoService.buscarPorId(id));
    }

    @GetMapping("/categoria/id/{id}")
    public ResponseEntity<List<Produto>> produtosPorCategoria(@PathVariable Integer id){
        return ResponseEntity.ok(produtoService.buscarProdutoPorCategoriaId(id));
    }

    @GetMapping("/cidade/id/{id}")
    public ResponseEntity<List<Produto>> produtosPorCidade(@PathVariable Integer id){
        return ResponseEntity.ok(produtoService.buscarProdutoPorCidadeId(id));
    }

    @GetMapping("/{cidadeId}/{categoriaId}")
    public ResponseEntity<List<Produto>> produtosPorCidadeECategoria(@PathVariable Integer cidadeId, @PathVariable Integer categoriaId){
        return ResponseEntity.ok(produtoService.produtosPorCidadeECategoria(cidadeId, categoriaId));
    }

    @GetMapping("/datas/{dataInicial}/{dataFinal}")
    public ResponseEntity<?> produtosPorDisponibilidade(@PathVariable("dataInicial") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataInicial, @PathVariable("dataFinal") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataFinal) {
        if(dataInicial == null || dataFinal == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Data Inicial ou Data Final não informada!");
        }
        return ResponseEntity.ok(produtoService.produtosPorDisponibilidade(dataInicial, dataFinal));
    }

    @GetMapping("/cidade/{cidadeId}/{dataInicial}/{dataFinal}")
    public ResponseEntity<?> produtosPorCidadeEDisponibilidade(@PathVariable Integer cidadeId, @PathVariable("dataInicial") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataInicial, @PathVariable("dataFinal") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataFinal) {
        if(dataInicial == null || dataFinal == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Data Inicial ou Data Final não informada!");
        }
        return ResponseEntity.ok(produtoService.produtosPorCidadeEDisponibilidade(cidadeId, dataInicial, dataFinal));
    }

    @GetMapping("/categoria/{categoriaId}/{dataInicial}/{dataFinal}")
    public ResponseEntity<?> produtosPorCategoriaEDisponibilidade(@PathVariable Integer categoriaId, @PathVariable("dataInicial") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataInicial, @PathVariable("dataFinal") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataFinal) {
        if(dataInicial == null || dataFinal == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Data Inicial ou Data Final não informada!");
        }
        return ResponseEntity.ok(produtoService.produtosPorCategoriaEDisponibilidade(categoriaId, dataInicial, dataFinal));
    }

    @GetMapping("/cidade/{cidadeId}/categoria/{categoriaId}/{dataInicial}/{dataFinal}")
    public ResponseEntity<?> produtosPorCidadeCategoriaEDisponibilidade(@PathVariable Integer cidadeId, @PathVariable Integer categoriaId, @PathVariable("dataInicial") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataInicial, @PathVariable("dataFinal") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataFinal) {
        if(dataInicial == null || dataFinal == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Data Inicial ou Data Final não informada!");
        }
        return ResponseEntity.ok(produtoService.produtosPorCidadeCategoriaEDisponibilidade(cidadeId, categoriaId, dataInicial, dataFinal));
    }

    @PutMapping
    public ResponseEntity<Produto> editarProduto(@RequestBody @Valid Produto produto) {
        ResponseEntity<Produto> response = null;
        if(produto.getId() != null && produtoService.buscarPorId(produto.getId()).isPresent())
            response = ResponseEntity.ok(produtoService.atualizarProduto(produto));
        else
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        return response;
    }
}
