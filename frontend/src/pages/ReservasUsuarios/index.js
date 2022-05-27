import { Container } from "react-bootstrap";
import styled from "./styles.module.scss";
import { Card } from "./Card";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { api } from "../../services/api";
import { Loading } from "../../components/Loading";
import { useSession } from "../../hooks/useSession";

import { Link } from 'react-router-dom';

import { IoIosArrowBack } from 'react-icons/io';

export function ReservasUsuarios() {
  const { id } = useParams();
  const { session } = useSession();

  const { isLoading, data } = useQuery(`minhasReservas-${id}`, async () => {
    const response = await api.get(`/reserva/usuario/${id}`, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      }
    });
    return response.data;
    }, {
      staleTime: 1000 * 60 * 10,
    }
  );

  if(isLoading) return <Loading/>;

  return data.length > 0 ? (
    <Container fluid className="p-0">
      <Container fluid className="bg-secondary py-2">
        <Container fluid className="max-width-1180 p-0 d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column text-white">
            <strong className="font-600 fs-5">Minhas Reservas</strong>
          </div>
          <Link to="/">
            <button className="d-flex justify-content-end">
              <IoIosArrowBack className="d-block" color="#ffffff" size={50}/>
            </button>
          </Link>
        </Container>
      </Container>
      <Container fluid className="max-width-1180 px-2 my-3">
        <div className={styled.container}>
          {data?.map(item => (
            <Card key={item.id} data={item}/>
          ))}
        </div>
      </Container>
    </Container>
  ) : (
    <Container fluid className="p-0">
      <Container fluid className="bg-secondary py-2">
      <Container fluid className="max-width-1180 p-0 px-2 my-1 d-flex align-items-center">
        <h2 className="fs-4 font-600 text-white mt-1">Minhas Reservas</h2>
      </Container>
    </Container>
      <Container fluid className="max-width-1180 px-2 my-3">
        <h2 className="text-center">Você ainda não realizou nenhuma reserva.</h2>
      </Container>
    </Container>
  );
}
