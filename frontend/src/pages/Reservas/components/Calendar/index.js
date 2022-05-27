import { Container } from 'react-bootstrap';

import styled from "./styles.module.scss";
import { CalendarDesktop } from './CalendarDesktop';
import { CalendarMobile } from './CalendarMobile';

export const Calendar = ({ Controller, control, error, setDatasLocacao }) => {
  return (
    <Container as="section" fluid className="p-0 py-3">
      <h2 className="fs-4 font-600 mb-3">Datas disponíveis</h2>
      <Container fluid className={`${styled.container} p-0`}>
        <div className={styled.box_calendar}>
          <CalendarDesktop className={styled.border} Controller={Controller} control={control} error={error} setDatasLocacao={setDatasLocacao}/>
          <CalendarMobile className={styled.border} Controller={Controller} control={control} error={error} setDatasLocacao={setDatasLocacao}/>
          <p className={styled.error}>{error?.message}</p>
       </div>
      </Container>
    </Container>
  );
};
