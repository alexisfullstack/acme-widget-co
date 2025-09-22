# Acme Widget Co — Basket (Node + TypeScript)

Proof of concept for Acme Widget Co's sales system. Implements a shopping basket with delivery rules and promotional offers. 

## Covered requirements

- NodeJS / TypeScript
- Clear separation of concerns (domain, pricing, basket)
- Small, precise interfaces (`ProductCatalog`, `OfferStrategy`, `DeliveryPricingStrategy`)
- Dependency injection (catalog, delivery strategy, offers passed into `Basket`)
- Strategy pattern for delivery and offers
- Extensible design without rewriting existing code
- Unit tests (Vitest)
- Command-line demo, no UI or frameworks

---

## Getting started

```bash
# Node 18+ recommended
npm install
npm test      # run unit tests
npm run build # compile to dist/
npm start     # run demo with example baskets