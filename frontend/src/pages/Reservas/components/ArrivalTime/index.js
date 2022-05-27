import styled from './styles.module.scss';
import { Container } from 'react-bootstrap';
import { AiOutlineCheckCircle } from 'react-icons/ai';

export function ArrivalTime({register, error}) {
  return (
    <>
      <Container fluid className="p-0">
        <Container fluid className="p-0">

          <h2 className="fs-4 p-0 m-0 mb-2 d-block w-100 font-600 px-1">Seu horário de chegada</h2>
          <div className={styled.container}>
            <div className="d-flex align-items-center">
              <AiOutlineCheckCircle size={20} color="#31363F" />
              <span className="fs-14 d-inline ms-2 text-secondary">Seu horário de retirada é entre 10h00 e 14h00</span>
            </div>
            
            <div className="mt-2">
              <p className="fs-14 align-items-center m-0 p-0 mb-1 text-secondary">Indique a sua hora prevista de chegada</p>
              <select 
                className={`${styled.box} p-0 m-0 ${error && styled.border}`}
                {...register("horarioInicial")}
              >
                <option className="p-0 m-0 mb-2 d-block w-100 font-400 px-1" value="" disabled selected>Selecione seu horário de chegada...</option>
                <option value="10:00">10:00 AM</option>
                <option value="10:30">10:30 AM</option>
                <option value="11:30">11:30 AM</option>
                <option value="12:00">12:00 AM</option>
                <option value="12:30">12:30 PM</option>
                <option value="13:30">13:30 PM</option>
                <option value="14:00">14:00 PM</option>
              </select>
            </div>
            
            <p className='fs-14 text-danger'>{error?.message}</p>
          </div>
        </Container>
      </Container>
    </>
  )
}
