package com.digitalhouse.digitalcars.service;

import com.digitalhouse.digitalcars.model.Caracteristica;
import com.digitalhouse.digitalcars.model.Produto;
import com.digitalhouse.digitalcars.model.Reserva;
import com.digitalhouse.digitalcars.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private CidadeRepository cidadeRepository;

    @Autowired
    private CaracteristicaRepository caracteristicaRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    public Produto cadastrarProduto(Produto produto){
        produto.setCategoria(categoriaRepository.getById(produto.getCategoria().getId()));
        produto.setCidade(cidadeRepository.getById(produto.getCidade().getId()));
        List<Caracteristica> caracteristicasAseremCriadas = produto.getCaracteristicas().stream().filter(caracteristica -> caracteristica.getId() == null).collect(Collectors.toList());
        List<Caracteristica> caracteristicasBuscadas = produto.getCaracteristicas().stream().filter(caracteristica -> caracteristica.getId() != null).collect(Collectors.toList());
        produto.getCaracteristicas().clear();
        produto.getCaracteristicas().addAll(caracteristicasBuscadas.stream().map(caracteristica -> caracteristicaRepository.findById(caracteristica.getId()).orElseThrow()).collect(Collectors.toList()));
        produto.getCaracteristicas().addAll(caracteristicasAseremCriadas);
        return produtoRepository.save(produto);
    }

    public List<Produto> buscarProdutos(){
        return produtoRepository.findAll();
    }

    public List<Produto> listarRecomendacoes() {
        return produtoRepository.findTop6ByOrderByCidadeDescCategoriaAsc();
    }

    public Optional<Produto> buscarPorId(Integer id){
            return produtoRepository.findById(id);
    }

    public List<Produto> buscarProdutoPorCategoriaId(Integer id){
        return produtoRepository.findListaDeProdutosByCategoriaId(id);
    }

    public List<Produto> buscarProdutoPorCidadeId(Integer id){
        return produtoRepository.findListaDeProdutosByCidadeId(id);
    }

    public List<Produto> produtosPorCidadeECategoria(Integer cidadeId, Integer categoriaId) {
        List<Produto> produtosSemFiltro = buscarProdutos();
        List<Produto> produtosFiltrados = new ArrayList<>();
        if(produtosSemFiltro.isEmpty()) {
            return null;
        } else {
            produtosSemFiltro.forEach((Produto produto) -> {
                if (produto.getCidade().getId() == cidadeId  && produto.getCategoria().getId() == categoriaId) {
                    produtosFiltrados.add(produto);
                }
            });
            return produtosFiltrados;
        }
    }

    public List<Produto> produtosPorDisponibilidade (Date dataInicial, Date dataFinal) {
        List<Reserva> reservas = reservaRepository.findAllByDataInicialBetweenOrDataFinalBetween(dataInicial, dataFinal, dataInicial, dataFinal);
        List<Produto> produtos = buscarProdutos();

        if(!reservas.isEmpty()) {
            List<Produto> todosOsProdutos = buscarProdutos();
            todosOsProdutos.forEach(produto -> {
                reservas.forEach(reserva -> {
                    if(reserva.getProduto().getId() == produto.getId()) {
                        produtos.remove(produto);
                    }
                });
            });
            return produtos;
        } else {
            return produtos;
        }
    }

    public List<Produto> produtosPorCidadeEDisponibilidade (Integer cidadeId, Date dataInicial, Date dataFinal) {
        List<Produto> produtosDisponiveis = produtosPorDisponibilidade(dataInicial, dataFinal);
        List<Produto> produtosDisponiveisPorCidade = new ArrayList<>();

        if (!produtosDisponiveis.isEmpty()) {
            produtosDisponiveis.forEach(produto -> {
                if(produto.getCidade().getId() == cidadeId) {
                    produtosDisponiveisPorCidade.add(produto);
                }
            });
            return produtosDisponiveisPorCidade;
        } else {
            return buscarProdutoPorCidadeId(cidadeId);
        }
    }

    public List<Produto> produtosPorCidadeCategoriaEDisponibilidade (Integer cidadeId, Integer categoriaId, Date dataInicial, Date dataFinal) {
        List<Produto> produtosDisponiveis = produtosPorDisponibilidade(dataInicial, dataFinal);
        List<Produto> produtosDisponiveisPorCidadeECategoria = new ArrayList<>();

        if (!produtosDisponiveis.isEmpty()) {
            produtosDisponiveis.forEach(produto -> {
                if(produto.getCidade().getId() == cidadeId && produto.getCategoria().getId() == categoriaId) {
                    produtosDisponiveisPorCidadeECategoria.add(produto);
                }
            });
            return produtosDisponiveisPorCidadeECategoria;
        } else {
            return produtosPorCidadeECategoria(cidadeId, categoriaId);
        }
    }

    public List<Produto> produtosPorCategoriaEDisponibilidade (Integer categoriaID, Date dataInicial, Date dataFinal) {
        List<Produto> produdutosDisponiveis = produtosPorDisponibilidade(dataInicial, dataFinal);
        List<Produto> produtosDisponiveisPorCategoria = new ArrayList<>();

        if(!produdutosDisponiveis.isEmpty()) {
            produdutosDisponiveis.forEach(produto -> {
                if(produto.getCategoria().getId() == categoriaID) {
                    produtosDisponiveisPorCategoria.add(produto);
                }
            });
            return produtosDisponiveisPorCategoria;
        } else {
            return buscarProdutoPorCategoriaId(categoriaID);
        }
    }

    public Produto atualizarProduto(Produto produto){
        return produtoRepository.save(produto);
    }
}
