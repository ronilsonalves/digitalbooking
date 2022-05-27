import { Col, Container, Row } from "react-bootstrap";

import { Card } from "./Card";

import styled from './styles.module.scss';

export function ProductPolicies({register, errors}) {
  return (
    <Container fluid className="m-0 mt-4">
      <h2 className="fs-5 font-600">Políticas do produto</h2>
      <Container fluid className={`m-0 px-4 py-3 rounded ${styled.container}`}>
        <Row>
          <Col md={12} lg={4}>
            <Card title="Regras do carro" name="car_rules" error={errors?.car_rules} register={register}/>
          </Col>
          <Col md={12} lg={4}>
            <Card title="Saúde e segurança" name="security" error={errors?.security} register={register}/>
          </Col>
          <Col md={12} lg={4}>
            <Card title="Política de cancelamento" name="cancel" error={errors.cancel} register={register}/>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
