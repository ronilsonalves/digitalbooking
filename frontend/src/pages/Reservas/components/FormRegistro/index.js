import styled from './styles.module.scss'
import {Container} from 'react-bootstrap'

import { useSession } from '../../../../hooks/useSession';

export function FormRegistro() {
  const { session } = useSession();

  return (
    <>
     <Container fluid className="p-0">
      <Container fluid className=" p-0">
      <h2 className="fs-4 p-0 m-0 mb-2 d-block font-600 px-1">Complete seus dados</h2>

      <div className={styled.formContainer}>
        <div className={styled.divInput}>
          <label className="fs-14 font-600">
            Nome
          </label>
          <input className={styled.input} type="text" disabled value={session.user.nome}/>
        </div>
        <div className={styled.divInput}>
          <label  className="fs-14 font-600">
            Sobrenome

          </label>
          <input className={styled.input} type="text" disabled value={session.user.sobrenome}/>
        </div>
        <div className={styled.divInput}>
          <label className="fs-14 font-600">
            Email

          </label>
          <input className={styled.input} type="text" disabled value={session.user.email}/>
        </div>
        <div className={styled.divInput}>
          <label className="fs-14 font-600">
            Cidade

          </label>
          <input className={styled.input} type="text" name="name" />
        </div>
      </div>
      </Container>
      </Container>
    </>
  );

}


