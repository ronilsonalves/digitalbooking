import { Container } from "react-bootstrap";

import { useQuery } from 'react-query';
import { api } from '../../../../services/api';

import styled from "./styles.module.scss";
import { Card } from "./Card";

export function Recommendation() {
  const { isLoading, data } = useQuery('recommendation', async () => {
      const response = await api.get("/produto/recomendacoes");
      return response.data;
    }, {
      staleTime: 60000, // 1 minuto
    }
  );

  return (
    <Container fluid className="px-2">
      <Container fluid className="max-width-1180 px-1 my-3">
        <h2 className="fs-4 p-0 m-0 mb-2 d-block w-100 font-700">Recomendamos para você</h2>
        {isLoading ? (
            <p className="fs-6 mt-4 font-500">Carregando...</p>
        ) : (
          <div className={styled.container}>
            {data?.map(product => (
              <Card key={product.id} data={product}/>
            ))}
          </div>
        )}
      </Container>
    </Container>
  );
}
