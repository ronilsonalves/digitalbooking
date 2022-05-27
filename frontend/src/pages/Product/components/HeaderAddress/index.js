import { Container } from 'react-bootstrap';
import { AiFillStar } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';

import styled from './styles.module.scss';

export function HeaderAddress({ city }) {
  return (
    <Container fluid className="py-2">
      <Container fluid className="max-width-1180 p-0 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <MdLocationOn className="" size={24} color="#263238"/>
          <p className="m-0 ms-2">{city}</p>
        </div>
        <div className={`d-flex align-items-center ${styled.width}`}>
          <div>
            <small className="fs-14">Muito bom</small>
            <div className="p-0">
              <AiFillStar color="#FBC02D"/>
              <AiFillStar color="#FBC02D"/>
              <AiFillStar color="#FBC02D"/>
              <AiFillStar color="#FBC02D"/>
              <AiFillStar color="#CCCCCC"/>
            </div>
          </div>
          <div>
            <span className="ms-2 bg-secondary text-white py-1 px-2 d-flex justify-content-center align-items-center rounded">8</span>
          </div>
        </div>
      </Container>
    </Container>
  );
}
