import React, { useState } from "react";
import { ethers } from "ethers";
import TokenBurnLeftContent from "./Walkthrough/TokenBurnLeftContent";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const LSTBurningTokens = () => {
  const [tokensToSend, setTokensToSend] = useState<string>("");

  const [loadingBar, setLoadingBar] = useState<boolean>(false);

  const [tokenSendResponse, setTokenSendResponse] = useState<string>("");

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

        setLoadingBar(true);
        const res = await sendTokens.wait();
        setLoadingBar(false);

        console.log(res.toString());

        if (res.status === 1) {
          setTokenSendResponse("Transaction Completed Successfully");
        } else {
          setTokenSendResponse("Error Sending Tokens");
        }
      } catch (error) {
        console.error("Error: ", error);
        alert("An error occurred. Check console for details.");
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  return (
    <div>
      <div className="min-h-screen flex bg-gray-100">
        {/* Left Side Panel */}
        <div className="w-1/2 bg-slate-600 flex items-center justify-center min-h-screen">
          <div className="text-center p-4">
            <TokenBurnLeftContent />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-1/2 flex flex-col justify-center items-center min-h-screen bg-slate-400">
          <div className="bg-white shadow-md rounded-lg p-8 mb-6 w-[500px]">
            <div>
              <label className="input input-bordered flex items-center gap-2 font-black text-xl my-5 border-2">
                token_value:
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter Amount to Send"
                  onChange={(e) => setTokensToSend(e.target.value)}
                />
              </label>
            </div>

            <button
              onClick={sendTokensBack}
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
            >
              Send Tokens Back
            </button>

            {loadingBar ? (
              <div>
                <br /> <br />
                <div className="font-bold mx-[180px]">Processing...</div>
                <div className="mx-[110px]">
                  <progress className="progress w-56"></progress>
                </div>
              </div>
            ) : (
              <div></div>
            )}

            {/* <div className="text-xl">{tokenSendResponse}</div> */}
            <div
              className={`text-xl font-bold mt-4 ${
                tokenSendResponse === "Transaction Completed Successfully"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {tokenSendResponse}
            </div>
          </div>

          <br />
          <br />
          <br />
          <br />

          <div className="flex justify-center text-center text-white font-medium mx-5 bg-slate-700 py-6 rounded-xl w-[400px] h-[130px]">
            <ul className="steps text-xl">
              <li className="step step-success mx-10">
                <a className="text-white hover:text-green-400" href="./lstpage">
                  Mint Tokens
                </a>
              </li>
              <li className="step step-secondary">
                <a
                  className="text-white hover:text-pink-400"
                  href="./lstpagetokenburn"
                >
                  Get Yield Back
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LSTBurningTokens;
