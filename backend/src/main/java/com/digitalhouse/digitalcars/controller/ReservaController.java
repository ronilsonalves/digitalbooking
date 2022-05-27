package com.digitalhouse.digitalcars.controller;

import com.digitalhouse.digitalcars.model.Reserva;
import com.digitalhouse.digitalcars.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/reserva")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @PostMapping("/cadastrar")
    public ResponseEntity<Reserva> cadastrarReserva(@RequestBody @Valid Reserva reserva){
        return ResponseEntity.status(HttpStatus.CREATED).body(reservaService.cadastrarReserva(reserva));
    }

    @GetMapping("/produto/{id}")
    public ResponseEntity<List<Reserva>> buscarReservasPorProdutoId(@PathVariable Integer id){
        return ResponseEntity.ok(reservaService.buscarReservaPorProdutoId(id));
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<Reserva>> buscarReservasPorUsuarioId(@PathVariable Integer id){
        return ResponseEntity.ok(reservaService.buscarReservaPorUsuarioId(id));
    }
}
