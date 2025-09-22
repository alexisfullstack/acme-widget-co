import { Money } from "../domain/Money";
import { ProductCatalog } from "../domain/ProductCatalog";

/**
 * Strategy to compute *discounts* applied to a basket.
 * Returns a Money representing total discount (non-negative).
 */
export interface OfferStrategy {
  computeDiscount(items: string[], catalog: ProductCatalog): Money;
}
