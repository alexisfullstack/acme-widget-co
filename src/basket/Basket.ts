import { ProductCatalog } from "../domain/ProductCatalog";
import { Money } from "../domain/Money";
import { OfferStrategy } from "../pricing/OfferStrategy";
import { DeliveryPricingStrategy } from "../pricing/DeliveryPricingStrategy";

/**
 * Basket aggregates items as product codes and computes totals via injected strategies.
 */
export class Basket {
  private readonly items: string[] = [];

  constructor(
    private readonly catalog: ProductCatalog,
    private readonly deliveryStrategy: DeliveryPricingStrategy,
    private readonly offers: OfferStrategy[] = []
  ) {}

  add(code: string): void {
    const product = this.catalog.getByCode(code);
    if (!product) throw new Error(`Unknown product code: ${code}`);
    this.items.push(code);
  }

  total(): Money {
    const subtotal = this.items.reduce((acc, code) => {
      const p = this.catalog.getByCode(code)!;
      return acc.add(p.price);
    }, Money.zero());

    const discount = this.offers.reduce((acc, offer) => acc.add(offer.computeDiscount(this.items, this.catalog)), Money.zero());

    const netItemsTotal = subtotal.subtract(discount);
    const delivery = this.deliveryStrategy.compute(netItemsTotal);
    return netItemsTotal.add(delivery);
  }
}
