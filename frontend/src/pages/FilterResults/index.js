import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { Container } from "react-bootstrap";
import { api } from "../../services/api";
import { Card } from "./components/Card";
import { NotFoundProducts } from "./components/NotFoundProducts"
import { FilterSearchBox } from "../../components/Search";

import styled from './styles.module.scss';

export function FilterResults() {
  const { ...urlParams } = useParams();

  const [apiURL, setApiURL] = useState("");

  async function setApi() {

    if (urlParams.cityId !== undefined && urlParams.categoryId === undefined && urlParams.dateIn === undefined && urlParams.dateOut === undefined) {
      setApiURL(`/produto/cidade/id/${urlParams.cityId}`);
    } else if (urlParams.cityId !== undefined && urlParams.categoryId !== undefined && urlParams.dateIn === undefined && urlParams.dateOut === undefined) {
      setApiURL(`/produto/${urlParams.cityId}/${urlParams.categoryId}`);
    } else if (urlParams.cityId !== undefined && urlParams.categoryId === undefined && urlParams.dateIn !== undefined && urlParams.dateOut !== undefined) {
      setApiURL(`/produto/cidade/${urlParams.cityId}/${urlParams.dateIn}/${urlParams.dateOut}`);
    } else if (urlParams.cityId !== undefined && urlParams.categoryId !== undefined && urlParams.dateIn !== undefined && urlParams.dateOut !== undefined) {
      setApiURL(`/produto/cidade/${urlParams.cityId}/categoria/${urlParams.categoryId}/${urlParams.dateIn}/${urlParams.dateOut}`);
    } else if (urlParams.cityId === undefined && urlParams.categoryId !== undefined && urlParams.dateIn !== undefined && urlParams.dateOut !== undefined) {
      setApiURL(`/produto/categoria/${urlParams.categoryId}/${urlParams.dateIn}/${urlParams.dateOut}`)
    } else if (urlParams.cityId === undefined && urlParams.categoryId === undefined && urlParams.dateIn !== undefined && urlParams.dateOut !== undefined) {
      setApiURL(`/produto/datas/${urlParams.dateIn}/${urlParams.dateOut}`)
    } else if (urlParams.cityId === undefined && urlParams.categoryId !== undefined && urlParams.dateIn === undefined && urlParams.dateOut === undefined) {
      setApiURL(`/produto/categoria/id/${urlParams.categoryId}`)
    } else {
      setApiURL("/produto")
    }
  }

  useEffect(() => {
    setApi();
    // eslint-disable-next-line
  }, [urlParams]);

  function ShowResults() {

    const { data, status } = useQuery(`${apiURL}`, async () => {
      const response = await api.get(apiURL);
      return response.data;
    }, {
      cacheTime: 300000
    });

    if (status !== "loading") {
      return (
        <Container fluid className="px-2">
          <Container fluid className="max-width-1180 px-1 my-3">
            <div className={styled.container}>
              {data.length !== 0 ? data?.map(product => (
                <Card key={product.id} product={product} />
              )) : <NotFoundProducts />}

            </div>
          </Container>
        </Container>
      )
    } else {
      return (
        <Container fluid className="px-2">
          <Container fluid className="max-width-1180 px-1 my-3">
            <div className={styled.container}>
              <NotFoundProducts /> {/* Inserir componente de que está carregando os dados.... */}
            </div>
          </Container>
        </Container>
      )
    }
  }

  return (
    <>
      {<FilterSearchBox />}
      {ShowResults()}
    </>
  )
}
