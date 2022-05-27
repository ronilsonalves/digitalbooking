package com.digitalhouse.digitalcars.security;

import com.digitalhouse.digitalcars.model.Usuario;
import com.digitalhouse.digitalcars.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AutenticacaoService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        List<GrantedAuthority> authorities = new ArrayList<>();
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);

        List<String> funcoes = new ArrayList<>();

        funcoes.add(usuario.get().getFuncao().getNome());

        authorities = funcoes.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());

            return usuario.get();
    }
}
