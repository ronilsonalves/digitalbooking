import { createContext, useContext, useState } from "react";

const ContextModal = createContext();

export function ContextModalProvider({children}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <ContextModal.Provider value={{modalIsOpen, setModalIsOpen}}>
      {children}
    </ContextModal.Provider>
  )
}

export function useModal() {
  return useContext(ContextModal);
}