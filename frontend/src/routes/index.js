import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Reservas } from '../pages/Reservas/index'
import { ReservasUsuarios } from '../pages/ReservasUsuarios/index'
import { FilterResults } from "../pages/FilterResults";
import { Home } from "../pages/Home/";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { Product } from '../pages/Product';
import { Register } from "../pages/Register";

import { Admin } from '../pages/Admin';

import { useSession } from '../hooks/useSession';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { session } = useSession();
  const location = useLocation();

  return session.user
  ? children
  : (
    <Navigate
      to={'/login'}
      state={{ from: location, message: "Para acessar a página, o login é obrigatório." }}
      replace
    />
  );
}

function AdminRoute({ children }) {
  const { session } = useSession();

  return session.user?.funcao?.nome === "ADMIN"
    ? children
    : (
      <Navigate
        to={'/'}
        replace
      />
    );
}

function BlockRoute({ children }) {
  const { session } = useSession();
  const location = useLocation();

  return !session.user ? children : <Navigate to={location.state ? location.state.from.pathname : "/"} />
}

export function Router() {
  return (
    <BrowserRouter>
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/listar" element={<FilterResults/>}/> {/* exibe todos os produtos */}
          <Route path="/listar/cidade/:cityId/" exact element={<FilterResults/>}/> {/* exibe produtos por cidade */}
          <Route path="/listar/categoria/:categoryId/" exact element={<FilterResults/>}/> {/* exibe produtos por categoria */}
          <Route path="/listar/cidade/:cityId/categoria/:categoryId/" exact element={<FilterResults/>}/> {/* exibe produtos por cidade e categoria */}
          <Route path="/listar/cidade/:cityId/:dateIn/:dateOut/" exact element={<FilterResults/>}/> {/* exibe produtos por cidade e data de disponibilidade */}
          <Route path="/listar/cidade/:cityId/categoria/:categoryId/:dateIn/:dateOut/" exact element={<FilterResults/>}/> {/* exibe produtos por cidade, categoria e data de disponibilidade */}
          <Route path="/listar/categoria/:categoryId/:dateIn/:dateOut/" exact element={<FilterResults/>}/> {/* exibe produtos por categoria e data de disponibilidade */}
          <Route path="/listar/datas/:dateIn/:dateOut/" exact element={<FilterResults/>}/> {/* exibe produtos por data de disponibilidade */}
          <Route path="/produto/:id" element={<Product/>}/>

          <Route path="/administrador" element={
            <AdminRoute>
              <Admin/>
            </AdminRoute>
          }/>

          <Route path="/login" element={
            <BlockRoute>
              <Login />
            </BlockRoute>
           }/>

          <Route path="/register" element={
            <BlockRoute>
              <Register />
            </BlockRoute>
           }/>

          <Route path="/reservas/:id" element={
            <PrivateRoute>
              <Reservas />
            </PrivateRoute>
          }/>

          <Route path="/minhasReservas/:id" element={
            <PrivateRoute>
              <ReservasUsuarios/>
            </PrivateRoute>
          }/>

          <Route path="*" element={<NotFound />}/>
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}
