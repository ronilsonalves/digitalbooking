import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export function BoxForm({ handleSubmit, dataForm, children }) {

  return (
    <Form
      className="w-100"
      style={{maxWidth: "350px"}}
      onSubmit={handleSubmit(dataForm)}
    >
      {children}
    </Form>
  )
}
