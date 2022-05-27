package com.digitalhouse.digitalcars.dto;

import com.digitalhouse.digitalcars.model.Funcao;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class UsuarioDTO {

    @NotNull
    private Integer id;

    @NotBlank
    private String nome;

    @NotBlank
    private String sobrenome;

    @NotBlank
    private String email;

    @NotNull
    private Funcao funcao;
}
