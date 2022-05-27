package com.digitalhouse.digitalcars.service;

import com.digitalhouse.digitalcars.model.Usuario;
import com.digitalhouse.digitalcars.repository.FuncaoRepository;
import com.digitalhouse.digitalcars.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private static final String FUNCAO_PADRAO = "USER";

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private FuncaoRepository funcaoRepository;

    public Usuario cadastrarUsuario(Usuario usuario) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String senhaEncoder = encoder.encode(usuario.getSenha());

        usuario.setSenha(senhaEncoder);

        usuario.setFuncao(usuario.getFuncao() == null ? funcaoRepository.findByNome(FUNCAO_PADRAO) : funcaoRepository.findByNome(usuario.getFuncao().getNome()));

        return usuarioRepository.save(usuario);
    }

    public Usuario buscarPorId(Integer id){
        return usuarioRepository.findById(id).orElse(null);
    }
}
