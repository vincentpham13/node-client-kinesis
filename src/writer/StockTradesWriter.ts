import { KinesisClient, PutRecordCommand } from '@aws-sdk/client-kinesis';
import { fromIni } from '@aws-sdk/credential-provider-ini';
import { StockTrade } from '../models/StockTrade';

import { validateStream } from '../utils';
import { StockTradeGenerator } from './StockTradeGenerator';

async function sendStockTrade(trade: StockTrade, kinesisClient: KinesisClient, streamName: string): Promise<void> {
  const bytes = Buffer.from(JSON.stringify(trade));

  if (!bytes) {
    throw new Error("Could not get JSON bytes for stock trade");
  }

  const putRecordCommand = new PutRecordCommand({
    StreamName: streamName,
    Data: bytes,
    PartitionKey: trade.tickerSymbol,
  });

  const result = await kinesisClient.send(putRecordCommand);
}

async function executor() {
  try {
    // Init Kinesis Client
    const kinesisClient = new KinesisClient({
      apiVersion: '',
      region: 'us-east-1',
      credentialDefaultProvider: fromIni
    });

    validateStream(kinesisClient, 'StockTradeStream');

    const stockGenerator = new StockTradeGenerator();

    // limited executes
    let i = 0;
    const inverval = setInterval(async function () {
      const trade = stockGenerator.getRandomTrade();
      await sendStockTrade(trade, kinesisClient, 'StockTradeStream');
      i++;

      if (i === 1000) {
        clearInterval(inverval);
      }
    }, 100);
  } catch (error) {
    console.log("🚀 ~ file: main.ts ~ line 22 ~ executor ~ error", error)
  }
}

executor();