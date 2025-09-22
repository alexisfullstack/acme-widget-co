import { Basket, InMemoryCatalog, TieredDelivery, BuyOneGetSecondHalfPrice, Money, Product } from "../index";

// Catalog
const products: Product[] = [
  { code: "R01", name: "Red Widget", price: Money.fromDollars(32.95) },
  { code: "G01", name: "Green Widget", price: Money.fromDollars(24.95) },
  { code: "B01", name: "Blue Widget",  price: Money.fromDollars(7.95)  },
];

const catalog = new InMemoryCatalog(products);

// Delivery rule: under $50 => $4.95; under $90 => $2.95; $90+ => free.
const delivery = new TieredDelivery(
  [
    { underAmount: 50, charge: 4.95 },
    { underAmount: 90, charge: 2.95 },
  ],
  90
);

// Offer: buy one red widget, get the second half price.
const offers = [new BuyOneGetSecondHalfPrice("R01")];

function runBasket(codes: string[]) {
  const basket = new Basket(catalog, delivery, offers);
  codes.forEach(c => basket.add(c));
  const total = basket.total();
  console.log(`${codes.join(", ")} => ${total.toString()}`);
}

console.log("Demo — sample baskets and totals");
runBasket(["B01", "G01"]);                       // $37.85
runBasket(["R01", "R01"]);                       // $54.37
runBasket(["R01", "G01"]);                       // $60.85
runBasket(["B01", "B01", "R01", "R01", "R01"]);  // $98.27
