import styled from './styles.module.scss';

export function Loading() {
  return (
    <div className={styled.container}>
      <div className={styled.box}>
        <div className={styled.box_animation}>
          <span className="fs-3 text-white">Carregando</span>
          <div className={styled.lds_ellipsis}><div></div><div></div><div></div><div></div></div>
        </div>
      </div>
    </div>
  )
}
