import { Recommendation } from "./components/Recommendation";
import { SearchBox } from "../../components/Search";
//import { Search } from "./components/Search";
import { CarCategory } from "./components/CarCategory";

export function Home() {
  return (
    <>
      <SearchBox/>
      <CarCategory/>
      <Recommendation/>
    </>
  );
}
