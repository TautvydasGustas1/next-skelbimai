export const test = {
  name: "",
  price: "",
  state: "",
  manufacturer: "",
};

class Elektronika {
  public name: string;
  public price: number;
  public state: string;
  public manufacturer: string;

  constructor(
    name: string,
    price: number,
    state: string,
    manufacturer: string
  ) {
    this.name = name;
    this.price = price;
    this.state = state;
    this.manufacturer = manufacturer;
  }
}

export class Nesiojami extends Elektronika {
  operacine: string;

  constructor(
    name: string,
    price: number,
    state: string,
    manufacturer: string,
    operacine: string
  ) {
    super(name, price, state, manufacturer);
    this.operacine = operacine;
  }
}

// this.operacine = operacine;
// this.procesorius = procesorius;
// this.vaizdo_plokste = vaizdo_plokste;
// this.ramai = ramai;
// procesorius: number;
//   vaizdo_plokste: string;
//   ramai: string;
