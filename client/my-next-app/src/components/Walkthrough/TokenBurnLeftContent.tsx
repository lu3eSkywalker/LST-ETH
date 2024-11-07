import React from 'react';

const TokenBurnLeftContent = () => {
  return (
    <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md w-[600px]">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-blue-600 mb-4">Token Burning and Yield Generation</h2>

      <p className="text-xl text-gray-700 mb-4">
        The process of sending tokens back to the smart contract and earning yield involves
        interacting with the Ethereum blockchain. Here's how it works:
      </p>

      <div className="bg-gray-200 p-4 rounded-lg shadow-sm mb-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Step 1: Transferring Tokens</h3>
        <p className="text-gray-600 text-lg">
          To burn tokens, you first need to initiate a transfer from your wallet to the specified
          Ethereum address. The smart contract will process the transaction, effectively reducing
          the total supply of the token in circulation.
        </p>
      </div>

      <div className="bg-gray-200 p-4 rounded-lg shadow-sm mb-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Step 2: Yield Generation</h3>
        <p className="text-gray-600 text-lg">
          Once tokens are sent, your wallet is eligible to receive yield. Yield is a reward
          generated based on the tokens you have burned, often in the form of additional tokens or
          other assets. This reward process is governed by the smart contract and varies based on
          the underlying protocol.
        </p>
      </div>

      <p className="text-base text-gray-500">
        Ensure you have the necessary funds in your wallet to perform the transaction. This is just to show
        the functionality of centralized LST with the use of backend and alchemy webhooks.
      </p>
    </div>
  );
};

export default TokenBurnLeftContent;
