import { Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { MdLocationPin } from "react-icons/md";

import styled from './styles.module.scss';

export function Card(data) {
  const location = useLocation();
  return (
    /* Card preenchido */
    <div className={`${styled.card} w-100 rounded bg-light`} >

      <div className={`${styled.box_image} d-flex align-items-center justify-content-center p-2`}>
        {data.product.imagens.length > 0 ? <img src={data.product.imagens[0].url} alt={data.product.nome} /> : <img src="https://digitalbooking-t2-g5.s3.amazonaws.com/produtos/noImageAvaible.png" alt={data.product.nome} />}
      </div>
      <div className={`${styled.info} d-flex flex-column p-2`}>
        <header className="d-flex">
          <div className="w-50 d-flex">
            <strong className=" fs-5">{data.product.nome}</strong>
          </div>
          <div className="w-50 d-flex flex-column align-items-end">
            <div className="d-inline text-white bg-secondary px-2 rounded">8</div>
            <small className="font-size-12 d-flex justify-content-center">Muito bom</small>
          </div>
        </header>
        <div className="d-flex flex-wrap px-0 align-items-center py-1 my-1">
          <MdLocationPin size={20} color="#31363F" />
          <span className="fs-14 d-inline align-items-center text-secondary">{data.product.cidade.nome} - </span>
          <small className="transform-uppercase d-inline text-primary fs-12 fw-bold cursor"> MOSTRAR NO MAPA</small>
        </div>
        <div className="flex-grow-1 d-flex align-items-end">
          <p className={`fs-14 d-block mb-2 ${styled.description}`}>{data.product.descricao.substr(0, 100)}</p>
        </div>
        <Link 
          to={`/produto/${data.product.id}`}
          state={{ from: location }}
          replace
        >
          <Button className="w-100 text-white fs-6">Ver detalhes</Button>
        </Link>
      </div>
    </div>
  )
}