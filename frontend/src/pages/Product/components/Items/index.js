import { Container, Row, Col } from 'react-bootstrap';

import { BsSnow } from 'react-icons/bs';
import { MdOutlineAirlineSeatReclineNormal, MdDirectionsBike, MdSensors } from 'react-icons/md';
import { GiSteeringWheel, GiCarDoor, GiSuitcase } from 'react-icons/gi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiAlarmWarningLine } from 'react-icons/ri';

export function Items({ items }) {
  return (
    <Container as="section" fluid className="bg-light p-0">
      <Container fluid className="border-bottom border-primary border-2 p-0" >
        <Container fluid className="max-width-1180">
          <h2 className="fs-4 font-600 pt-3 pb-1">O que este carro oferece?</h2>
        </Container>
      </Container>
      <Container fluid className="max-width-1180 py-4">
        <Row>
          {items?.map(item => (
            <Col xs={6} sm={6} md={4} lg={4} xl={3} className="my-3">
              <span className="d-inline-flex align-items-center w-100">
                {item.icone === "BsSnow" && <BsSnow color="#FBC02D" size={20}/>}
                {item.icone === "MdOutlineAirlineSeatReclineNormal" && <MdOutlineAirlineSeatReclineNormal color="#FBC02D" size={20}/>}
                {item.icone === "MdDirectionsBike" && <MdDirectionsBike color="#FBC02D" size={20}/>}
                {item.icone === "MdSensors" && <MdSensors color="#FBC02D" size={20}/>}
                {item.icone === "GiSteeringWheel" && <GiSteeringWheel color="#FBC02D" size={20}/>}
                {item.icone === "GiCarDoor" && <GiCarDoor color="#FBC02D" size={20}/>}
                {item.icone === "GiSuitcase" && <GiSuitcase color="#FBC02D" size={20}/>}
                {item.icone === "AiOutlineDashboard" && <AiOutlineDashboard color="#FBC02D" size={20}/>}
                {item.icone === "RiAlarmWarningLine" && <RiAlarmWarningLine color="#FBC02D" size={20}/>}
                
                <small className="ms-3">{item.nome}</small>
              </span>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>

  )
}
