package com.digitalhouse.digitalcars.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class UsuarioLogin {

    @NotBlank
    private String email;

    @NotBlank
    private String senha;

    public UsernamePasswordAuthenticationToken converter() {
        return new UsernamePasswordAuthenticationToken(email, senha);
    }
}
