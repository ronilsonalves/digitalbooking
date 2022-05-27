import { Container } from 'react-bootstrap';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';

export function HeaderInfo({ category, name}) {
  const location = useLocation();

  return (
    <Container fluid className="bg-secondary py-2">
      <Container fluid className="max-width-1180 p-0 d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column text-white">
          <span className="fs-6">{category}</span>
          <strong className="font-600 fs-5">{name}</strong>
        </div>
        <Link to={location.state?.from?.pathname ? location.state?.from?.pathname : ""}>
          <button className="d-flex justify-content-end">
            <IoIosArrowBack className="d-block" color="#ffffff" size={50}/>
          </button>
        </Link>
      </Container>
    </Container>
  )
}
