package com.digitalhouse.digitalcars.response;

import com.digitalhouse.digitalcars.dto.UsuarioDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TokenResponse {

    private String token;
    private String tipo;
    private UsuarioDTO usuarioDTO;
}
