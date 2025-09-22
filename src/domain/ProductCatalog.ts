import { Product } from "./Product";

export interface ProductCatalog {
  getByCode(code: string): Product | undefined;
}
