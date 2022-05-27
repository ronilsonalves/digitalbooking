import { Link } from "react-router-dom";
import { useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';

import { api } from '../../services/api';

import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { BoxForm } from "../../components/Form";

import styled from './styles.module.scss';
import { useMutation } from "react-query";
import { Message } from "../../components/Message";
import { MessageError } from "../../components/MessageError";

export function Register() {
  const [message, setMessage] = useState(false);
  const [error, setError] =  useState();

  const schema = yup.object({
    name: yup.string().required("Campo obrigatório."),
    lastname: yup.string().required("Campo obrigatório."),
    email: yup.string().email("Digite um e-mail valido.").required("Campo obrigatório."),
    password: yup.string().min(6, "Mínimo de 6 dígitos.").required("Campo obrigatório."),
    password_confirmation: yup.string().oneOf([
      null, yup.ref("password")
    ], "As senhas precisam ser iguais.")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation(async (data) => {
    const response = await api.post("usuario/cadastrar", data);
    return response.data;
  }, {
    onSuccess: () => {
      setMessage(true);
    },
    onError: () => {
      setError("Não foi possivel realizar o cadastro, tente novamente mais tarde.");
    }
  });

  async function dataForm(data) {
    const user = {
      nome: data.name,
      sobrenome: data.lastname,
      email: data.email,
      senha: data.password,
    }
    await mutateAsync(user);
  }

  return (
    <>
    <Container
      className="
        d-flex
        flex-grow-1
        justify-content-center
        align-items-center
        "
    >
      <BoxForm handleSubmit={handleSubmit} dataForm={dataForm}>
        <Form.Text
          as="p"
          className="d-block text-primary text-center fs-2 font-500 mb-4"
        >
          Criar Conta
        </Form.Text>
        {error && <p className={styled.error_request}>{error}</p>}
        <div className={styled.responsive}>
          <Input type="text" name="name" label="Nome" error={errors?.name} register={register}/>
          <Input type="text" name="lastname" label="Sobrenome" error={errors?.lastname} register={register}/>
        </div>
        <Input type="text" name="email" label="E-mail" error={errors?.email} register={register}/>
        <InputPassword name="password" label="Senha" error={errors?.password} register={register}/>
        <Input type="password" name="password_confirmation" label="Confirmar senha" error={errors?.password_confirmation} register={register}/>

        <Button className="w-100 text-white fw-bold mt-4" variant="primary" type="submit">
          {isLoading ? <Spinner animation="grow" size="sm" /> : "Criar Conta"}
        </Button>
        <Form.Text className="text-center d-block text-secondary mt-3">
          Já tem uma conta?
          <Link className="text-decoration-none font-500 text-primary" to="/login"> Iniciar sessão</Link>
        </Form.Text>
      </BoxForm>
    </Container>
    <Message
      status={message}
      setStatus={setMessage}
      link="/login"
      message="Seu cadastro foi realizado com sucesso!"
      textButton="Ok"
    />
    </>
  )
}

