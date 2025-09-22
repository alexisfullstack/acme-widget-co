import { Money } from "../domain/Money";
import { ProductCatalog } from "../domain/ProductCatalog";
import { OfferStrategy } from "./OfferStrategy";

/**
 * "Buy one, get the second half price" for a specific product code.
 * For each pair of the target product, discount equals half the unit price, rounded *up* to nearest cent.
 */
export class BuyOneGetSecondHalfPrice implements OfferStrategy {
  constructor(private readonly targetCode: string) {}

  computeDiscount(items: string[], catalog: ProductCatalog): Money {
    const count = items.filter(code => code === this.targetCode).length;
    if (count < 2) return Money.zero();

    const product = catalog.getByCode(this.targetCode);
    if (!product) return Money.zero();

    const pairs = Math.floor(count / 2);
    const half = product.price.halfRoundedUp();
    return Money.fromCents(half.valueInCents() * pairs);
  }
}
