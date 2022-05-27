import { createContext, useContext, useState } from "react";

const ContextSession = createContext({});

export function ContextSessionProvider({ children }) {
  const [session, setSession] = useState(() => {
    const session = JSON.parse(localStorage.getItem("@SESSION"));

    if(!session) {
      return {};
    }

    return session;
  });

  function createSession(data) {
    const { token } = data;
    const { id, nome, sobrenome, email, funcao } = data.usuarioDTO;

    const user = {
      token,
      user: {
        id,
        nome,
        sobrenome,
        email,
        funcao,
        fullName: nome + " " + sobrenome,
        nameAcronym: nome.substring(0, 1) + sobrenome.substring(0, 1),
      }
    }

    localStorage.setItem("@SESSION", JSON.stringify(user));
    setSession(user);
  }

  function deleteSession() {
    localStorage.setItem("@SESSION", JSON.stringify(null));
    setSession({});
  }

  return (
    <ContextSession.Provider value={{session, createSession, deleteSession}}>
      {children}
    </ContextSession.Provider>
  )
}

export function useSession() {
  return useContext(ContextSession);
}
