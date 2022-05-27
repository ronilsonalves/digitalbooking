package com.digitalhouse.digitalcars.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "produtos")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String nome;

    @NotBlank
    @Column(columnDefinition = "LONGTEXT")
    private String descricao;

    @NotBlank
    private String latitude;

    @NotBlank
    private String longitude;

    @NotBlank
    @Column(columnDefinition = "LONGTEXT")
    private String regra;

    @NotBlank
    @Column(columnDefinition = "LONGTEXT")
    private String seguranca;

    @NotBlank
    @Column(columnDefinition = "LONGTEXT")
    private String politica;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "caracteristica_id")
    private List<Caracteristica> caracteristicas;

    @NotEmpty
    @OneToMany(cascade = CascadeType.ALL)
    private List<Imagem> imagens;

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "categoria_id")
    @JsonIgnoreProperties("produtos")
    private Categoria categoria;

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cidade_id")
    private Cidade cidade;
}
