import React, { useState } from "react";
import { ethers } from "ethers";

const LSTBurningTokens = () => {
  const [tokensToSend, setTokensToSend] = useState<string>("");

  const ABI = [
    "function transfer(address, uint256) public returns (bool success)",
  ];

  const TokenContractAddress = "0x7b23d7a6f03150d5e926fb10926d117b34200b58";

  const ethVault = "0x728692C4936c2b6e24300dda3190B123A669EDb3";

  async function sendTokensBack() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
          TokenContractAddress || "",
          ABI,
          signer
        );

        const tokenToSend = ethers.parseUnits(tokensToSend, 18);

        const sendTokens = await contract.transfer(ethVault, tokenToSend);
        const res = sendTokens.wait();
        console.log(res.toString());
      } catch (error: any) {
        console.error("Error: ", error);
        alert("An error occurred. Check console for details.");
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  return (
    <div className="">
      <div className="flex bg-gray-100">
        {/* Left Side Panel */}
        <div className="w-1/2 bg-slate-600 flex items-center justify-center max-h-[1010px]">
          <div className="text-center p-4">
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-1/2 flex flex-col justify-center items-center h-screen bg-slate-400 max-h-[1010px]">
          <div className="bg-white shadow-md rounded-lg p-8 mb-6 w-[500px]">
            <div>
              <label className="input input-bordered flex items-center gap-2 font-black text-xl my-4">
                Address:
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter Amount to Send"
                  onChange={(e) => setTokensToSend(e.target.value)}
                />
              </label>
            </div>

            <button
              onClick={() => sendTokensBack()}
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
            >
              Send Tokens Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LSTBurningTokens;
