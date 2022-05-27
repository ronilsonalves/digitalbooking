import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoMdCalendar } from "react-icons/io";
import { Calendar } from "../../../Home/components/Search/components/Calendar";
import { CategorySelector } from "./components/CategorySelector";
import { CitySelector } from "./components/CitySelector";

import styled from './styles.module.scss';


export function FilterSearchBox(props) {
    const {handleSubmit, control} = useForm();
    const goTo = useNavigate();

    function dataForm(data) {
        if(data.cidade !== undefined && data.categoria === undefined) {
            goTo(`/listar/${data.cidade}`);
        } else if (data.cidade !== undefined && data.categoria !== undefined) {
            goTo(`/listar/${data.cidade}/${data.categoria}`)
        } else {
            goTo(`/listar//${data.categoria}`)
        }
    }
    return (
        <Container fluid className="bg-secondary py-3">
            <h2 className="text-center font-700 fs-2 text-white mb-3">Aluguel de carros com os melhores preços.</h2>
            <Container fluid className={`${styled.w_1000} p-1`}>
                <Form onSubmit={handleSubmit(dataForm)}>
                    <Row className="m-0 p-0" gap={5}>
                        <Col sm={6} md={3} className="ps-sm-0 my-2 my-sm-0">
                            <CitySelector Controller={Controller} control={control}/>
                        </Col>
                        <Col sm={6} md={3} className="ps-sm-0 my-2 my-sm-0">
                            <CategorySelector Controller={Controller} control={control}/>
                        </Col>
                        <Col sm={6} md={3} className="ps-sm-0 my-2 my-sm-0">
                            <div className="bg-light rounded w-100 h-100 d-flex align-items-center px-1 mt-sm-1 mt-md-0">
                                <IoMdCalendar size={24} color="#7d8182" />
                                <Calendar />
                            </div>
                        </Col>
                        <Col sm={6} md={3} className="mx-sm-auto p-md-0 mt-sm-2 mt-md-0">
                            <Button className="d-block w-100 text-light" type="submit">Aplicar filtro</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Container>
    )
}