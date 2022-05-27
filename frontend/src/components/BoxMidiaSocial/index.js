import { Stack } from 'react-bootstrap';
import { BsLinkedin } from 'react-icons/bs';
import { FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa';

export function BoxMidiaSocial({color}) {
  return (
    <Stack direction="horizontal" gap={2}>
      <BsLinkedin color={color} size={20}/>
      <FaTwitter color={color} size={20}/>
      <FaInstagram color={color} size={20}/>
      <FaFacebookSquare color={color} size={20}/>
    </Stack>
  )
}
