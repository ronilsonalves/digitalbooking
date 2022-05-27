package com.digitalhouse.digitalcars.service;

import com.digitalhouse.digitalcars.model.Funcao;
import com.digitalhouse.digitalcars.model.Usuario;
import com.digitalhouse.digitalcars.repository.UsuarioRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class UsuarioServiceTest {

    @Autowired
    private UsuarioService usuarioService;

    @MockBean
    private UsuarioRepository usuarioRepository;

    Usuario usuario;

    @BeforeEach
    void doBefore(){
    usuario = new Usuario(1, "Nome", "Sobrenome", "Email", "Senha", new Funcao(1, "Funcao"));
    }

    @Test
    void cadastrarUsuario() {
        doReturn(usuario).when(usuarioRepository).save(any());
        Usuario usuarioRetorno = usuarioService.cadastrarUsuario(usuario);

        Assertions.assertNotNull(usuarioRetorno, "Usuario cadastrado com sucesso");
    }

    @Test
    void buscarPorId() {
        doReturn(Optional.of(usuario)).when(usuarioRepository).findById(1);
        Usuario usuarioRetorno = usuarioService.buscarPorId(1);

        assertNotNull(usuarioRetorno, "Usuario não existe");
        Assertions.assertSame(usuarioRetorno, usuario, "Usuario retornado é igual ao cadastrado");
    }
}