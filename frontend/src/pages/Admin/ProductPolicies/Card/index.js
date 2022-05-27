import { Container, Form } from 'react-bootstrap';

import styled from './styles.module.scss';

export function Card({ register, error, title, name, ...rest }) {
    return (
        <div className='mb-4'>
            <h2 className='fs-6 mb-3 font-600'>{title}</h2>
            <Container fluid className="m-0 p-0 mb-2 d-flex flex-column">
                <Form.Label htmlFor="description" className="m-0 p-0 fs-14 mb-1 font-500">Descrição</Form.Label>
                <textarea 
                    className={`m-0 p-2 rounded shadow_input ${styled.textarea} ${styled.textarea} ${error?.message ? 'border border-danger' : 'border border-white'}`}
                    {...register(name)}
                    {...rest}
                />
                <Form.Text className="text-danger">{error?.message}</Form.Text>
            </Container>
        </div>
    );
}