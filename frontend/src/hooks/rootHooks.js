import { ContextSessionProvider } from './useSession';
import { ContextMenuMobileProvider } from './useMenuMobile';
import { ContextModalProvider } from './useModal';

export function RootHooks({ children }) {
  return (
    <ContextSessionProvider>
      <ContextMenuMobileProvider>
          <ContextModalProvider>
            {children}
          </ContextModalProvider>
      </ContextMenuMobileProvider>
    </ContextSessionProvider>
  )
}