import { SimulationParams, SimulationStep } from '../types';

export const runLeakyBucket = (params: SimulationParams): SimulationStep[] => {
  const { bucketCapacity, outflowRate, packets } = params;
  let currentBucket = 0;
  const steps: SimulationStep[] = [];

  packets.forEach((incomingPacket, index) => {
    const time = index + 1;
    const startBucket = currentBucket;
    
    // 1. Add incoming to bucket
    let dropped = 0;
    if (currentBucket + incomingPacket > bucketCapacity) {
      dropped = (currentBucket + incomingPacket) - bucketCapacity;
      currentBucket = bucketCapacity;
    } else {
      currentBucket += incomingPacket;
    }

    // 2. Leak (Send)
    let sent = 0;
    if (currentBucket >= outflowRate) {
        sent = outflowRate;
        currentBucket -= outflowRate;
    } else {
        sent = currentBucket;
        currentBucket = 0;
    }

    steps.push({
      time,
      incoming: incomingPacket,
      bufferBefore: startBucket,
      sent,
      dropped,
      bufferAfter: currentBucket,
    });
  });

  return steps;
};

export const runTokenBucket = (params: SimulationParams): SimulationStep[] => {
  // Logic:
  // 1. Tokens generate at constant rate (up to capacity)
  // 2. Packets arrive and are placed in a queue (bucket)
  // 3. If there are tokens, packets are sent from the queue
  
  const { bucketCapacity, tokenRate, packets } = params;
  let currentBuffer = 0; // Packets waiting
  let currentTokens = 0; // Permission to send
  const steps: SimulationStep[] = [];

  // Assuming Token Bucket Capacity is same as Packet Buffer Capacity for simplicity in this lab
  // or often Token Bucket has a separate token capacity. 
  // We will assume 'bucketCapacity' refers to the Packet Buffer Size.
  // We will assume Token Capacity is infinite or matching buffer for simplicity, 
  // but strictly we can set a max token cap. Let's set max tokens = max burst size (bucketCapacity).
  
  packets.forEach((incomingPacket, index) => {
    const time = index + 1;
    const startBuffer = currentBuffer;
    const startTokens = currentTokens;

    // 1. Generate Tokens
    let newTokens = currentTokens + tokenRate;
    if (newTokens > bucketCapacity) newTokens = bucketCapacity;
    currentTokens = newTokens;

    // 2. Incoming Packet into Buffer
    let dropped = 0;
    if (currentBuffer + incomingPacket > bucketCapacity) {
        dropped = incomingPacket; // Drop whole packet if it doesn't fit
    } else {
        currentBuffer += incomingPacket;
    }

    // 3. Process Buffer using Tokens
    // We send as much as we can from the buffer
    let sent = 0;
    
    // In this simplified model, we treat buffer as fluid bytes
    const amountToSend = Math.min(currentBuffer, currentTokens);
    sent = amountToSend;
    currentTokens -= amountToSend;
    currentBuffer -= amountToSend;

    steps.push({
      time,
      incoming: incomingPacket,
      bufferBefore: startBuffer,
      tokensAvailable: newTokens, // Show tokens available *before* sending this step's load
      sent,
      dropped,
      bufferAfter: currentBuffer,
      tokensAfter: currentTokens
    });
  });

  return steps;
};