export enum TradeType {
  BUY = "BUY",
  SELL = "SELL"
}

export class StockTrade {
  constructor(
    private _tickerSymbol: string,
    private _tradeType: TradeType,
    private _price: number,
    private _quantity: number,
    private _id: number,
  ) {

  }

  get tickerSymbol(): string {
    return this._tickerSymbol;
  }
  get tradeType(): TradeType {
    return this._tradeType;
  }
  get price(): number {
    return this._price;
  }
  get quantity(): number {
    return this._quantity;
  }
  get id(): number {
    return this._id;
  }

  toString(): string {
    return `${this._id}, ${this._tickerSymbol} ${this._tradeType} ${this._price} ${this._quantity}`
  }
}