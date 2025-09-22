import { Money } from "./Money";

export interface Product {
  code: string;
  name: string;
  price: Money;
}
