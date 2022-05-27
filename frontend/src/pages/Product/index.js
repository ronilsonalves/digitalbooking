
import { HeaderInfo } from './components/HeaderInfo';
import { HeaderAddress } from './components/HeaderAddress'

import { Description } from './components/Description';
import { Politicas } from './components/Politicas';
import { BoxDate } from "./components/BoxDate";
import { Items } from "./components/Items";
import { Map } from "./components/Map";
import { useParams } from 'react-router-dom';

import { api } from '../../services/api';
import { useQuery } from 'react-query';
import { Loading } from '../../components/Loading';
import { Gallery } from './components/Galeria';

export function Product() {
  const { id } = useParams();

  const { data, isLoading } = useQuery(["produtoDetalhes", id], async () => {
    const response = await api.get(`/produto/${id}`);
    return response.data;
    }, {
      staleTime: 1000 * 60 * 10,
    }
  );

  return isLoading ? <Loading/> : (
    <>
      <HeaderInfo category={data.categoria.titulo} name={data.nome}/>
      <HeaderAddress city={data.cidade.nome}/>
      <Gallery images={data.imagens}/>
      <Description description={data.descricao}/>
      <Items items={data.caracteristicas}/>
      <BoxDate id={data.id}/>
      <Map />
      <Politicas politica={data.politica} regra={data.regra} seguranca={data.seguranca}/>
    </>
  )
}
