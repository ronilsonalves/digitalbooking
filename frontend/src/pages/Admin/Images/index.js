import { useState } from "react";
import { Col, Container, Row, Form, InputGroup, FormControl, Button } from "react-bootstrap";

import { MdOutlineAdd, MdOutlineClose } from 'react-icons/md';

import styled from './styles.module.scss';

export function Images({images, setImages}) {
  const [url, setUrl] = useState("");
  const [errorUrl, setErrorUrl] = useState("");

  function handleAddImages() {

    if(url.length === 0) {
      setErrorUrl("Campo Obrigatório");
      return;
    }

    setErrorUrl("");
    setUrl("");

    const newImage = {
      titulo: "carro",
      url
    }

    setImages([...images, newImage]);
  }

  function handleDeleteImage(url) {
    const imagesFilter = images.filter(item => item.url !== url);
    setImages(imagesFilter);
  }

  return (
    <Container fluid className="m-0 mt-4">
      <h2 className="fs-5 font-600">Carregar Imagens</h2>
      {images?.map(item => (
        <Container key={item.url} fluid className={`m-0 px-4 py-3 rounded mb-2 ${styled.background}`}>
           <Row key={item.id}>
              <Col sm={10} md={11}>
                <Container fluid className="m-0 p-0 mb-2">
                  <InputGroup className={`m-0 p-0 w-100 rounded ${styled.shadow_input}`}>
                  <FormControl
                    id="icon"
                    className="border-0"
                    placeholder="Insira https://"
                    value={item.url}
                    disabled
                  />
                  </InputGroup>
                </Container>
              </Col>
              <Col sm={2} md={1} className="p-0">
                <div className="w-100 h-100 d-flex justify-content-end align-items-end pb-2">
                <Button
                  className="p-0 m-0 bg-secondary border-0"
                  onClick={() => handleDeleteImage(item.url)}
                >
                  <MdOutlineClose color="#ffffff" size={34}/>
                </Button>
                </div>
              </Col>
            </Row>
        </Container>
      ))}


      <Container fluid className={`m-0 px-4 py-3 rounded ${styled.background}`}>
        <Row>
          <Col xs={10} sm={10} md={11}>
            <Container fluid className="m-0 p-0 mb-2">
              <InputGroup className={`m-0 p-0 w-100 rounded ${styled.shadow_input}`}>
                <FormControl
                  id="description"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className={`${errorUrl ? 'border border-danger' : 'border border-white'}`}
                  placeholder="Insira https://"
                />
              </InputGroup>
            </Container>
          </Col>
          <Col xs={2} sm={2} md={1} className="p-0">
            <div className="w-100 h-100 d-flex justify-content-end align-items-end pb-2">
              <Button className="p-0 m-0" onClick={handleAddImages}><MdOutlineAdd color="#ffffff" size={34}/></Button>
            </div>
          </Col>
          <Form.Text className="text-danger">{errorUrl && errorUrl}</Form.Text>

        </Row>
      </Container>
    </Container>
  )
}
