import { IoMdClose } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BoxMidiaSocial } from '../../../BoxMidiaSocial';
import { UserProfile } from '../UserProfile';
import { useMenuMobile } from '../../../../hooks/useMenuMobile';

import styled from './styles.module.scss';
import { useSession } from '../../../../hooks/useSession';

export function MenuMobile() {
  const { statusMenu, setStatusMenu } = useMenuMobile(false);
  const { pathname } = useLocation();
  const { session, deleteSession } = useSession();
  const navigate = useNavigate();

  function clearSession() {
    deleteSession();
    setStatusMenu(false);
    navigate("/login");
  }

  return (
    <div className={statusMenu ? styled.open : styled.close}>
      <div className={`${styled.nav}`}>
        <header>
          <div>
            <button onClick={() => setStatusMenu(false)} type="button">
              <IoMdClose size={27} color="#ffffff"/>
            </button>
          </div>
          {session.user && <UserProfile bgColor="bg-light" textColor="text-white"/>}
        </header>
        <div>
          {((pathname !== "/login" && pathname !== "/register") && !session.user) &&
            <>
              <Link to="/login" onClick={() => setStatusMenu(false)}>Iniciar Sessão</Link>
              <Link to="/register" onClick={() => setStatusMenu(false)}>Criar Conta</Link>
            </>
          }

          {(pathname === "/register" && !session.user) &&
            <Link to="/login" onClick={() => setStatusMenu(false)}>Iniciar Sessão</Link>
          }

          {(pathname === "/login" && !session.user) &&
            <Link to="/register" onClick={() => setStatusMenu(false)}>Criar Conta</Link>
          }

          {session.user?.funcao?.nome === "USER" && (
            <Link to={`/minhasReservas/${session.user?.id}`} onClick={() => setStatusMenu(false)}>Minhas Reservas</Link>
          )}

          {session.user?.funcao?.nome === "ADMIN" && (
            <Link to="/administrador" onClick={() => setStatusMenu(false)}>Administrar</Link>
          )}

          {session.user && <button onClick={clearSession}>Sair</button>}
        </div>
        <footer>
          <BoxMidiaSocial color="#FBC02D" />
        </footer>
      </div>
    </div>

  );
}
