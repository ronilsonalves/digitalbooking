import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Spinner, Alert } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';

import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { BoxForm } from "../../components/Form";

import { useMutation } from "react-query";
import { api } from '../../services/api';
import { useSession } from "../../hooks/useSession";

export function Login() {
  const { createSession } = useSession();
  const location = useLocation();
  const navigate = useNavigate();

  const schema = yup.object({
    email: yup.string().email("Digite um e-mail valido.").required("Campo obrigatório."),
    senha: yup.string().min(6, "Mínimo de 6 dígitos.").required("Campo obrigatório.")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutateAsync, isError, isLoading } = useMutation(async (data) => {
    const response = await api.post("/auth", data);
    return response.data;
  }, {
    onSuccess: (user) => {
      createSession(user);
      if(location.state) {
        navigate(location.state.from.pathname);
      }
    }
  });

  async function dataForm(data) {
    await mutateAsync(data);
  }

  return (
    <Container
      className="
        d-flex
        flex-grow-1
        justify-content-center
        align-items-center"
    >
      <BoxForm handleSubmit={handleSubmit} dataForm={dataForm}>
        <Form.Text
          as="p"
          className="d-block text-primary text-center fs-2 font-500 mb-4"
        >
          Iniciar Sessão
        </Form.Text>
        {location.state?.message && (
          <Alert variant="danger" className="py-2 text-center">
            {location.state?.message}
          </Alert>
        )}
        {isError && (
          <Alert variant="danger" className="py-2 text-center">
            e-mail ou senha inválidos.
          </Alert>
        )}
        <Input type="text" name="email" label="E-mail" error={errors?.email} register={register}/>

        <InputPassword name="senha" label="Senha" error={errors?.senha} register={register}/>

        <Button
          className="w-100 text-white fw-bold mt-4"
          variant="primary"
          type="submit"
          disabled={isLoading ? true : false}
        >
          {isLoading ? <Spinner animation="grow" size="sm" /> : "Entrar"}
        </Button>
        <Form.Text className="text-center d-block text-secondary mt-3">
          Ainda não tem conta?
          <Link className="text-decoration-none font-500 text-primary" to="/register"> Registre-se</Link>
        </Form.Text>
      </BoxForm>
    </Container>
  )
}
