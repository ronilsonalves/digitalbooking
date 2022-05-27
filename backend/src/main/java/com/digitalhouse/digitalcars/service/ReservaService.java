package com.digitalhouse.digitalcars.service;

import com.digitalhouse.digitalcars.model.Reserva;
import com.digitalhouse.digitalcars.repository.ProdutoRepository;
import com.digitalhouse.digitalcars.repository.ReservaRepository;
import com.digitalhouse.digitalcars.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Reserva cadastrarReserva(Reserva reserva){
        reserva.setProduto(produtoRepository.getById(reserva.getProduto().getId()));
        reserva.setUsuario(usuarioRepository.getById(reserva.getUsuario().getId()));
        return reservaRepository.save(reserva);
    }

    public List<Reserva> buscarReservaPorProdutoId(Integer id){
        return reservaRepository.findListaDeReservasByProdutoId(id);
    }

    public List<Reserva> buscarReservaPorUsuarioId(Integer id){
        return reservaRepository.findListaDeReservasByUsuarioId(id);
    }
}
