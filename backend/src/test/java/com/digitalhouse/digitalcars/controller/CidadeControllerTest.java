package com.digitalhouse.digitalcars.controller;

import com.digitalhouse.digitalcars.model.Cidade;
import com.digitalhouse.digitalcars.service.CidadeService;

import com.google.common.collect.Lists;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.doReturn;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static org.hamcrest.Matchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class CidadeControllerTest {


    @MockBean
    private CidadeService cidadeService;

    @Autowired
    private MockMvc mockMvc;

    Cidade cidade;
    Cidade cidade2;

    @BeforeEach
    void doBefore() {
    cidade = new Cidade(1, "Salvador", "Brasil");
    cidade2 = new Cidade(2, "Lisboa", "Portugal");
    }

    @Test
    @DisplayName("GET /cidades sucesso")
    void testListarTodasCidades() throws Exception {
        doReturn(Lists.newArrayList(cidade, cidade2)).when(cidadeService).buscarCidades();

        mockMvc.perform(get("/cidade"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(header().string(HttpHeaders.LOCATION, nullValue()))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].nome", is("Salvador")))
                .andExpect(jsonPath("$[0].pais", is("Brasil")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].nome", is("Lisboa")))
                .andExpect(jsonPath("$[1].pais", is("Portugal")));
    }
}