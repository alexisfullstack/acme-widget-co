/**
 * Money: integer cents to avoid floating point errors.
 * Provides minimal arithmetic and formatting for USD-like currencies.
 */
export class Money {
  private readonly cents: number;

  private constructor(cents: number) {
    this.cents = Math.trunc(cents);
  }

  static fromCents(cents: number): Money {
    return new Money(cents);
  }

  static fromDollars(amount: number): Money {
    const cents = Math.round(amount * 100);
    return new Money(cents);
  }

  static zero(): Money {
    return new Money(0);
  }

  add(other: Money): Money {
    return new Money(this.cents + other.cents);
  }

  subtract(other: Money): Money {
    return new Money(this.cents - other.cents);
  }

  multiply(n: number): Money {
    return new Money(Math.round(this.cents * n));
  }

  halfRoundedUp(): Money {
    return new Money(Math.floor((this.cents + 1) / 2));
  }

  min(other: Money): Money {
    return new Money(Math.min(this.cents, other.cents));
  }

  max(other: Money): Money {
    return new Money(Math.max(this.cents, other.cents));
  }

  valueInCents(): number {
    return this.cents;
  }

  valueInDollars(): number {
    return this.cents / 100;
  }

  isNegative(): boolean {
    return this.cents < 0;
  }

  greaterThanOrEqual(other: Money): boolean {
    return this.cents >= other.cents;
  }

  lessThan(other: Money): boolean {
    return this.cents < other.cents;
  }

  equals(other: Money): boolean {
    return this.cents === other.cents;
  }

  toString(): string {
    const sign = this.cents < 0 ? "-" : "";
    const abs = Math.abs(this.cents);
    const dollars = Math.floor(abs / 100);
    const cents = abs % 100;
    return `${sign}$${dollars}.${cents.toString().padStart(2, "0")}`;
  }
}
