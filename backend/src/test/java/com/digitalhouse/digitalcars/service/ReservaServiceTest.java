package com.digitalhouse.digitalcars.service;

import com.digitalhouse.digitalcars.model.*;
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class ReservaServiceTest {

    @Autowired
    private ReservaService reservaService;

    @MockBean
    private ReservaRepository reservaRepository;

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


        produtos.add(new Produto(1, "Nome", "Descrição", "50, 40.99", "30, 35.55", "regra", "seguranca", "politica", caracteristicas, imagens,
                new Categoria(1, "titulo", "descrição", "URL", produtos),
                new Cidade(1, "nome", "estado")));

        produtos.add(new Produto(2, "Nome", "Descrição", "50, 40.99", "30, 35.55", "regra", "seguranca", "politica", caracteristicas, imagens,
                new Categoria(1, "titulo", "descrição", "URL", produtos),
                new Cidade(1, "nome", "estado")));

        reserva = new Reserva(1,"21:12",
                new Date(2022-01-10),
                new Date(31-01-2022),
                new Produto(1, "Nome", "Descrição", "50, 40.99", "30, 35.55", "regra", "seguranca", "politica", caracteristicas, imagens,
                        new Categoria(1, "titulo", "descrição", "URL", produtos),
                        new Cidade(1, "nome", "estado")),
                new Usuario(1, "Professor", "Xavier", "xavier@gmail.com", "xmen", new Funcao(1, "Ler a mente")));

        reserva2 = new Reserva(2,"21:12",
                new Date(2022-01-10),
                new Date(31-01-2022),
                new Produto(1, "Nome", "Descrição", "50, 40.99", "30, 35.55", "regra", "seguranca", "politica", caracteristicas, imagens,
                        new Categoria(1, "titulo", "descrição", "URL", produtos),
                        new Cidade(1, "nome", "estado")),
                new Usuario(1, "Professor", "Xavier", "xavier@gmail.com", "xmen", new Funcao(1, "Ler a mente")));
    }

    @Test
    @DisplayName("Teste cadastrar reserva")
    void testCadastrarReserva() {

        doReturn(reserva).when(reservaRepository).save(any());

        Reserva reservaRetorno = reservaService.cadastrarReserva(reserva);

        Assertions.assertNotNull(reservaRetorno, "Reserva criada com sucesso");
    }

    @Test
    @DisplayName("Teste buscar reservas por id do produto")
    void testBuscarReservaPorProdutoId() {

        doReturn(Arrays.asList(reserva, reserva2)).when(reservaRepository).findListaDeReservasByProdutoId(1);

        List<Reserva> reservas = reservaService.buscarReservaPorProdutoId(1);

        Assertions.assertEquals(2, reservas.size(), "Buscar reservas retornou 2 reservas");
        Assertions.assertFalse(reservas.isEmpty());
    }

    @Test
    @DisplayName("Teste buscar reservas por id do usuario")
    void testBuscarReservaPorUsuarioId() {

        doReturn(Arrays.asList(reserva, reserva2)).when(reservaRepository).findListaDeReservasByUsuarioId(1);

        List<Reserva> reservas = reservaService.buscarReservaPorUsuarioId(1);

        Assertions.assertEquals(2, reservas.size(), "Buscar reservas retornou 2 reservas");
        Assertions.assertFalse(reservas.isEmpty());
    }
}