package com.digitalhouse.digitalcars.controller;

import com.digitalhouse.digitalcars.dto.UsuarioDTO;
import com.digitalhouse.digitalcars.model.Usuario;
import com.digitalhouse.digitalcars.request.UsuarioLogin;
import com.digitalhouse.digitalcars.response.TokenResponse;
import com.digitalhouse.digitalcars.security.TokenService;
import com.digitalhouse.digitalcars.service.UsuarioService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AutenticacaoController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<TokenResponse> autenticar(@RequestBody @Valid UsuarioLogin usuarioLogin) {
        UsernamePasswordAuthenticationToken dadosLogin = usuarioLogin.converter();

        try {
            Authentication authentication = authenticationManager.authenticate(dadosLogin);
            String token = tokenService.gerarToken(authentication);
            Usuario usuario = usuarioService.buscarPorId(tokenService.getIdUsuario(token));
            UsuarioDTO usuarioDTO = new UsuarioDTO();
            BeanUtils.copyProperties(usuario, usuarioDTO);
            return ResponseEntity.ok(new TokenResponse(token, "Bearer", usuarioDTO));
        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
