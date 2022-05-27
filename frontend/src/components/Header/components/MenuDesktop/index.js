import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserProfile } from '../UserProfile';
import { useSession } from '../../../../hooks/useSession';

import styled from './styles.module.scss';
import { AiOutlinePoweroff } from 'react-icons/ai';

export function MenuDesktop() {
  const { session, deleteSession } = useSession();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function clearSession() {
    deleteSession();
    navigate("/login");
  }

  return (
    <div className={styled.container}>
      {session.user?.funcao?.nome === "USER" && (
        <Link to={`/minhasReservas/${session.user?.id}`}>
          <div className={styled.reservations}>
            <button>Minhas reservas</button>
          </div>
        </Link>
      )}
      {session.user?.funcao?.nome === "ADMIN" && (
        <Link to="/administrador">
          <div className={styled.reservations}>
            <button>Administrar</button>
          </div>
        </Link>
      )}
      {session.user && (
        <>
          <UserProfile bgColor="bg-primary" textColor="text-dark"/>
          <button className={styled.logout} type="button" onClick={clearSession}>
            <AiOutlinePoweroff/>
          </button>
        </>
      )}

      {!session.user && (
        <div className={styled.box_button}>
          {(pathname !== "/login" && pathname !== "/register") && (
            <>
              <Link to="/login">Iniciar Sessão</Link>
              <Link to="/register">Criar Conta</Link>
            </>
          )}
          {pathname === "/register" && <Link to="/login">Iniciar Sessão</Link>}
          {pathname === "/login" && <Link to="/register">Criar Conta</Link>}
        </div>
      )}
    </div>
  )
}


