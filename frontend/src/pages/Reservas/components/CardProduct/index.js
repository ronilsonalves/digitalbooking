import { Button, Spinner } from "react-bootstrap";
import { MdLocationPin } from 'react-icons/md';

import styled from './styles.module.scss';

export function CardProduct({ data, datasLocacao, isLoading }) {
  let dataRetirada = null;
  let dataDevolucao = null;

  if(datasLocacao) {

    if(datasLocacao[0]) {
      const data = new Date(datasLocacao[0]);
      const dateFormated = new Intl.DateTimeFormat("pt-br").format(data);
      dataRetirada = String(dateFormated);
    }

    if(datasLocacao[1]) {
      const data = new Date(datasLocacao[1]);
      const dateFormated = new Intl.DateTimeFormat("pt-br").format(data);
      dataDevolucao = String(dateFormated);
    }
  }

  return (
    <div className={`${styled.card} w-100 rounded d-flex flex-column`}>
      <div className={`${styled.box_title} d-flex align-items-center ps-3`}>
        <h2 className="fs-5 font-600 d-flex align-items-center m-0">Detalhe da reserva</h2>
      </div>
      <div className={styled.container_details}>
        <div className={styled.box_image}>
          <img src={data.imagens[0].url} alt="carro"/>
        </div>
      
        <div className={styled.box_details}>
          <div>
            <small>{data.categoria.titulo}</small>
            <h3 className="d-block fs-4">{data.nome}</h3>
          </div>
          <div className="d-flex align-items-center">
            <MdLocationPin/>
            <span>{data.cidade.nome}</span>
          </div>
          <div className={`${styled.box_datas} ${styled.border} mt-4`}>
            <small>Retirada</small>
            <span>{dataRetirada ? dataRetirada : "dd/mm/aaaa"}</span>
          </div>
          <div className={`${styled.box_datas} ${styled.border_bottom}`}>
            <small>Devolução</small>
            <span>{dataDevolucao ? dataDevolucao : "dd/mm/aaaa"}</span>
          </div>
          <div className={styled.box_button}>
            <Button className="w-100 mt-2 text-white" type="submit">
            {isLoading ? <Spinner animation="grow" size="sm" /> : "Confirmar Reserva"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}