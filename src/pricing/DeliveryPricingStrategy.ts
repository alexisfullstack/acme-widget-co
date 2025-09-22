import { Money } from "../domain/Money";

/**
 * Strategy for delivery pricing.
 * Given the net items total (after discounts), return the delivery charge.
 */
export interface DeliveryPricingStrategy {
  compute(netItemsTotal: Money): Money;
}
