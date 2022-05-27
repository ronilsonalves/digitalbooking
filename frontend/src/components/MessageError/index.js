import { Link } from "react-router-dom";

import { MdErrorOutline } from 'react-icons/md';

import styled from './styles.module.scss';

export function MessageError({status, setStatus, message, textButton, link = "" }) {
  return(
    <div className={`${styled.page} ${status ? "d-flex" : "d-none"}`}>
      <div className={styled.container}>
        <MdErrorOutline color="#dc3545" size={80}/>
        <div className={styled.box_message}>
          <p className={styled.frase}>{message}</p>
        </div>

        {link ? (
          <Link to={link}>
          <button
            className={styled.botao}
            onClick={() => setStatus(false)}
          >{textButton}</button>
        </Link>
        ) : (
          <button
            className={styled.botao}
            onClick={() => setStatus(false)}
          >{textButton}</button>
        )}
      </div>
    </div>
  );
}
