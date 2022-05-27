import { Container, Button, Spinner } from 'react-bootstrap';
import { CarInfo } from './CarInfo';
import { Attibutes } from './Attributes';
import { Images } from './Images';

import { Link } from 'react-router-dom';

import { IoIosArrowBack } from 'react-icons/io';

import styled from './styles.module.scss';
import { ProductPolicies } from './ProductPolicies';
import { useForm, Controller } from 'react-hook-form';

import { useState } from 'react';
import { useSession } from '../../hooks/useSession';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '../../services/api';
import { useMutation, useQueryClient } from 'react-query';
import { Message } from '../../components/Message';
import { MessageError } from '../../components/MessageError';

export function Admin() {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(false);
  const [attibutes, setAttributes] = useState([]);
  const [statusMessageError, setStatusMessageError] = useState(false);
  const { session } = useSession();
  const queryClient = useQueryClient();


  const schema = yup.object({
    name_vehicle: yup.string().required("Campo obrigatório."),
    category: yup.string().required("Campo obrigatório."),
    address: yup.string().required("Campo obrigatório."),
    description: yup.string().required("Campo obrigatório."),
    city: yup.string().required("Campo obrigatório."),
    car_rules: yup.string().required("Campo obrigatório."),
    cancel: yup.string().required("Campo obrigatório."),
    security: yup.string().required("Campo obrigatório."),
  });

  const { handleSubmit, register, formState: { errors }, control, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation(async (data) => {
    const response = await api.post("/produto", data, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      }
    });
    return response.data;
  }, {
    onSuccess: (data2) => {
      setValue("name_vehicle", "");
      setValue("address", "");
      setValue("description", "");
      setValue("car_rules", "");
      setValue("cancel", "");
      setValue("security", "");
      setImages([]);
      setAttributes([]);
      setStatus(true);
      queryClient.invalidateQueries('recommendation');
      queryClient.invalidateQueries('cityFilter');
      queryClient.invalidateQueries('categoryFilter');
    },
    onError: () => {
      setStatusMessageError(true);
    }
  });

  async function handleSubmitForm(data) {
    const newProduct = {
      nome: data.name_vehicle,
      descricao: data.description,
      imagens: images,
      caracteristicas: attibutes,
      categoria: {  id: Number(data.category) },
      cidade: { id: Number(data.city) },
      regra: data.car_rules,
      seguranca: data.security,
      politica: data.cancel,
    }

    await mutateAsync(newProduct);
  }

  return (
    <>
      <Container fluid className="bg-secondary py-2">
      <Container fluid className="max-width-1180 p-0 d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column text-white">
          <strong className="font-600 fs-5">Administração</strong>
        </div>
        <Link to="/">
          <button className="d-flex justify-content-end">
            <IoIosArrowBack className="d-block" color="#ffffff" size={50}/>
          </button>
        </Link>
      </Container>
    </Container>
      <Container as="section" fluid className={`${styled.red} m-0 mb-5`}>
        <Container fluid className={`pb-2 pt-4 px-0 m-0 mx-auto max-width-1180`}>
          <h2 className="fs-4 font-600">Criar Veículo</h2>
        </Container>
        <Container fluid className={`py-3 m-0 mx-auto max-width-1180 rounded ${styled.container}`}>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <CarInfo Controller={Controller} control={control} register={register} errors={errors}/>
            <Attibutes attibutes={attibutes} setAttributes={setAttributes}/>
            <ProductPolicies register={register} errors={errors}/>
            <Images images={images} setImages={setImages}/>
            <div className='d-flex justify-content-center align-items-center mt-5 mb-3'>
              <Button type='submit' className={`w-100 ${styled.max_width} text-white font-600`}>
              {isLoading ? <Spinner animation="grow" size="sm" /> : "Criar"}
              </Button>
            </div>
          </form>
        </Container>
      </Container>

      <Message
        status={status}
        setStatus={setStatus}
        message="Veículo cadastrado com sucesso!" textButton="Ok"
      />

      <MessageError
        message="Ocorreu um erro ao cadastrar o veículo, tente novamente, mais tarde!"
        setStatus={setStatusMessageError}
        status={statusMessageError}
        textButton="Ok"
      />
    </>
  )
}
