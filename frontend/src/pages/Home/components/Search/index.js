import { Container, Form, Row, Col, Button } from "react-bootstrap";

import { Calendar } from "./components/Calendar";
import { CustomSelect } from "./components/CustomSelect";

import { IoMdCalendar } from 'react-icons/io';

import styled from './styles.module.scss';

export function Search() {
  return (
    <Container fluid className="bg-secondary py-3">
      <h2 className="text-center font-700 fs-2 text-white mb-3">Aluguel de carros com os melhores preços.</h2>
      <Container fluid className={`${styled.w_1000} p-1`}>
        <Form>
          <Row className="m-0 p-0" gap={5}>
            <Col sm={6} md={5}>
              <CustomSelect/>
            </Col>
            <Col sm={6} md={5} className="ps-sm-0 my-2 my-sm-0">
              <div className="bg-light rounded w-100 h-100 d-flex align-items-center px-1">
                <IoMdCalendar size={24} color="#7d8182"/>
                <Calendar/>
              </div>
            </Col>
            <Col sm={6} md={2} className="mx-sm-auto p-md-0 mt-sm-2 mt-md-0">
              <Button className="d-block w-100 text-light">Buscar</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>
  )
}
