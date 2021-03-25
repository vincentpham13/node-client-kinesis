import { KinesisClient, DescribeStreamInput, DescribeStreamCommand, StreamStatus } from '@aws-sdk/client-kinesis';

export async function validateStream(kinesisClient: KinesisClient, streamName: string): Promise<void> {
  try {
    const describeStreamInput: DescribeStreamInput = {
      StreamName: streamName,
    }
    const describeStreamCommand = new DescribeStreamCommand(describeStreamInput)
    const data = await kinesisClient.send(describeStreamCommand);
    if (data.StreamDescription && data.StreamDescription.StreamStatus !== StreamStatus.ACTIVE) {
      throw new Error("Stream data is not ACTIVE")
    }
  } catch (error) {
    console.log("🚀 ~ file: index.ts ~ line 14 ~ validateStream ~ error", error)
  }
}