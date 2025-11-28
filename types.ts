export type AlgorithmType = 'leaky' | 'token';

export interface SimulationStep {
  time: number;
  incoming: number;
  bufferBefore: number;
  tokensAvailable?: number; // Specific to Token Bucket
  sent: number;
  dropped: number;
  bufferAfter: number;
  tokensAfter?: number; // Specific to Token Bucket
}

export interface SimulationParams {
  bucketCapacity: number;
  outflowRate: number; // For Leaky
  tokenRate: number; // For Token
  packets: number[];
}

export const SAMPLE_C_CODE_LEAKY = `
#include <stdio.h>

void leakyBucket() {
    int incoming, outgoing, buck_size, n, store = 0;
    
    printf("Enter bucket size, outgoing rate and no of inputs: ");
    scanf("%d %d %d", &buck_size, &outgoing, &n);

    while (n != 0) {
        printf("\\nEnter the incoming packet size: ");
        scanf("%d", &incoming);
        printf("Incoming packet size %d\\n", incoming);
        
        if (incoming <= (buck_size - store)) {
            store += incoming;
            printf("Bucket buffer size %d out of %d\\n", store, buck_size);
        } else {
            printf("Dropped %d no of packets\\n", incoming - (buck_size - store));
            store = buck_size;
            printf("Bucket buffer size %d out of %d\\n", store, buck_size);
        }
        
        if (store >= outgoing) {
            store = outgoing;
        } else {
            store = 0; // Or empty strictly by outgoing amount
        }
        printf("After outgoing %d packets left out of %d\\n", store, buck_size);
        n--;
    }
}
`;

export const SAMPLE_C_CODE_TOKEN = `
#include <stdio.h>
#include <stdlib.h> // For min function if needed

void tokenBucket() {
    int tokens = 0, rate, capacity, n, incoming;
    
    printf("Enter bucket capacity, token rate, and number of inputs: ");
    scanf("%d %d %d", &capacity, &rate, &n);
    
    for(int i=0; i<n; i++) {
        printf("\\nEnter packet size at second %d: ", i+1);
        scanf("%d", &incoming);
        
        // Add tokens based on rate
        tokens = (tokens + rate > capacity) ? capacity : tokens + rate;
        printf("Tokens available: %d\\n", tokens);
        
        if (incoming <= tokens) {
            tokens -= incoming;
            printf("Packet of size %d sent.\\n", incoming);
        } else {
            printf("Packet of size %d dropped (Insufficient tokens).\\n", incoming);
        }
        printf("Tokens remaining: %d\\n", tokens);
    }
}
`;