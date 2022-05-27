package com.digitalhouse.digitalcars.service;

import com.digitalhouse.digitalcars.model.Cidade;
import com.digitalhouse.digitalcars.repository.CidadeRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class CidadeServiceTest {

    @Autowired
    private CidadeService cidadeService;

    @MockBean
    private CidadeRepository cidadeRepository;

    Cidade cidade;
    Cidade cidade2;

    @BeforeEach
    void doBefore() {
        cidade = new Cidade(1, "Paris", "Franca");
        cidade2 = new Cidade(2, "Salvador", "Brasil");
    }

    @Test
    @DisplayName("Teste cadastrar cidade")
    void testCadastrarCidade() {
        doReturn(cidade).when(cidadeRepository).save(any());

        Cidade cidadeRetorno = cidadeService.cadastrarCidade(cidade);

        Assertions.assertNotNull(cidadeRetorno, "Cidade cadastrada com sucesso");
    }

    @Test
    @DisplayName("Teste buscar cidades")
    void testBuscarCidades() {
        doReturn(Arrays.asList(cidade, cidade2)).when(cidadeRepository).findAll();

        List<Cidade> cidades = cidadeService.buscarCidades();

        Assertions.assertEquals(2, cidades.size(), "Buscar cidades retornou 2 cidades");
    }

    @Test
    @DisplayName("Teste buscar cidades por nome")
    void testFindByNome() {
        doReturn(Arrays.asList(cidade)).when(cidadeRepository).findByNome("Salvador");

        List<Cidade> cidades = cidadeService.findByNome("Salvador");

        Assertions.assertFalse(cidades.isEmpty(), "FindByNome retornou Salvador");
    }

}