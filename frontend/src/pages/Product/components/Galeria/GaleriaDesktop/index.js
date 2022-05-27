import React from 'react';

import styled from './styles.module.scss';

export function GaleriaDesktop({images, setModalIsOpen}) {
  
  return (
    <div className={styled.container}>
      <div className={styled.item1}>
        <img className={styled.img}  src={images[0]?.url} alt=""/>
      </div>
      <div className={styled.item}>
        <img className={styled.img} src={images[1]?.url} alt=""/>
      </div>
      <div className={styled.item}>
        <img className={styled.img} src={images[2]?.url} alt=""/>
      </div>
      <div className={styled.item} >
        <img className={styled.img} src={images[3]?.url} alt=""/>
      </div>
      <div className={styled.item}>
        <img className={styled.img} src={images[4]?.url} alt=""/>
        <button className={styled.button} onClick={() => setModalIsOpen(true)}> Ver mais</button>
      </div>
    </div>
  );
}
