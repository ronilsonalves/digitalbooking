import styled from './styles.module.scss';

import { MdLocationPin } from 'react-icons/md';

export function Card({ data }) {
  return (
      <div className={`${styled.card} w-100 rounded bg-light`}>
        <div className={`${styled.box_image} d-flex align-items-center justify-content-center p-2`}>
          <img src={data.produto.imagens[0]?.url} alt=""/>
        </div>

        <div className={`${styled.info} d-flex flex-column p-2`}>
          <header className="d-flex">
            <div className="w-50 d-flex">
              <strong className=" fs-6">{data.produto.nome}</strong>
            </div>
            <div className="w-50 d-flex flex-column align-items-end">
              <div className="d-inline text-white bg-secondary px-2 rounded">8</div>
              <small className="font-size-12 d-flex justify-content-center">Muito bom</small>
            </div>
          </header>
          <div className="d-flex flex-wrap px-0 align-items-center py-1 my-0 my-1">
            <MdLocationPin size={20} color="#31363F" />
            <span className="fs-14 d-inline align-items-center text-secondary">{data.produto.cidade.nome} - </span>
            <small className="transform-uppercase d-inline text-primary fs-12 fw-bold cursor">MOSTRAR NO MAPA</small>
          </div>

          <span className="fs-14 d-inline align-items-center text-secondary">
            Retirada: {new Date(data.dataInicial).toLocaleString('pt-br', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </span>
          <span className="fs-14 d-inline align-items-center text-secondary">
            Devolução: {new Date(data.dataFinal).toLocaleString('pt-br', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </span>

          <div className="flex-grow-1 d-flex align-items-center mt-3">
            <p className={`fs-14 d-block mb-2 ${styled.description}`}>{data.produto.descricao.substr(0, 100)}</p>
          </div>

        </div>
      </div>


  );

}
