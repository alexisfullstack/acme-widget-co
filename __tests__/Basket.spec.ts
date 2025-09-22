import { describe, it, expect } from "vitest";
import { Basket, InMemoryCatalog, TieredDelivery, BuyOneGetSecondHalfPrice, Money, Product } from "../src";

const products: Product[] = [
  { code: "R01", name: "Red Widget", price: Money.fromDollars(32.95) },
  { code: "G01", name: "Green Widget", price: Money.fromDollars(24.95) },
  { code: "B01", name: "Blue Widget",  price: Money.fromDollars(7.95)  },
];

const catalog = new InMemoryCatalog(products);
const delivery = new TieredDelivery(
  [
    { underAmount: 50, charge: 4.95 },
    { underAmount: 90, charge: 2.95 },
  ],
  90
);
const offers = [new BuyOneGetSecondHalfPrice("R01")];

describe("Basket totals", () => {
  it("B01, G01 => $37.85", () => {
    const basket = new Basket(catalog, delivery, offers);
    basket.add("B01");
    basket.add("G01");
    expect(basket.total().toString()).toBe("$37.85");
  });

  it("R01, R01 => $54.37", () => {
    const basket = new Basket(catalog, delivery, offers);
    basket.add("R01");
    basket.add("R01");
    expect(basket.total().toString()).toBe("$54.37");
  });

  it("R01, G01 => $60.85", () => {
    const basket = new Basket(catalog, delivery, offers);
    basket.add("R01");
    basket.add("G01");
    expect(basket.total().toString()).toBe("$60.85");
  });

  it("B01, B01, R01, R01, R01 => $98.27", () => {
    const basket = new Basket(catalog, delivery, offers);
    ["B01","B01","R01","R01","R01"].forEach(c => basket.add(c));
    expect(basket.total().toString()).toBe("$98.27");
  });

  it("throws for unknown product", () => {
    const basket = new Basket(catalog, delivery, offers);
    expect(() => basket.add("NOPE")).toThrow();
  });
});
