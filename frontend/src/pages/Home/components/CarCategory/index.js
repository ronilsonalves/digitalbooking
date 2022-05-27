import { Col, Container, Row, Card } from "react-bootstrap";
import { api } from '../../../../services/api';

import { Link } from "react-router-dom";

import styled from './styles.module.scss';
import { useQuery } from "react-query";

export function CarCategory() {

  const { data } = useQuery("category", async () => {
    const response = await api.get("/categoria");
    return response.data;
  }, {
    cacheTime: 60000 // 1 minuto
  });

  return (
    <Container fluid className="px-2 bg-light">
      <Container fluid className="max-width-1180 my-3 p-0">
        <h2 className="fs-4 p-0 m-0 mb-2 d-block w-100 font-700 px-1">Buscar por categorias</h2>

        <Row className="p-0 m-0 justify-content-start">
          {data?.map(category => (
            <Col key={category.id} lg={3} md={4} sm={6} className="p-1">
              <Card className={`w-100 d-block border-0 ${styled.shadow}`}>
                <div className={`${styled.box_image} w-100 d-flex justify-content-center align-items-center bg-gray-card rounded`}>
                  <Card.Img variant="top" src={category.urlImagem} />
                </div>
                <Card.Body className="py-0 px-1">
                  <Link to={`/listar/categoria/${category.id}`}>
                    <Card.Title as="strong" className="font-600 text-capitalize cursor">{category.titulo}</Card.Title>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  )
}
