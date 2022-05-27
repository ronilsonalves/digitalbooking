package com.digitalhouse.digitalcars.repository;

import com.digitalhouse.digitalcars.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Integer> {

    List<Reserva> findListaDeReservasByProdutoId(Integer id);

    List<Reserva> findAllByDataInicialBetweenOrDataFinalBetween(Date dataInicial, Date dataFinal, Date inicial, Date dFinal);

    List<Reserva> findListaDeReservasByUsuarioId(Integer id);
}
