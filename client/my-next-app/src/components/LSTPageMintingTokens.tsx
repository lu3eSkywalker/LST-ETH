import React, { useState } from "react";
import { ethers } from "ethers";
import TokenMintRightContext from "./Walkthrough/TokenMintRightContext";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const LSTpage = () => {
  const addressToSendEth = "0x728692C4936c2b6e24300dda3190B123A669EDb3";

  const [enterETHValue, setEnterETHValue] = useState<string>("");

  const [loadingBar, setLoadingBar] = useState<boolean>(false);

  const [tokenMintResponse, setTokenMintResponse] = useState<string>("");

  async function payAddress() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const ethtoSend = ethers.parseUnits(enterETHValue, 18);

        const tx = await signer.sendTransaction({
          to: addressToSendEth,
          value: ethtoSend,
        });

        setLoadingBar(true);
        const res = await tx.wait();
        setLoadingBar(false);

        console.log(tx);
        console.log(res);

        if (res?.status === 1) {
          setTokenMintResponse("Tokens Minted Successfully");
        } else {
          setTokenMintResponse("Error Minting Tokens");
        }
      } catch (error) {
        console.error("Error processing transaction", error);
        alert(
          "An error occurred while processing transaction. Check console for details."
        );
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  return (
    <div>
      <div className="flex bg-gray-100">
        {/* Left Side Panel */}
        <div className="w-1/2 bg-slate-400 flex flex-col items-center justify-center min-h-screen">
          <div className="bg-white shadow-md rounded-lg p-8 mb-6 w-[500px] border-2">
            <div>
              {/* <label className="input input-bordered flex items-center gap-2 font-black text-xl my-4 border-black"> */}
              <label className="input input-bordered flex items-center gap-2 font-black text-xl my-4 border-2">
                eth_value:
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter Amount to Send"
                  onChange={(e) => setEnterETHValue(e.target.value)}
                />
              </label>
            </div>
            <button
              onClick={() => payAddress()}
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
            >
              Send ETH
            </button>

            {loadingBar ? (
              <div>
                <br />
                <br />
                <div className="font-bold mx-[180px]">Processing...</div>
                <div className="mx-[110px]">
                  <progress className="progress w-56"></progress>
                </div>
              </div>
            ) : (
              <div></div>
            )}

            <div
              className={`text-xl font-bold mt-4 ${
                tokenMintResponse === "Tokens Minted Successfully"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {tokenMintResponse}
            </div>
          </div>

          <br />
          <br />

          {/* Steps list below the input box but outside the white box */}
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

        {/* Main Content Area */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-slate-600 min-h-screen">
          <div className="rounded-lg p-8 mb-6 w-[300px]">
            <TokenMintRightContext />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LSTpage;
