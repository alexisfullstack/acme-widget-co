import { DeliveryPricingStrategy } from "./DeliveryPricingStrategy";
import { Money } from "../domain/Money";

/**
 * Tiered delivery pricing by net items total (after discounts).
 * Rules are evaluated from lowest to highest threshold.
 */
export type DeliveryTier = {
  underAmount: number;
  charge: number;
};

export class TieredDelivery implements DeliveryPricingStrategy {
  private readonly tiers: { limit: Money; charge: Money }[];
  private readonly freeThreshold: Money | null;

  /**
   * @param tiers list of tiers sorted by underAmount ascending. Last tier typically covers under X amounts.
   * @param freeOver if provided, delivery is free when net items total >= this amount (in dollars)
   */
  constructor(tiers: DeliveryTier[], freeOver?: number) {
    this.tiers = tiers.map(t => ({ limit: Money.fromDollars(t.underAmount), charge: Money.fromDollars(t.charge) }));
    this.freeThreshold = typeof freeOver === "number" ? Money.fromDollars(freeOver) : null;
  }

  compute(netItemsTotal: Money): Money {
    if (this.freeThreshold && netItemsTotal.greaterThanOrEqual(this.freeThreshold)) {
      return Money.zero();
    }
    for (const t of this.tiers) {
      if (netItemsTotal.lessThan(t.limit)) {
        return t.charge;
      }
    }

    return Money.zero();
  }
}
