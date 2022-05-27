import { useEffect, useState } from "react";
import { Container, Form, InputGroup, FormControl, Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import Select from 'react-select';
import { MessageError } from "../../../components/MessageError";

import { api } from '../../../services/api';

import styled from './styles.module.scss';

const customStyles = {
  option: (provided, state) => {
    return ({
      ...provided,
      borderBottom: '1px solid #FBC02D',
      color: state.isFocused ? '#333333' : '#333333',
      background: state.isFocused ? 'rgba(251, 192, 45, 0.1)' : '#ffffff',
      padding: 15,
    })
  },

  control: (provided, state) => ({
    ...provided,
    color: 'red',
    border: state.isFocused ? '0px solid transparent': '0px solid transparent',
    boxShadow: state.isFocused ? "0px 0px 0px transparent": "0px 0px 0px transparent",
    borderRadius: '5px'
  }),
}

export function CarInfo({ Controller, control, register, errors }) {
  const [ categorias, setCategorias ] = useState([]);
  const [ cidades, setCidades ] = useState([]);
  const [statusMessageError, setStatusMessageError] = useState(false);

  async function buscar() {
    try {
      const responseCategoria = await api.get("/categoria");
      const responseCidade = await api.get("/cidade");

      const dadosCategoriaFormatado = responseCategoria.data.map(categoria => ({
        value: categoria.id,
        label: categoria.titulo,
      }));

      const dadosCidadeFormatado = responseCidade.data.map(cidade => ({
        value: cidade.id,
        label: cidade.nome,
      }));

      setCategorias(dadosCategoriaFormatado);
      setCidades(dadosCidadeFormatado);

    } catch {
      setStatusMessageError(true);
    }
  }

  useEffect(() => {
    buscar();
  }, []);

  return (
    <>
    <Container fluid className="p-0 m-0">
      <Row className="p-0 m-0">
        <Col className="p-sm-2" sm={6}>
          <Container fluid className="m-0 p-0 mb-2">
            <Form.Label htmlFor="name_vehicle" className="m-0 p-0 fs-14 mb-1 font-500">Nome do veículo</Form.Label>
            <InputGroup className={`m-0 p-0 rounded ${styled.shadow_input}`}>
              <FormControl
                id="name_vehicle"
                className={`${errors?.name_vehicle ? 'border border-danger' : 'border border-white'}`}
                {...register("name_vehicle")}
              />
            </InputGroup>
            <Form.Text className="text-danger">{errors?.name_vehicle?.message}</Form.Text>
          </Container>
        </Col>

        <Col className="p-sm-2" sm={6}>
          <Container fluid className="m-0 p-0 mb-2">
            <Form.Label htmlFor="category" className="m-0 p-0 fs-14 mb-1 font-500">Categoria</Form.Label>
            <Controller
              control={control}
              name="category"
              render={({ field: { onChange, ref } }) => (
                <Select
                  id="category"
                  options={categorias}
                  placeholder="Selecione uma categoria"
                  className={`${styled.shadow_input} rounded ${errors?.category ? 'border border-danger' : 'border border-white'}`}
                  styles={customStyles}
                  inputRef={ref}
                  onChange={val => onChange(val.value)}
                  components={{
                    IndicatorSeparator: () => null
                  }}
                />
              )}
            />
            <Form.Text className="text-danger">{errors?.category?.message}</Form.Text>
          </Container>
        </Col>

        <Col className="p-sm-2" sm={6}>
          <Container fluid className="m-0 p-0 mb-2">
          <Form.Label htmlFor="address" className="m-0 p-0 fs-14 mb-1 font-500">Endereço</Form.Label>
            <InputGroup className={`m-0 p-0 rounded ${styled.shadow_input}`}>
              <FormControl
                id="address"
                className={`${errors?.address ? 'border border-danger' : 'border border-white'}`}
                {...register("address")}
              />
            </InputGroup>
            <Form.Text className="text-danger">{errors?.address?.message}</Form.Text>
          </Container>
        </Col>

        <Col className="p-sm-2" sm={6}>
          <Container fluid className="m-0 p-0 mb-2">
            <Form.Label htmlFor="city" className="m-0 p-0 fs-14 mb-1 font-500">Cidade</Form.Label>
            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, ref } }) => (
                <Select
                  id="city"
                  options={cidades}
                  placeholder="Selecione uma cidade"
                  className={`${styled.shadow_input} rounded ${errors?.city ? 'border border-danger' : 'border border-white'}`}
                  styles={customStyles}
                  inputRef={ref}
                  onChange={val => onChange(val.value)}
                  components={{
                    IndicatorSeparator: () => null
                  }}
                />
              )}
            />
            <Form.Text className="text-danger">{errors?.city?.message}</Form.Text>
          </Container>
        </Col>

        <Col sm={12}>
          <Container fluid className="m-0 p-0 mb-2 d-flex flex-column">
            <Form.Label htmlFor="description" className="m-0 p-0 fs-14 mb-1 font-500">Descrição</Form.Label>
            <textarea
              id="description"
              className={`m-0 p-3 rounded ${styled.textarea} ${errors?.description ? 'border border-danger' : 'border border-white'}`}
              {...register("description")}
            />
            <Form.Text className="text-danger">{errors?.description?.message}</Form.Text>
          </Container>
        </Col>
      </Row>
    </Container>
    <MessageError
      setStatus={setStatusMessageError}
      status={statusMessageError}
      textButton="Ok"
      message="Ocorreu um erro na busca dos dados, tente novamente, mais tarde!"
    />
    </>
  )
}
