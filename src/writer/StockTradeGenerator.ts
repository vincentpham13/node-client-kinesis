import { StockTrade, TradeType } from '../models/StockTrade';

interface StockPrice {
  tickerSymbol: string;
  price: number;
}

export class StockTradeGenerator {
  private STOCK_PRICES: StockPrice[] = [
    {
      tickerSymbol: 'AAPL',
      price: 119.72
    },
    {
      tickerSymbol: 'XOM',
      price: 91.56
    },
    {
      tickerSymbol: 'GOOG',
      price: 527.83
    },
    {
      tickerSymbol: 'BRK',
      price: 223999.88
    },
    {
      tickerSymbol: 'MSFT',
      price: 42.36
    },
    {
      tickerSymbol: 'WFC',
      price: 54.21
    },
    {
      tickerSymbol: 'JNJ',
      price: 99.78
    },
    {
      tickerSymbol: 'WMT',
      price: 85.91
    },
    {
      tickerSymbol: 'CHL',
      price: 66.96
    },
    {
      tickerSymbol: 'GE',
      price: 24.64
    },
    {
      tickerSymbol: 'NVS',
      price: 102.46
    },
    {
      tickerSymbol: 'PG',
      price: 85.05
    },
    {
      tickerSymbol: 'JPM',
      price: 57.82
    },
    {
      tickerSymbol: 'RDS',
      price: 66.72
    },
    {
      tickerSymbol: 'CVX',
      price: 110.43
    },
    {
      tickerSymbol: 'PFE',
      price: 33.07
    },
    {
      tickerSymbol: 'FB',
      price: 74.44
    },
    {
      tickerSymbol: 'VZ',
      price: 49.09
    },
    {
      tickerSymbol: 'PTR',
      price: 111.08
    },
    {
      tickerSymbol: 'BUD',
      price: 120.39
    },
    {
      tickerSymbol: 'ORCL',
      price: 43.40
    },
    {
      tickerSymbol: 'KO',
      price: 41.23
    },
    {
      tickerSymbol: 'T',
      price: 34.64
    },
    {
      tickerSymbol: 'DIS',
      price: 101.73
    },
    {
      tickerSymbol: 'AMZN',
      price: 370.56
    },
  ];


  /** The ratio of the deviation from the mean price **/
  private MAX_DEVIATION: number = 0.2; // ie 20%

  /** The number of shares is picked randomly between 1 and the MAX_QUANTITY **/
  private MAX_QUANTITY: number = 10000;

  /** Probability of trade being a sell **/
  private PROBABILITY_SELL: number = 0.4; // ie 40%

  getRandomTrade(): StockTrade {
    const randIndex = Math.floor(Math.random() * 25);
    const stockPrice = this.STOCK_PRICES[randIndex];
    
    // pick a random deviation between -MAX_DEVIATION AND +MAX_DEVIATION
    const deviation = (Math.random() - 0.5) * 2.0 * this.MAX_DEVIATION;

    // set the price using the deviation and mean price
    let price = stockPrice.price * (1 + deviation);

    // round price to 2 decimal places

    price = Math.round(price * 100.0) / 100.0;

    let tradeType = TradeType.BUY;

    if(Math.random() < this.PROBABILITY_SELL) {
      tradeType = TradeType.SELL;
    }

    // const quantity = math.

    return new StockTrade(
      stockPrice.tickerSymbol,
      tradeType,
      price,
      100,
      100,
    )
  }
}