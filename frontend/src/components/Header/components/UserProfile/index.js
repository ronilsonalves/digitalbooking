import { useSession } from '../../../../hooks/useSession';

import styled from './styles.module.scss';

export function UserProfile({bgColor, textColor}) {
  const { session } = useSession();

  return (
    <div className={styled.container}>
      <div className={styled.profile}>
        <div className={`${bgColor}`}>{session.user.nameAcronym}</div>
        <span className={`${textColor}`}>Olá, <br/>{session.user.fullName}</span>
      </div>
    </div>
  )
}
