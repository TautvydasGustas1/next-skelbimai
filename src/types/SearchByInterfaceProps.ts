import { ICities } from "./CitiesInterface";

export interface SearchBy {
  citiesState: ICities[];
  handleSearchSubmit: (values: any) => void;
}
