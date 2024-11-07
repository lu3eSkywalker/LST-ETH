import React from "react";

const TokenMintRightContext = () => {
  return (
    <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md w-[800px] mx-[-250px] my-[150px]">

      {/* Heading */}
      <h2 className="text-4xl font-bold text-green-600 mb-4">Token Minting and ETH Transactions</h2>

      <p className="text-xl text-gray-700 mb-4">
        When a user sends ETH to a specified address, our system automatically mints tokens and sends them to the users wallet. This process is powered by our integration with Alchemy webhooks and a backend service that listens for the transaction.
      </p>

      <div className="bg-gray-200 p-4 rounded-lg shadow-sm mb-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Step 1: Sending ETH to the Address</h3>
        <p className="text-gray-600 text-lg">
          The first step involves sending ETH to a specific address. For Our Case, this address: 0x728692C4936c2b6e24300dda3190B123A669EDb3. Once the transaction is successfully processed, the backend is notified via a webhook powered by Alchemy. This ensures that every ETH transfer is securely tracked and verified.
        </p>
      </div>

      <div className="bg-gray-200 p-4 rounded-lg shadow-sm mb-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Step 2: Backend Interaction</h3>
        <p className="text-gray-600 text-lg">
          After the ETH transaction is received, our backend system handles the minting process. The system triggers a smart contract to mint a specified amount of tokens for the user based on the amount of ETH sent. Backend interacts with the smart contract.
        </p>
      </div>

      <div className="bg-gray-200 p-4 rounded-lg shadow-sm mb-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Step 3: Tokens Sent to the Users Wallet</h3>
        <p className="text-gray-600 text-lg">
          Once the tokens are minted, they are immediately sent to the users Ethereum wallet address. The user can then see the newly minted tokens in their wallet, ready to be used or transferred.
        </p>
      </div>

      <p className="text-base text-gray-500">
        Ensure that you have the necessary ETH balance to send to the address and trigger the minting process. This system demonstrates the seamless integration of Ethereum transactions, token minting, and backend functionality.
      </p>
    </div>
  );
};

export default TokenMintRightContext;
