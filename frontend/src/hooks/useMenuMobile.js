import { createContext, useContext, useState } from "react";

const ContextMenuMobile = createContext();

export function ContextMenuMobileProvider({children}) {
  const [statusMenu, setStatusMenu] = useState(false);

  return (
    <ContextMenuMobile.Provider value={{statusMenu, setStatusMenu}}>
      {children}
    </ContextMenuMobile.Provider>
  );
}

export function useMenuMobile() {
  return useContext(ContextMenuMobile);
}
