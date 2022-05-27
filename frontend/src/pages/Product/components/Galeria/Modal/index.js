import React from 'react'
import { Carousel } from 'react-carousel-minimal';

import styled from './styles.module.scss';

const captionStyle = {
  fontSize: '2em',
  fontWeight: 'bold',
}

const slideNumberStyle = {
  fontSize: '20px',
  fontWeight: '500',
}

export function Modal({ modalIsOpen, setModalIsOpen, images }) {
  const data = images.map(image => {
    return {
      ...image,
      image: image.url
    }
  });

  if(!modalIsOpen) return null;

  if(data.length > 0 ) {
    return (
      <div className={styled.modal}>
        <div style={{ textAlign: "center" }}>
        <button className={styled.close} onClick={() => setModalIsOpen(false)}/>
          <div style={{
            padding: "0 20px"
          }}>
            <Carousel
              data={data}
              time={2000}
              width="850px"
              height="450px"
              captionStyle={captionStyle}
              radius="10px"
              slideNumber={true}
              slideNumberStyle={slideNumberStyle}
              captionPosition="bottom"
              automatic={true}
              dots={true}
              pauseIconColor="white"
              pauseIconSize="40px"
              slideBackgroundColor="darkgrey"
              slideImageFit="cover"
              thumbnails={true}
              thumbnailWidth="100px"
              style={{
                textAlign: "center",
                maxWidth: "850px",
                maxHeight: "500px",
                margin: "40px auto",
              }}
            />
  
          </div>
  
        </div>
  
      </div>
    );
  }
}




