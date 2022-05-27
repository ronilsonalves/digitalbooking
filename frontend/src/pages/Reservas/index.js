import React, { useEffect, useState } from 'react';
import styled from './styles.module.scss';
import { HeaderInfo } from './components/HeaderInfo';
import { Politicas } from '../Product/components/Politicas';
import { CardProduct } from './components/CardProduct';
import { FormRegistro } from './components/FormRegistro';
import { ArrivalTime } from './components/ArrivalTime';
import { Calendar } from './components/Calendar'
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSession } from '../../hooks/useSession';
import { Loading } from '../../components/Loading';
import { Message } from '../../components/Message';
import { useMutation, useQueryClient } from 'react-query';
import { MessageError } from '../../components/MessageError';

export function Reservas() {
  const [message, setMessage] = useState(false);
  const [product, setProduct] = useState(null);
  const [datasLocacao, setDatasLocacao] = useState(null);
  const [statusMessageError, setStatusMessageError] = useState(false);

  const queryClient = useQueryClient();

  const { session } = useSession();
  const { id: idProduct } = useParams();

  const schema = yup.object({
    horarioInicial: yup.string().required("Selecione um horário."),
    datas: yup.array().required("Selecione as datas de locação do veículo."),
  });

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    api.get(`/produto/${idProduct}`).then(response => setProduct(response.data));
  }, [idProduct]);

  const { mutateAsync, isLoading } = useMutation(async (data) => {
    const response = await api.post("/reserva/cadastrar", data, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      }
    });

    return response.data;
  }, {
    onSuccess: () => {
      setMessage(true);
      queryClient.invalidateQueries(`minhasReservas-${session.user.id}`);
    },
    onError: () => {
      setStatusMessageError(true);
    }
  });

  async function dataForm(data) {
    const reserva = {
      horarioInicial: data.horarioInicial,
      dataInicial: data.datas[0],
      dataFinal: data.datas[1],
      produto: {
        id: Number(idProduct)
      },
      usuario: {
        id: session.user.id
      }
    }
    await mutateAsync(reserva);
  }

  if(!product) {
    return <Loading/>
  }

  return (
    <>
      <HeaderInfo name={product.nome} category={product.categoria.titulo}/>
      <form className='px-2 py-4' onSubmit={handleSubmit(dataForm)}>
        <div className={styled.container}>
          <div className={styled.containerInfo}>
            <FormRegistro />
            <Calendar Controller={Controller} control={control} error={errors?.datas} setDatasLocacao={setDatasLocacao}/>
            <ArrivalTime register={register} error={errors?.horarioInicial}/>
          </div>
          <div className={styled.containerReserva}>
            <CardProduct data={product} datasLocacao={datasLocacao} isLoading={isLoading}/>
          </div>
        </div>
      </form>
      <Politicas politica={product.politica} regra={product.regra} seguranca={product.seguranca} />
      <Message
        status={message}
        setStatus={setMessage}
        link="/"
        message="Sua reserva foi realizada com sucesso!"
        textButton="Ok"
      />

      <MessageError
        message="Ocorreu um erro ao realizar sua reserva, tente novamente, mais tarde!"
        setStatus={setStatusMessageError}
        status={statusMessageError}
        textButton="Ok"
      />
    </>
  );
}
