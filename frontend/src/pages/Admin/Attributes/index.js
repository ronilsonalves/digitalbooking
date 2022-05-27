import { Col, Container, Row, Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { useState } from "react";

import { v4 as uuidv4 } from 'uuid';

import { MdOutlineAdd, MdOutlineClose } from 'react-icons/md';

import styled from './styles.module.scss';

export function Attibutes({attibutes, setAttributes}) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorIcon, setErrorIcon] = useState("");

  function handleAddAttribute() {
    let error = false;

    if(name.length === 0) {
      setErrorName("Campo Obrigatório");
      error = true;
    }

    if(icon.length === 0) {
      setErrorIcon("Campo Obrigatório");
      error = true;
    }

    if(error) return;

    setErrorIcon("");
    setErrorName("");
    setName("");
    setIcon("");

    const newAttribute = {
      nome: name,
      icone: icon
    }

    setAttributes([...attibutes, newAttribute]);
  }

  function handleDeleteAttribute(name) {
    const attibutesFilter = attibutes.filter(item => item.name !== name);
    setAttributes(attibutesFilter);
  }

  return (
    <Container fluid className="m-0 mt-4">
      <h2 className="fs-5 font-600">Adicionar Atributos</h2>

      {attibutes?.map((attribute) => (
        <Container key={attribute.nome} fluid className={`m-0 px-4 py-3 rounded mb-2 ${styled.background}`}>
          <Row>
              <Col xs={10} sm={11} md={7}>
                <Container fluid className="m-0 p-0 mb-2">
                  <Form.Label htmlFor="description" className="m-0 p-0 fs-14 mb-1 font-500">Nome</Form.Label>
                  <InputGroup className={`m-0 p-0 w-100 rounded ${styled.shadow_input}`}>
                    <FormControl
                      id="name"
                      className="border-0"
                      onChange={(e) => setName(e.target.value)}
                      value={attribute.nome}
                      disabled
                    />
                  </InputGroup>
                </Container>
              </Col>
              <Col xs={10} sm={11} md={4}>
                <Container fluid className="m-0 p-0 mb-2">
                  <Form.Label htmlFor="description" className="m-0 p-0 fs-14 mb-1 font-500">Icone</Form.Label>
                  <InputGroup className={`m-0 p-0 w-100 rounded ${styled.shadow_input}`}>
                    <FormControl
                      id="icon"
                      className="border-0"
                      value={attribute.icone}
                      disabled
                    />
                  </InputGroup>
                </Container>
              </Col>
              <Col xs={2} sm={1} md={1} className="p-0">
                <div className="w-100 h-100 d-md-flex justify-content-end align-items-end pb-md-2">
                  <Button
                    className="p-0 m-0 bg-secondary border-0"
                    onClick={() => handleDeleteAttribute(attribute.name)}>
                      <MdOutlineClose color="#ffffff" size={34}/>
                  </Button>
                </div>
              </Col>
          </Row>
        </Container>
      ))}





      <Container fluid className={`m-0 px-4 py-3 rounded ${styled.background}`}>
          <Row>
              <Col xs={10} sm={11} md={7}>
                <Container fluid className="m-0 p-0 mb-2">
                  <Form.Label htmlFor="description" className="m-0 p-0 fs-14 mb-1 font-500">Nome</Form.Label>
                  <InputGroup className={`m-0 p-0 w-100 rounded ${styled.shadow_input}`}>
                    <FormControl
                      id="name"
                      className={`${errorName ? 'border border-danger' : 'border border-white'}`}
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </InputGroup>
                  <Form.Text className="text-danger">{errorName && errorName}</Form.Text>
                </Container>
              </Col>
              <Col xs={10} sm={11} md={4}>
                <Container fluid className="m-0 p-0 mb-2">
                  <Form.Label htmlFor="description" className="m-0 p-0 fs-14 mb-1 font-500">Icone</Form.Label>
                  <InputGroup className={`m-0 p-0 w-100 rounded ${styled.shadow_input}`}>
                    <FormControl
                      id="icon"
                      className={`${errorIcon ? 'border border-danger' : 'border border-white'}`}
                      onChange={(e) => setIcon(e.target.value)}
                      value={icon}
                    />
                  </InputGroup>
                  <Form.Text className="text-danger">{errorIcon && errorIcon}</Form.Text>
                </Container>
              </Col>
              <Col xs={2} sm={1} md={1} className="p-0">
                <div className="w-100 h-100 d-md-flex justify-content-end align-items-end pb-md-2">
                  <Button className="p-0 m-0" onClick={handleAddAttribute}><MdOutlineAdd color="#ffffff" size={34}/></Button>
                </div>
              </Col>
          </Row>
      </Container>
    </Container>
  )
}
