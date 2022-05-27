package com.digitalhouse.digitalcars.service;

import com.digitalhouse.digitalcars.model.*;
import com.digitalhouse.digitalcars.repository.ProdutoRepository;
import com.digitalhouse.digitalcars.repository.ReservaRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class ProdutoServiceTest {

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private ReservaService reservaService;

    @MockBean
    private ProdutoRepository produtoRepository;

    @MockBean
    private ReservaRepository reservaRepository;

    Produto produto;
    Produto produto2;
    Reserva reserva;
    Reserva reserva2;

    @BeforeEach
    void doBefore(){
    ArrayList<Caracteristica> caracteristicas = new ArrayList<>();
    ArrayList<Imagem> imagens = new ArrayList<>();
    ArrayList<Produto> produtos = new ArrayList<>();

        caracteristicas.add(new Caracteristica(1, "Cor", "Branco"));
        caracteristicas.add(new Caracteristica(2, "Portas", "icone2"));

        imagens.add(new Imagem(1, "imagem1", "descricao1"));
        imagens.add(new Imagem(2, "imagem2", "descricao2"));

        produtos.add(new Produto(1, "Nome", "Descrição", "Latitude", "Longitude", "regra", "seguranca", "politica", caracteristicas, imagens,
                new Categoria(1, "titulo", "descrição", "URL",produtos),
                new Cidade(1, "nome", "estado")));
        produtos.add(new Produto(2, "Nome", "Descrição", "Latitude", "Longitude", "regra", "seguranca", "politica", caracteristicas, imagens,
                new Categoria(1, "titulo", "descrição", "URL", produtos),
                new Cidade(1, "nome", "estado")));

    produto = new Produto(1, "Nome", "Descrição", "Latitude", "Longitude","regra", "seguranca", "politica", caracteristicas, imagens,
                new Categoria(1, "titulo", "descrição", "URL", produtos),
                new Cidade(1, "nome", "estado"));
    produto2 = new Produto(2, "Nome", "Descrição", "Latitude", "Longitude","regra", "seguranca", "politica", caracteristicas, imagens,
                new Categoria(1, "titulo", "descrição", "URL", produtos),
                new Cidade(1, "nome", "estado"));

    reserva = new Reserva(1, "11:00",
                                  new Date(2022-10-01),
                new Date(2022-10-02), produto,
                new Usuario(1, "nome", "email", "telefone", "senha", new Funcao(1, "nome")));
    reserva2 = new Reserva(2, "11:00",
                                   new Date(2022-10-03),
                new Date(2022-10-04), produto,
                new Usuario(2, "nome2", "email2", "telefone2", "senha2", new Funcao(1, "nome")));
    }

    @Test
    @DisplayName("Teste cadastrar produtos")
    void cadastrarProduto() {
        doReturn(produto).when(produtoRepository).save(any());
        Produto produtoRetorno = produtoService.cadastrarProduto(produto);

        Assertions.assertNotNull(produtoRetorno, "Produto cadastrado com sucesso");
    }

    @Test
    @DisplayName("Teste buscar todos produtos")
    void buscarProdutos() {
        doReturn(Arrays.asList(produto, produto2)).when(produtoRepository).findAll();
        List<Produto> produtosRetorno = produtoService.buscarProdutos();

        Assertions.assertEquals(2, produtosRetorno.size(), "Buscar produtos retornou 2 produtos");
    }

    @Test
    @DisplayName("Teste buscar produtos por id")
    void buscarPorId() {
        doReturn(Optional.of(produto)).when(produtoRepository).findById(1);
        Optional<Produto> produtoRetorno = produtoService.buscarPorId(1);

        Assertions.assertTrue(produtoRetorno.isPresent(), "Produto existe");
        Assertions.assertSame(produtoRetorno.get(), produto, "Produto retornado é igual ao cadastrado");
    }

    @Test
    @DisplayName("Teste buscar produtos por categoria id")
    void buscarProdutoPorCategoriaId() {
        doReturn(List.of(produto)).when(produtoRepository).findListaDeProdutosByCategoriaId(1);
        List<Produto> produtoRetorno = produtoService.buscarProdutoPorCategoriaId(1);

        Assertions.assertFalse(produtoRetorno.isEmpty(), "Produto existe");
    }

    @Test
    @DisplayName("Teste buscar produtos por cidade id")
    void buscarProdutoPorCidadeId() {
        doReturn(List.of(produto)).when(produtoRepository).findListaDeProdutosByCidadeId(1);
        List<Produto> produtoRetorno = produtoService.buscarProdutoPorCidadeId(1);

        Assertions.assertFalse(produtoRetorno.isEmpty(), "Produto existe");
    }

    @Test
    @DisplayName("Teste buscar produtos por cidade e categoria")
    void produtosPorCidadeECategoria() {
        doReturn(Arrays.asList(produto, produto2)).when(produtoRepository).findAll();
        doReturn(List.of(produto)).when(produtoRepository).findListaDeProdutosByCategoriaId(1);
        List<Produto> produtoRetorno = produtoService.produtosPorCidadeECategoria(1, 1);

        Assertions.assertFalse(produtoRetorno.isEmpty(), "Produto existe");
    }

    @Test
    @DisplayName("Teste buscar produtos por disponibilidade")
    void produtosPorDisponibilidade() {
        doReturn(List.of(reserva)).when(reservaRepository).findAllByDataInicialBetweenOrDataFinalBetween(new Date(2022-10-05), new Date(2022-10-06), new Date(2022-10-05), new Date(2022-10-06));
        doReturn(Arrays.asList(reserva, reserva2)).when(reservaRepository).findAll();
        List<Produto> produtoRetorno = produtoService.produtosPorDisponibilidade(new Date(2022-10-05), new Date(2022-10-06));

        Assertions.assertTrue(produtoRetorno.isEmpty(), "Produto já reservado");
    }

    @Test
    @DisplayName("Teste buscar produtos por cidade e disponibilidade")
    void produtosPorCidadeEDisponibilidade() {
        doReturn(List.of(produto)).when(produtoRepository).findListaDeProdutosByCidadeId(1);
        doReturn(Arrays.asList(reserva, reserva2)).when(reservaRepository).findAll();
        List<Produto> produtoRetorno = produtoService.produtosPorCidadeEDisponibilidade(1, new Date(2022-10-01), new Date(2022-10-02));

        Assertions.assertNotNull(produtoRetorno, "Produto já reservado");
    }

    @Test
    @DisplayName("Teste buscar produtos por categoria e disponibilidade")
    void produtosPorCategoriaEDisponibilidade() {
        doReturn(List.of(produto)).when(produtoRepository).findListaDeProdutosByCidadeId(1);
        doReturn(Arrays.asList(reserva, reserva2)).when(reservaRepository).findAll();
        List<Produto> produtoRetorno = produtoService.produtosPorCategoriaEDisponibilidade(1,  new Date(2022-10-01), new Date(2022-10-02));

        Assertions.assertNotNull(produtoRetorno, "Produto já reservado");
    }
}