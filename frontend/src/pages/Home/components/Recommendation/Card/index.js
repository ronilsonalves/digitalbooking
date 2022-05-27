import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import { BsSnow } from 'react-icons/bs';
import { MdOutlineAirlineSeatReclineNormal, MdDirectionsBike, MdSensors } from 'react-icons/md';
import { GiSteeringWheel, GiCarDoor, GiSuitcase } from 'react-icons/gi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiAlarmWarningLine } from 'react-icons/ri';

import { MdLocationPin } from 'react-icons/md';

import styled from './styles.module.scss';

export function Card({data }) {
  const location = useLocation();

  return (
    <div className={`${styled.card} w-100 rounded bg-light`}>
      <div className={`${styled.box_image} d-flex align-items-center justify-content-center p-2`}>
        <img src={data.imagens[0].url} alt={data.imagens[0].titulo}/>
      </div>

      <div className={`${styled.info} d-flex flex-column p-2`}>
       <header className="d-flex">
         <div className="w-50 d-flex">
          <strong className=" fs-6">{data.nome}</strong>
         </div>
         <div className="w-50 d-flex flex-column align-items-end">
           <div className="d-inline text-white bg-secondary px-2 rounded">8</div>
           <small className="font-size-12 d-flex justify-content-center">Muito bom</small>
         </div>
       </header>
       <div className="d-flex flex-wrap px-0 align-items-center py-1 my-0">
          <MdLocationPin size={20} color="#31363F"/>
          <span className="fs-14 d-inline align-items-center text-secondary">{data.cidade.nome} - </span>
          <small className="transform-uppercase d-inline text-primary fs-12 fw-bold cursor">MOSTRAR NO MAPA</small>
        </div>
        <div className="d-flex flex-wrap px-0 align-items-center py-1 my-0">
          {data.caracteristicas.map(item => (
            <>
            {item.icone === "BsSnow" && <BsSnow key={item.icone} className="mx-1" color="#263238" size={20}/>}
            {item.icone === "MdOutlineAirlineSeatReclineNormal" && <MdOutlineAirlineSeatReclineNormal key={item.icone} className="mx-1" color="#263238" size={20}/>}
            {item.icone === "MdDirectionsBike" && <MdDirectionsBike key={item.icone} className="mx-1" color="#263238" size={20}/>}
            {item.icone === "MdSensors" && <MdSensors key={item.icone} className="mx-1" color="#263238" size={20}/>}
            {item.icone === "GiSteeringWheel" && <GiSteeringWheel key={item.icone} className="mx-1" color="#263238" size={20}/>}
            {item.icone === "GiCarDoor" && <GiCarDoor key={item.icone} className="mx-1" color="#263238" size={20}/>}
            {item.icone === "GiSuitcase" && <GiSuitcase key={item.icone} className="mx-1" color="#263238" size={20}/>}
            {item.icone === "AiOutlineDashboard" && <AiOutlineDashboard key={item.icone} className="mx-1" color="#263238" size={20}/>}
            {item.icone === "RiAlarmWarningLine" && <RiAlarmWarningLine key={item.icone} className="mx-1" color="#263238" size={20}/>}
            </>
          ))}
        </div>
        <div className="flex-grow-1 d-flex align-items-end mt-3">
          <p className={`fs-14 d-block mb-2 ${styled.description}`}>{data.descricao.substr(0, 100)}</p>
        </div>
        <Link
          to={`/produto/${data.id}`}
          state={{ from: location }}
          replace
        >
          <Button className="w-100 text-white fs-6">Ver mais</Button>
        </Link>
      </div>
    </div>
  )
}


