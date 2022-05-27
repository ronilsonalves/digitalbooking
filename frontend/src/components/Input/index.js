import { Form } from 'react-bootstrap';

export function Input({type, label, error, register, name, ...rest}) {
  return (
    <Form.Group>
      <Form.Label className="font-size-14">{label}</Form.Label>
      <Form.Control
        className={`
          shadow-sm m-0
          ${error ? 'border border-danger background-error-input' : 'border border-white'}
        `}
        type={type}
        {...register(name)}
        {...rest}
      />
      <Form.Text className="text-danger">{error?.message}</Form.Text>
    </Form.Group>
  )
};
