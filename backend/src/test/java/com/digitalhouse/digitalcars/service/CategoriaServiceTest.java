package com.digitalhouse.digitalcars.service;

import com.digitalhouse.digitalcars.model.*;
import com.digitalhouse.digitalcars.repository.CategoriaRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class CategoriaServiceTest {

    @Autowired
    private CategoriaService categoriaService;

    @MockBean
    private CategoriaRepository categoriaRepository;

    Categoria categoria;
    Categoria categoria2;
    ArrayList<Produto> produtos = new ArrayList<>();

    @BeforeEach
    void doBefore() {
        ArrayList<Caracteristica> caracteristicas = new ArrayList<>();
        caracteristicas.add(new Caracteristica(1, "Cor", "Branco"));
        caracteristicas.add(new Caracteristica(2, "Portas", "icone2"));

        ArrayList<Imagem> imagens = new ArrayList<>();
        imagens.add(new Imagem(1, "imagem1", "descricao1"));
        imagens.add(new Imagem(2, "imagem2", "descricao2"));

        produtos.add(new Produto(1, "Nome", "Descrição", "50, 40.99", "30, 35.55", "regra", "seguranca", "politica", caracteristicas, imagens,
                new Categoria(1, "titulo", "descrição", "URL", produtos),
                new Cidade(1, "nome", "estado")));

        produtos.add(new Produto(2, "Nome", "Descrição", "50, 40.99", "30, 35.55", "regra", "seguranca", "politica", caracteristicas, imagens,
                new Categoria(1, "titulo", "descrição", "URL", produtos),
                new Cidade(1, "nome", "estado")));

        categoria = new Categoria(1, "Categoria Titulo 1", "Categoria Descrição 1", "Categoria URL 1", produtos);
        categoria2 = new Categoria(2, "Categoria Titulo 2", "Categoria Descrição 2", "Categoria URL 2", produtos);
    }

    @Test
    @DisplayName("Teste cadastrar categoria")
    void testCadastrarCategoria() {

        doReturn(categoria).when(categoriaRepository).save(any());

        Categoria categoriaRetorno = categoriaService.cadastrarCategoria(categoria);

        Assertions.assertNotNull(categoriaRetorno, "Categoria cadastrada com sucesso");
    }

    @Test
    @DisplayName("Teste buscar categorias")
    void testBuscarCategorias() {

        doReturn(Arrays.asList(categoria, categoria2)).when(categoriaRepository).findAll();

        List<Categoria> categorias = categoriaService.buscarCategorias();

        Assertions.assertEquals(2, categorias.size(), "Buscar categorias retornou 2 categorias");
    }

    @Test
    @DisplayName("Test buscar por id")
    void testBuscarPorId() {
        doReturn(Optional.of(categoria)).when(categoriaRepository).findById(1);
        Optional<Categoria> categoriaRetorno = categoriaService.buscarPorId(1);

        assertNotNull(categoriaRetorno, "Categoria não existe");
        Assertions.assertSame(categoriaRetorno.get(), categoria, "Categoria retornada é igual ao cadastrada");
    }
}