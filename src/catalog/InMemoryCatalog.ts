import { Product } from "../domain/Product";
import { ProductCatalog } from "../domain/ProductCatalog";

export class InMemoryCatalog implements ProductCatalog {
  private readonly productsByCode: Map<string, Product>;

  constructor(products: Product[]) {
    this.productsByCode = new Map(products.map(p => [p.code, p]));
  }

  getByCode(code: string): Product | undefined {
    return this.productsByCode.get(code);
  }
}
